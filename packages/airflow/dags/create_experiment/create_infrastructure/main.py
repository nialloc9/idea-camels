import sys, traceback
from utils.config import config
from utils.db import query
from utils.alert import alert

def main():
    try: 
        print("Creating infrastructure")
    except Exception as ex:   
        json_error = str(ex)
        print(json_error)    
        traceback.print_exc() 
        alert(json_error)
        sys.exit(1)