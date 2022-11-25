import os

config = {
    "db": {
         "host": os.environ['DB_HOST'],
        "user": os.environ['DB_USER'],
        "password": os.environ['DB_PASSWORD'],
        "name": os.environ['DB_NAME'],
        "port": os.environ['DB_PORT'],
    },
}