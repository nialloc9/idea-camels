import os
import pandas

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

_env = os.environ['ENV']

config = {
    "env": _env,
    "isProd": _env == "prod",
    "location_ids": _DEFAULT_LOCATION_IDS,
    "language_id": _DEFAULT_LANGUAGE_ID,
    "credentials": {
        "developer_token": os.environ['GOOGLE_ADS_DEVELOPER_TOKEN'],
        "refresh_token": os.environ['GOOGLE_ADS_REFRESH_TOKEN'],
        "client_id": os.environ['GOOGLE_ADS_CLIENT_ID'],
        "client_secret": os.environ['GOOGLE_ADS_CLIENT_SECRET'],
        "login_customer_id": os.environ['GOOGLE_ADS_LOGIN_CUSTOMER_ID'],
        "use_proto_plus": True
    },
    "db": {
         "host": os.environ['DB_HOST'],
        "user": os.environ['DB_USER'],
        "password": os.environ['DB_PASSWORD'],
        "name": os.environ['DB_NAME'],
        "port": os.environ['DB_PORT'],
    },
    "ads": {
        "create_count": 20
    },
    "security": {
        "jwt_secret": os.environ['JWT_SECRET'] 
    },
    "slack": {
        "token": os.environ['SLACK_TOKEN'],
        "alert_channel": os.environ['SLACK_ALERT_CHANNEL']
    }
}


