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
import sys, pandas, traceback
from google.ads.googleads.client import GoogleAdsClient
from google_ads import fetch_keyword_ideas, remove_keyword, add_keyword, get_keyword_stats
from brain import calculate_confidence
from config import config
from utils.db import query
from utils.alert import alert

def fetch_keyword_suggestions(
    client, customer_id, location_ids, language_id, keyword_df, page_url, limit=config["ads"]["create_count"]
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

    keyword_texts = keyword_df["text"].tolist()

    keep_keywords = keyword_df[keyword_df["ctr"] > 0.10]
    keep_keywords = keep_keywords[keep_keywords["clicks"] > 10]
    
    keyword_ideas = fetch_keyword_ideas(client, customer_id, location_ids, language_id, keyword_texts, page_url)
    
    data = []
    
    for idea in keyword_ideas:
        competition_value = idea.keyword_idea_metrics.competition.name

        to_add = [idea.text, idea.keyword_idea_metrics.avg_monthly_searches, competition_value, idea.keyword_idea_metrics.low_top_of_page_bid_micros, idea.keyword_idea_metrics.high_top_of_page_bid_micros ]
        
        existing_ctr = 0

        if idea.text in keep_keywords["text"].tolist():
            existing_ctr =  keep_keywords.loc[keep_keywords['text'] == idea.text, 'ctr'].iloc[0]

        to_add.append(existing_ctr)

        data.append(to_add)

    cols = ["text", "avg_monthly_searches", "competition_value", "low_top_of_page_bid_micros", "high_top_of_page_bid_micros", "existing_ctr"] 
    df= pandas.DataFrame(data=data, columns=cols)
    df=df.sort_values("avg_monthly_searches")
    
    df = df[df["competition_value"].isin(["LOW", "MEDIUM", "HIGH"])]

    df = df[~df["low_top_of_page_bid_micros"].isin([0])]
    df = df[~df["high_top_of_page_bid_micros"].isin([0])]

    df['confidence'] = df.apply(calculate_confidence, axis=1)
    
    df=df.sort_values("confidence", ascending=False)

    return df.head(limit)

def optimse_keywords(googleads_client, domain_name):
    """optimises keywords for domain

    Args:
        googleads_client (any): google ads client
        domain_name (string): domain name
    """
    suggestions = fetch_keyword_suggestions(
                    googleads_client,
                    config["credentials"]["login_customer_id"],
                    config["location_ids"],
                    config["language_id"],
                    keyword_df.head(20),
                    page_url="https://{}".format(domain_name),
                )
                
    top_suggestions = suggestions.head(config["ads"]["create_count"])
    [remove_keyword(client=googleads_client, criterion_id=k["criterion_id"], customer_id=config["credentials"]["login_customer_id"], ad_group_id=k["ad_group_id"]) for i, k in keyword_df.iterrows()]
    print("======== Suggestions ========")
    print(top_suggestions.head(config["ads"]["create_count"]))
    print("======== Suggestions ========")

    query_data = []

    for i,s in top_suggestions.iterrows():
        resource_name, keyword_text = add_keyword(client=googleads_client, keyword_text=s["text"], customer_id=config["credentials"]["login_customer_id"], ad_group_id=first_column["ad_group_id"])
        query_data.append(resource_name)
        query_data.append(keyword_text)

    query_data.append(first_column["campaign_resource_name"])

    query("UPDATE campaigns SET criterion_0_name=%s, keyword_0=%s, criterion_1_name=%s, keyword_1=%s, criterion_2_name=%s, keyword_2=%s, criterion_3_name=%s, keyword_3=%s, criterion_4_name=%s, keyword_4=%s, criterion_5_name=%s, keyword_5=%s, criterion_6_name=%s, keyword_6=%s, criterion_7_name=%s, keyword_7=%s, criterion_8_name=%s, keyword_8=%s, criterion_9_name=%s, keyword_9=%s, criterion_10_name=%s, keyword_10=%s, criterion_11_name=%s, keyword_11=%s, criterion_12_name=%s, keyword_12=%s, criterion_13_name=%s, keyword_13=%s, criterion_14_name=%s, keyword_14=%s, criterion_15_name=%s, keyword_15=%s, criterion_16_name=%s, keyword_16=%s, criterion_17_name=%s, keyword_17=%s, criterion_18_name=%s, keyword_18=%s, criterion_19_name=%s, keyword_19=%s WHERE campaign_name=%s", tuple(query_data))

    alert("{} keywords updated".format(first_column["campaign_resource_name"]))

if __name__ == "__main__":

    try:
        googleads_client = GoogleAdsClient.load_from_dict(config["credentials"])

        keyword_dfs = get_keyword_stats(googleads_client, config["credentials"]["login_customer_id"])

        if keyword_dfs:
            for campaign_id, keyword_df in keyword_dfs:

                first_column = keyword_df.iloc[0]

                domain_names = query("SELECT domains.name FROM domains JOIN experiments ON domains.domain_ref = experiments.domain_ref JOIN campaigns ON experiments.experiment_ref = campaigns.experiment_ref WHERE campaigns.campaign_name={}".format(ad_group_id=first_column["campaign_resource_name"]))

                for domain_name in domain_names:
                    optimse_keywords(googleads_client=googleads_client, domain_name=domain_name)
            
    except Exception as ex:   
        json_error = str(ex)
        print(json_error)    
        traceback.print_exc() 
        alert(json_error)
        sys.exit(1)

