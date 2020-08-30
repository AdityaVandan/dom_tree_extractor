from datetime import datetime, timedelta
# from re import findall
from time import sleep
import json
# from intervaltree import Interval, IntervalTree
from selenium.webdriver import Chrome
from config import driver_config, js_code


def wait(current_driver, min_wait=0, max_wait=60):
    wait_end_time = datetime.now() + timedelta(seconds=max_wait)

    while datetime.now() < wait_end_time:
        if current_driver.execute_script('return document.readyState != "complete";'):
            sleep(min_wait)
        else:
            break
    else:
        raise Exception('timeout error')


def load_page(url, current_driver, min_wait=0, max_wait=60):
    if url not in current_driver.current_url:
        current_driver.get(url)
        wait(current_driver=current_driver,
             min_wait=min_wait, max_wait=max_wait)

if __name__ == '__main__':
    test_url = 'https://en.wikipedia.org/wiki/Document_Object_Model'
    js_script = js_code.js_script
    with Chrome(executable_path=driver_config.driver_path, options=driver_config.options) as driver:
        load_page(url=test_url, current_driver=driver)
        page_tree = driver.execute_script(js_script)
    with open('dom.json','w') as fp: json.dump(page_tree,fp,indent = 2)


