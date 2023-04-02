from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from collections import defaultdict
from dataclasses import dataclass, field
from datetime import datetime

from bs4 import BeautifulSoup
from dateutil.relativedelta import relativedelta
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.service import Service
import pandas
import requests

current_year = datetime.now().year


def parse_date(date: str) -> str:

    date_format = "%A, %B %d, at %I:%M %p"
    datetime_obj = datetime.strptime(date, date_format)
    day = datetime_obj.strftime("%d")
    month = datetime_obj.strftime("%m")
    time = datetime_obj.strftime("%H:%M")
    parsed_date = f"{current_year}-{month}-{day} {time}:00"

    return parsed_date


def event_ends_next_year(start_date: str, end_date: str):
    start_month = start_date[5:7]
    end_month = end_date[5:7]
    return int(start_month) == 12 and int(end_month) < 12


def is_all_day_event(start_date: str, end_date: str):
    start_month_and_day = start_date[5:10]
    end_month_and_day = end_date[5:10]
    start_time = start_date[11:]
    end_time = end_date[11:]

    return (
        start_month_and_day == end_month_and_day
        and start_time == "00:00:00"
        and end_time == "23:59:00"
    )


def convert_to_rfc3339(date: str):
    rfc3339_format = "%Y-%m-%dT%H:%M:%S"
    date_object = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")

    return date_object.strftime(rfc3339_format)


def convert_to_yyy_mm_dd(date: str):
    yyy_mm_dd_format = "%Y-%m-%d"
    date_object = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
    return date_object.strftime(yyy_mm_dd_format)

def getdata(url): 
    r = requests.get(url) 
    return r.text 

@dataclass
class Event:
    start_time: str = field(compare=False)
    end_time: str = field(compare=False)
    summary: str
    description: str
    img_src : str
    bonus:list

    def to_dict(self):
        if is_all_day_event(self.start_time, self.end_time):
            self.start_time = convert_to_yyy_mm_dd(self.start_time)
            self.end_time = convert_to_yyy_mm_dd(self.end_time)

            metadata = {
                "summary": self.summary,
                "description": self.description,
                "start": {"date": self.start_time},
                "end": {"date": self.end_time},
                "img_src": self.img_src,
                "bonus": self.bonus,
            }

        elif event_ends_next_year(self.start_time, self.end_time):
            self.start_time = convert_to_rfc3339(self.start_time)

            end_time_date_object = datetime.strptime(self.end_time, "%Y-%m-%d %H:%M:%S")
            end_time_date_object = end_time_date_object + relativedelta(year=1)

            self.end_time = end_time_date_object.strftime("%Y-%m-%d %H:%M:%S")
            self.end_time = convert_to_rfc3339(self.end_time)

            metadata = {
                "summary": self.summary,
                "description": self.description,
                "start": {"dateTime": self.start_time, "timeZone": "UTC-5"},
                "end": {"dateTime": self.end_time, "timeZone": "UTC-5"},
                "img_src": self.img_src,
                "bonus": self.bonus,
            }

        else:
            metadata = {
                "summary": self.summary,
                "description": self.description,
                "start": {"dateTime": self.start_time, "timeZone": "UTC-5"},
                "end": {"dateTime": self.end_time, "timeZone": "UTC-5"},
                "img_src": self.img_src,
                "bonus": self.bonus,
            }

        return metadata

    def __str__(self):
        return str(self.to_dict())


def main():
    events = defaultdict()
    driver = webdriver.Chrome(ChromeDriverManager().install())

    url = "https://leekduck.com/events"

    driver.get(url)

    soup = BeautifulSoup(driver.page_source, "lxml")

    soup = soup.find_all("div", class_="current-events")[0]

    soup = soup.find_all(
        "span",
        class_="event-header-item-wrapper"
    )

    event_links = set()

    for span in soup:
        event_name = span.find("a").get("href")
        if "unannounced" in event_name:
            continue
        link = f"https://leekduck.com{event_name}"
        event_links.add(link)

    for link in event_links:
        soup_bonus=[]
        htmldata = getdata(link) 
        soup = BeautifulSoup(htmldata, 'html.parser') 
        for item in soup.find_all('img'):
            img_link='https://leekduck.com'+item['src']
            break
        for soups in soup.find_all("div",class_="bonus-text"):
            soup_bonus.append(soups.string)

        print(soup_bonus)
        driver.get(link)
        soup = BeautifulSoup(driver.page_source, "lxml")

        title = soup.find("h1").text.strip()  

        start_date = (
            WebDriverWait(driver, 10)
            .until(EC.presence_of_element_located((By.ID, "event-date-start")))
            .text.strip()
            .rstrip(",")
            .replace("  ", " ")
        )
        start_time = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "event-time-start"))
        ).text.split("M")[0] + "M".replace("  ", " ")

        complete_start_date = f"{start_date}, {start_time}"

        end_date = (
            WebDriverWait(driver, 10)
            .until(EC.presence_of_element_located((By.ID, "event-date-end")))
            .text.strip()
            .rstrip(",")
            .replace("  ", " ")
        )
        end_time = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "event-time-end"))
        ).text.split("M")[0] + "M".replace("  ", " ")

        complete_end_date = f"{end_date}, {end_time}"
        
        if start_date != "None":
            parsed_start_date = parse_date(complete_start_date)
            parsed_end_date = parse_date(complete_end_date)

            new_event = Event(parsed_start_date, parsed_end_date, title, link,img_link,soup_bonus)
            events[link] = new_event

    df=pandas.DataFrame(events,index=[0]).T
    df.columns=['Summary']
    df.to_csv('./file.csv')
    driver.quit()
    

if __name__ == "__main__":
    main()