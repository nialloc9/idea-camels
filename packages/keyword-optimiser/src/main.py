#!/usr/bin/env python
# Copyright 2019 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""This example generates keyword ideas from a list of seed keywords."""
"""script from: https://developers.google.com/google-ads/api/docs/samples/generate-keyword-ideas"""
"""Query Builder: https://developers.google.com/google-ads/api/fields/v11/campaign_criterion_query_builder"""
import argparse
import sys
import os
import pandas
from google.api_core import protobuf_helpers
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

# Location IDs are listed here:
# https://developers.google.com/google-ads/api/reference/data/geotargets
# and they can also be retrieved using the GeoTargetConstantService as shown
# here: https://developers.google.com/google-ads/api/docs/targeting/location-targeting
# Geo targeting codes: https://developers.google.com/adwords/api/docs/appendix/geotargeting
_DEFAULT_LOCATION_IDS = pandas.read_csv("src/etl/geo_targets/curated/geo_targets.csv")["id"].tolist() 

# A language criterion ID. For example, specify 1000 for English. For more
# information on determining this value, see the below link:
# https://developers.google.com/google-ads/api/reference/data/codes-formats#expandable-7
_DEFAULT_LANGUAGE_ID = "1000"  # language ID for English

_DEFAULT_SEED_KEYWORDS = [
    "test my idea",
    "idea testing",
    "is my idea good",
    "product concept testing",
    "test your business idea",
    "test my start up id",
    "how do I know if my idea is good",
    "is my product idea good",
    "create business",
    "business idea",
    "start up idea",
    "new business",
    "how to market a start up"
]

def add_keyword(client, customer_id, ad_group_id, keyword_text):
    ad_group_service = client.get_service("AdGroupService")
    ad_group_criterion_service = client.get_service("AdGroupCriterionService")

    # Create keyword.
    ad_group_criterion_operation = client.get_type("AdGroupCriterionOperation")
    ad_group_criterion = ad_group_criterion_operation.create
    ad_group_criterion.ad_group = ad_group_service.ad_group_path(
        customer_id, ad_group_id
    )
    ad_group_criterion.status = client.enums.AdGroupCriterionStatusEnum.ENABLED
    ad_group_criterion.keyword.text = keyword_text
    ad_group_criterion.keyword.match_type = (
        client.enums.KeywordMatchTypeEnum.BROAD
    )

    # Optional field
    # All fields can be referenced from the protos directly.
    # The protos are located in subdirectories under:
    # https://github.com/googleapis/googleapis/tree/master/google/ads/googleads
    # ad_group_criterion.negative = True

    # Optional repeated field
    # ad_group_criterion.final_urls.append('https://www.example.com')

    # Add keyword
    ad_group_criterion_response = (
        ad_group_criterion_service.mutate_ad_group_criteria(
            customer_id=customer_id,
            operations=[ad_group_criterion_operation],
        )
    )

    print(
        "Created keyword "
        f"{ad_group_criterion_response.results[0].resource_name}."
    )

def remove_keyword(client, customer_id, ad_group_id, criterion_id):

    agc_service = client.get_service("AdGroupCriterionService")
    agc_operation = client.get_type("AdGroupCriterionOperation")

    resource_name = agc_service.ad_group_criterion_path(
        customer_id, ad_group_id, criterion_id
    )

    agc_operation.remove = resource_name

    agc_response = agc_service.mutate_ad_group_criteria(
        customer_id=customer_id, operations=[agc_operation]
    )

    print(f"Removed keyword {agc_response.results[0].resource_name}.")

