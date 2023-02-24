import logging, os, traceback
# Import WebClient from Python SDK (github.com/slackapi/python-slack-sdk)
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from config import config

# WebClient instantiates a client that can call API methods
# When using Bolt, you can use either `app.client` or the `client` passed to listeners.

def alert(message):
    try:
        print("Sending message {} to {} with token {}".format(message, config["slack"]["alert_channel"], config["slack"]["token"]))
        client = WebClient(token=config["slack"]["token"])
        
        # Call the conversations.list method using the WebClient
        client.chat_postMessage(
            channel=config["slack"]["alert_channel"],
            text=message
        )
   
    except SlackApiError as e:
        json_error = str(e)
        print(json_error)    
        traceback.print_exc() 
        print("Error: {}".format(e))