from selenium.webdriver.chrome.options import Options

class driver_config:
    driver_path = 'C:\\coding\\chrome_drivers\\cd_84\\chromedriver.exe'
    options = Options()
    options.add_argument("--window-size=1920,1080")
    options.add_argument('--headless')
    options.add_argument('--incognito')

class js_code:
    js_script_path = 'C:\\coding\\load_js_methods.js'
    js_script = open(js_script_path).read()