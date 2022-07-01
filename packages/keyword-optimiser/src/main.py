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
import sys
import os
import pandas
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from google_ads import fetch_keyword_ideas, fetch_keywords_and_criterion_ids_and_ad_group_id, remove_keyword, add_keyword, get_keyword_stats
from brain import calculate_confidence
from config import config

# _DEFAULT_SEED_KEYWORDS = [
#     "test my idea",
#     "idea testing",
#     "is my idea good",
#     "product concept testing",
#     "test your business idea",
#     "test my start up id",
#     "how do I know if my idea is good",
#     "is my product idea good",
#     "create business",
#     "business idea",
#     "start up idea",
#     "new business",
#     "how to market a start up"
# ]

def fetch_keyword_suggestions(
    client, customer_id, location_ids, language_id, keyword_texts, page_url, limit=10
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

    keyword_ideas = fetch_keyword_ideas(client, customer_id, location_ids, language_id, keyword_texts, page_url)
    
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

    df['confidence'] = df.apply(calculate_confidence, axis=1)
    
    df=df.sort_values("confidence", ascending=False)
    
    return df.head(limit)


if __name__ == "__main__":

    googleads_client = GoogleAdsClient.load_from_dict(config["credentials"])

    try:

        keywords, critations, ad_group_id = fetch_keywords_and_criterion_ids_and_ad_group_id(googleads_client, customer_id="5213472317", campaign_resource_names=["customers/5213472317/campaigns/17431991901"])

        if critations:

            keyword_df = get_keyword_stats(googleads_client, os.environ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'], campaign_id="17431991901")
            suggestions = fetch_keyword_suggestions(
                googleads_client,
                os.environ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'],
                config["location_ids"],
                config["language_id"],
                keyword_df["text"].tolist(),
                page_url="https://ideacamels.com",
            )

            [remove_keyword(client=googleads_client, criterion_id=critation["criterion_id"], customer_id=os.environ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'], ad_group_id=critation["ad_group_id"]) for critation in critations]
            print("======== Suggestions ========")
            print(suggestions)
            print("======== Suggestions ========")
            [add_keyword(client=googleads_client, keyword_text=suggestion, customer_id=os.environ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'], ad_group_id=ad_group_id) for suggestion in suggestions["text"]]

        
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