def fetch_keywords_and_criterion_ids_and_ad_group_id(client, customer_id, campaign_resource_names):
    ga_service = client.get_service("GoogleAdsService")

    comma_delimited = ",".join(campaign_resource_names)

    campaign_resource_names_with_quotes = ','.join(f"'{e}'" for e in comma_delimited.split(','))

    query = f"""
        SELECT ad_group.id, campaign.resource_name, ad_group_criterion.status, ad_group_criterion.criterion_id, ad_group_criterion.negative, ad_group_criterion.keyword.text, ad_group_criterion.resource_name FROM ad_group_criterion WHERE ad_group_criterion.status=ENABLED AND ad_group_criterion.negative=false AND campaign.resource_name in ({campaign_resource_names_with_quotes})"""

    search_request = client.get_type("SearchGoogleAdsStreamRequest")
    search_request.customer_id = customer_id
    search_request.query = query

    stream = ga_service.search_stream(request=search_request)

    keywords = []

    critations = []

    ad_group_id = None

    for batch in stream:
        for row in batch.results:
            if(row.ad_group_criterion.keyword.text != ""):
                critations.append({ "criterion_id": row.ad_group_criterion.criterion_id, "keyword_text": row.ad_group_criterion.keyword.text, "ad_group_id": row.ad_group.id })
                keywords.append(row.ad_group_criterion.keyword.text)
                ad_group_id=row.ad_group.id
    
    return keywords, critations, ad_group_id

def add_weight(df):
    mapping = {
        "LOW": 1,
        "MEDIUM": 2,
        "HIGH": 3
    }

    mapped_competion = mapping[df["competition_value"]]

    average_cost = df["low_top_of_page_bid_micros"] + df["high_top_of_page_bid_micros"]

    return   (mapped_competion * (df["avg_monthly_searches"] * 1000000)) / average_cost


def fetch_keyword_suggestions(
    client, customer_id, location_ids, language_id, keyword_texts, page_url
):
    keyword_plan_idea_service = client.get_service("KeywordPlanIdeaService")
    
    keyword_plan_network = (
        client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH_AND_PARTNERS
    )
    location_rns = _map_locations_ids_to_resource_names(client, location_ids)
    language_rn = client.get_service("GoogleAdsService").language_constant_path(
        language_id
    )

    # Either keywords or a page_url are required to generate keyword ideas
    # so this raises an error if neither are provided.
    if not (keyword_texts or page_url):
        raise ValueError(
            "At least one of keywords or page URL is required, "
            "but neither was specified."
        )
    
    # Only one of the fields "url_seed", "keyword_seed", or
    # "keyword_and_url_seed" can be set on the request, depending on whether
    # keywords, a page_url or both were passed to this function.
    request = client.get_type("GenerateKeywordIdeasRequest")
    request.customer_id = customer_id
    request.language = language_rn
    request.geo_target_constants = location_rns
    request.include_adult_keywords = False
    request.keyword_plan_network = keyword_plan_network

    # To generate keyword ideas with only a page_url and no keywords we need
    # to initialize a UrlSeed object with the page_url as the "url" field.
    if not keyword_texts and page_url:
        request.url_seed.url = page_url

    # To generate keyword ideas with only a list of keywords and no page_url
    # we need to initialize a KeywordSeed object and set the "keywords" field
    # to be a list of StringValue objects.
    if keyword_texts and not page_url:
        request.keyword_seed.keywords.extend(keyword_texts)

    # To generate keyword ideas using both a list of keywords and a page_url we
    # need to initialize a KeywordAndUrlSeed object, setting both the "url" and
    # "keywords" fields.
    if keyword_texts and page_url:
        request.keyword_and_url_seed.url = page_url
        request.keyword_and_url_seed.keywords.extend(keyword_texts)

    keyword_ideas = keyword_plan_idea_service.generate_keyword_ideas(
        request=request
    )
    
    data = []
    
    for idea in keyword_ideas:
        competition_value = idea.keyword_idea_metrics.competition.name

        data.append([idea.text, idea.keyword_idea_metrics.avg_monthly_searches, competition_value, idea.keyword_idea_metrics.low_top_of_page_bid_micros, idea.keyword_idea_metrics.high_top_of_page_bid_micros ])

    cols = ["text", "avg_monthly_searches", "competition_value", "low_top_of_page_bid_micros", "high_top_of_page_bid_micros"] 
    df= pandas.DataFrame(data=data, columns=cols)
    df=df.sort_values("avg_monthly_searches")
    
    df = df[df["competition_value"].isin(["LOW", "MEDIUM", "HIGH"])]

    df = df[~df["low_top_of_page_bid_micros"].isin([0])]
    df = df[~df["high_top_of_page_bid_micros"].isin([0])]

    df['confidence'] = df.apply(add_weight, axis=1)

    df=df.sort_values("confidence", ascending=False)

    return df.head(10)

