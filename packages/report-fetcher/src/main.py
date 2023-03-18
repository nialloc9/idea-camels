import sys, pandas, traceback, math
from google.ads.googleads.client import GoogleAdsClient
from config import config
from utils.db import query
from utils.alert import alert
from mocks.google_api import report_mock

print("...")

def fetch_reports(client):

    if config["no_internet"] == True:
        return [report_mock]
    
    ga_service = client.get_service("GoogleAdsService")

    query = """
        SELECT metrics.cost_micros, campaign.id, campaign.name, campaign.resource_name, metrics.clicks, metrics.average_cpm, metrics.average_cpc, metrics.impressions, metrics.ctr FROM campaign WHERE campaign.status = 'ENABLED'"""
    
    # Issues a search request using streaming.
    search_request = client.get_type("SearchGoogleAdsStreamRequest")
    search_request.customer_id = config["credentials"]["login_customer_id"]
    search_request.query = query
    stream = ga_service.search_stream(search_request)

    arr = []

    for batch in stream:
        for row in batch.results:
            campaign = row.campaign
            metrics = row.metrics
            
            arr.append({
                "campaign_id": campaign.id,
                "clicks": metrics.clicks,
                "impressions": metrics.impressions,
                "average_cpc": metrics.average_cpc,
                "average_cpm": metrics.average_cpm,
                "ctr": metrics.ctr,
                "cost_micros": metrics.cost_micros,
                "engagements": metrics.engagements
            })

    return arr


def update_db_with_metrics(campaign_id, clicks, impressions, average_cpm, average_cpc, cost_micros, engagements):
    """updates database with metrics

    Args:
        campaign_id (string): campaign ud
        impressions (int): views of ads
        clicks (int): clicks on ad
        average_cpm (int): average cost per impression / 1000000
        average_cpc (int): average cost per click / 1000000
        cost_micros (int): total cost in 000000's
        engagements (int): any interaction like opening ad
    """
    query(query="UPDATE reports SET impressions={},clicks={},average_cpm={},average_cpc={},cost_micros={},engagements={} WHERE google_ads_campaign_id={}".format(impressions, clicks, average_cpm, average_cpc, cost_micros, engagements, campaign_id))

if __name__ == "__main__":
    print("Sarting report fetcher...")
    try:
        googleads_client = GoogleAdsClient.load_from_dict(config["credentials"])
        print("Google ads client loaded...")
        # TODO fetch reports from report table in database with campaign id and deleted_flag=0
        
        # print(reports_df["google_ads_campaign_id"])
        # TODO call google ads api with adGroup resource names to retrieve report
        campaign_reports = fetch_reports(client=googleads_client)

        for report in campaign_reports:
            update_db_with_metrics(campaign_id=report["campaign_id"], impressions=report["impressions"], clicks=report["clicks"], average_cpc=report["average_cpc"], average_cpm=report["average_cpm"], cost_micros=report["cost_micros"], engagements=report["engagements"])

        # TODO add terraform to run on a daily schedule

        # TODO change api to query database for these metrics instead of google directly
        
        
        alert(message="{} reports fetched".format(len(campaign_reports)))

        print("Report fetcher complete... {} reports updated...".format(len(campaign_reports))))
    except Exception as ex:   
        json_error = str(ex)
        print(json_error)    
        traceback.print_exc() 
        alert(json_error)
        sys.exit(1)

