import logging, os
# Import WebClient from Python SDK (github.com/slackapi/python-slack-sdk)
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from config import config

# WebClient instantiates a client that can call API methods
# When using Bolt, you can use either `app.client` or the `client` passed to listeners.

def alert(message):
    try:

        client = WebClient(token=config["slack"]["token"])
        
        # Call the conversations.list method using the WebClient
        client.chat_postMessage(
            channel=config["slack"]["alert_channel"],
            text=message
        )
   
    except SlackApiError as e:
        print(f"Error: {e}")