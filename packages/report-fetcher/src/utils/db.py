import mysql.connector
from config import config


#gets the credentials from .aws/credentials


def get_connection():
    db = mysql.connector.connect(
        host=config["db"]["host"],
        user=config["db"]["user"],
        password=config["db"]["password"],
        port=config["db"]["port"],
        database=config["db"]["name"]
    )

    return db

def query(query, data=None, db = get_connection()):
    """queries the database

    Args:
        query (_type_): _description_
        db (_type_, optional): _description_. Defaults to get_connection().

    Returns:
        _type_: _description_
    """
    cursor = db.cursor()
    cursor.execute(query, data)
    db.commit()
    print(query)
    return cursor.fetchall()     