def map_keywords_to_string_values(client, keyword_texts):
    keyword_protos = []
    for keyword in keyword_texts:
        string_val = client.get_type("StringValue")
        string_val.value = keyword
        keyword_protos.append(string_val)
    return keyword_protos


def _map_locations_ids_to_resource_names(client, location_ids):
    """Converts a list of location IDs to resource names.

    Args:
        client: an initialized GoogleAdsClient instance.
        location_ids: a list of location ID strings.

    Returns:
        a list of resource name strings using the given location IDs.
    """
    build_resource_name = client.get_service(
        "GeoTargetConstantService"
    ).geo_target_constant_path
    return [build_resource_name(location_id) for location_id in location_ids]


if __name__ == "__main__":
    credentials = {
        "developer_token": os.environ['GOOGLE_ADS_DEVELOPER_TOKEN'],
        "refresh_token": os.environ['GOOGLE_ADS_REFRESH_TOKEN'],
        "client_id": os.environ['GOOGLE_ADS_CLIENT_ID'],
        "client_secret": os.environ['GOOGLE_ADS_CLIENT_SECRET'],
        "login_customer_id": os.environ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'],
        "use_proto_plus": True
    }

    googleads_client = GoogleAdsClient.load_from_dict(credentials)

    # googleads_client = GoogleAdsClient.load_from_env(version="11")

    parser = argparse.ArgumentParser(
        description="Generates keyword ideas from a list of seed keywords."
    )
 
    parser.add_argument(
        "-k",
        "--keyword_texts",
        nargs="+",
        type=str,
        required=False,
        default=_DEFAULT_SEED_KEYWORDS,
        help="Space-delimited list of starter keywords",
    )
    # To determine the appropriate location IDs, see:
    # https://developers.google.com/google-ads/api/reference/data/geotargets
    parser.add_argument(
        "-l",
        "--location_ids",
        nargs="+",
        type=str,
        required=False,
        default=_DEFAULT_LOCATION_IDS,
        help="Space-delimited list of location criteria IDs",
    )
    # To determine the appropriate language ID, see:
    # https://developers.google.com/google-ads/api/reference/data/codes-formats#expandable-7
    parser.add_argument(
        "-i",
        "--language_id",
        type=str,
        required=False,
        default=_DEFAULT_LANGUAGE_ID,
        help="The language criterion ID.",
    )
    # Optional: Specify a URL string related to your business to generate ideas.
    parser.add_argument(
        "-p",
        "--page_url",
        type=str,
        required=False,
        help="A URL string related to your business",
    )

    args = parser.parse_args()

    try:

        keywords, critations, ad_group_id = fetch_keywords_and_criterion_ids_and_ad_group_id(googleads_client, customer_id="5213472317", campaign_resource_names=["customers/5213472317/campaigns/17431991901"])

        # [add_keyword(keyword_text=suggestion, customer_id=os.environ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'], ad_group_id="138082460352", client=googleads_client) for suggestion in _DEFAULT_SEED_KEYWORDS]

        if critations:
            suggestions = fetch_keyword_suggestions(
                googleads_client,
                os.environ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'],
                args.location_ids,
                args.language_id,
                _DEFAULT_SEED_KEYWORDS,
                args.page_url,
            )

            [remove_keyword(criterion_id=critation["criterion_id"], customer_id=os.environ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'], ad_group_id=critation["ad_group_id"], client=googleads_client) for critation in critations]
            print("======== Suggestions ========")
            print(suggestions)
            print("======== Suggestions ========")
            [add_keyword(keyword_text=suggestion, customer_id=os.environ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'], ad_group_id=ad_group_id, client=googleads_client) for suggestion in suggestions["text"]]

            
        # remove_keyword(criterion_id=11272590, customer_id=os.environ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'], ad_group_id=ad_group_id, client=googleads_client)

        
    except GoogleAdsException as ex:
        print(
            f'Request with ID "{ex.request_id}" failed with status '
            f'"{ex.error.code().name}" and includes the following errors:'
        )
        for error in ex.failure.errors:
            print(f'\tError with message "{error.message}".')
            if error.location:
                for field_path_element in error.location.field_path_elements:
                    print(f"\t\tOn field: {field_path_element.field_name}")
        sys.exit(1)

