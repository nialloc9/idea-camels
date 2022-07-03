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
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
from google_ads import add_keyword
from config import config

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

if __name__ == "__main__":

    googleads_client = GoogleAdsClient.load_from_dict(config["credentials"])

    try:

        [add_keyword(client=googleads_client, keyword_text=suggestion, customer_id=os.environ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'], ad_group_id="138082460352") for suggestion in _DEFAULT_SEED_KEYWORDS]

        
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

