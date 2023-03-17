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
import pandas

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
        "Created keyword {} with resource name {}".format(keyword_text, ad_group_criterion_response.results[0].resource_name)
    )
    
    return ad_group_criterion_response.results[0].resource_name, keyword_text

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

    return True


def fetch_keyword_ideas(
    client, customer_id, location_ids, language_id, keyword_texts, page_url
):
    """fetches suggested keywords with a confidence score om wether

    Args:
        client (_type_): _description_
        customer_id (_type_): _description_
        location_ids (_type_): _description_
        language_id (_type_): _description_
        keyword_texts (_type_): _description_
        page_url (_type_): _description_

    Raises:
        ValueError: _description_

    Returns:
        _type_: _description_
    """
    keyword_plan_idea_service = client.get_service("KeywordPlanIdeaService")
    
    keyword_plan_network = (
        client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH_AND_PARTNERS
    )
    location_rns = map_locations_ids_to_resource_names(client, location_ids)
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

    return keyword_ideas
    
def map_locations_ids_to_resource_names(client, location_ids):
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

def get_keyword_stats(client, customer_id):
    ga_service = client.get_service("GoogleAdsService")

    query = """
        SELECT
          campaign.id,
          campaign.name,
          campaign.resource_name,
          metrics.impressions,
          metrics.clicks,
          metrics.average_cpc,
          metrics.ctr,
          metrics.cost_micros,
          metrics.engagements
        FROM keyword_view 
        WHERE ad_group.status = 'ENABLED'
        AND campaign.status = 'ENABLED'
        AND ad_group_criterion.status IN ('ENABLED')
        ORDER BY metrics.ctr DESC """

    # Issues a search request using streaming.
    search_request = client.get_type("SearchGoogleAdsStreamRequest")
    search_request.customer_id = customer_id
    search_request.query = query
    stream = ga_service.search_stream(search_request)

    data = []

    for batch in stream:
        for row in batch.results:

            campaign = row.campaign
            ad_group = row.ad_group
            criterion = row.ad_group_criterion
            metrics = row.metrics

            data.append({ "text": criterion.keyword.text, "criterion_id": criterion.criterion_id, "ad_group_id": ad_group.id, "campaign_id": campaign.id, "campaign_resource_name": campaign.resource_name, "clicks": metrics.clicks, "average_cpc": metrics.average_cpc, "ctr": row.metrics.ctr })
            

    cols = ["text", "criterion_id", "ad_group_id", "campaign_id", "campaign_resource_name", "clicks", "average_cpc", "ctr"] 
    df= pandas.DataFrame(data=data, columns=cols).groupby("campaign_id")
    
    return df