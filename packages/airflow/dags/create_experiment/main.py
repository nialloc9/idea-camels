"""
Code that goes along with the Airflow located at:
http://airflow.readthedocs.org/en/latest/tutorial.html
"""
import sys
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime, timedelta
from create_experiment.create_infrastructure import main

import sys, traceback
from create_experiment.utils.config import config
from create_experiment.utils.db import query
from create_experiment.utils.alert import alert

def main():
    try: 
        print("========= CONFIGURING EXPERIMENT  =========")

        
    except Exception as ex:   
        json_error = str(ex)
        print(json_error)    
        traceback.print_exc() 
        alert(json_error)
        sys.exit(1)

default_args = {
    "owner": "airflow",
    "depends_on_past": False,
    "start_date": datetime(2015, 6, 1),
    "email": ["airflow@airflow.com"],
    "email_on_failure": False,
    "email_on_retry": False,
    "retries": 1,
    "retry_delay": timedelta(minutes=5),
    # 'queue': 'bash_queue',
    # 'pool': 'backfill',
    # 'priority_weight': 10,
    # 'end_date': datetime(2016, 1, 1),
}

dag = DAG("build_experiment", default_args=default_args, schedule_interval=timedelta(1))

def test_1():
    print("test 1")

def test_2():
    print("test 2")

def test_3():
    print("test 3")

t1 = PythonOperator(
        task_id='create_infrastucture',
        python_callable=main,
        depends_on_past=False,
        dag=dag
    )

t2 = PythonOperator(
    task_id='create_website',
    depends_on_past=False,
    python_callable=test_2,
    retries=3,
    dag=dag
)

t3 = PythonOperator(
    task_id='create_adverts',
    depends_on_past=False,
    python_callable=test_3,
    retries=3,
    dag=dag
)

t2.set_upstream(t1)
t3.set_upstream(t2)