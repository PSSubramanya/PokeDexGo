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
import re
import constants

current_year = datetime.now().year

#to parse datetime into format
def parse_date(date: str) -> str:
    date_format = "%A, %B %d, at %I:%M %p"
    datetime_obj = datetime.strptime(date, date_format)
    day = datetime_obj.strftime("%d")
    month = datetime_obj.strftime("%m")
    time = datetime_obj.strftime("%H:%M")
    parsed_date = f"{current_year}-{month}-{day} {time}:00"
    return parsed_date

#to check if event ends next year
def event_ends_next_year(start_date: str, end_date: str):
    start_month = start_date[5:7]
    end_month = end_date[5:7]
    return int(start_month) == 12 and int(end_month) < 12

#to check if event is all day  
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

#convert date to RFC 3339
def convert_to_rfc3339(date: str):
    rfc3339_format = "%Y-%m-%dT%H:%M:%S"
    date_object = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")

    return date_object.strftime(rfc3339_format)

#convert to year-month-date
def convert_to_yyy_mm_dd(date: str):
    yyy_mm_dd_format = "%Y-%m-%d"
    date_object = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
    return date_object.strftime(yyy_mm_dd_format)

#get data from url passed
def getdata(url): 
    r = requests.get(url) 
    return r.text 

#Class to parse the structure required for output
@dataclass
class Event:
    start_time: str = field(compare=False)
    end_time: str = field(compare=False)
    summary: str
    description: str
    img_src : str
    bonus:list
    timeZone:str
    Description:str
    pokemonId:list

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
                "pokemonId" : self.pokemonId,
                "Bonus": self.bonus,
                "timeZone": self.timeZone,
                "Description":self.Description,
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
                "start": {"dateTime": self.start_time},
                "end": {"dateTime": self.end_time},
                "img_src": self.img_src,
                "pokemonId" : self.pokemonId,
                "Bonus": self.bonus,
                "timeZone": self.timeZone,
                "Description":self.Description,
            }

        else:
            metadata = {
                "summary": self.summary,
                "description": self.description,
                "start": {"dateTime": self.start_time},
                "end": {"dateTime": self.end_time},
                "img_src": self.img_src,
                "pokemonId" : self.pokemonId,
                "Bonus": self.bonus,
                "timeZone": self.timeZone,
                "Description":self.Description,
            }

        return metadata

    def __str__(self):
        return str(self.to_dict())

#Main Method
def main():
    events = defaultdict()
    driver = webdriver.Chrome(ChromeDriverManager().install())

    #URL of leekducks
    url = "https://leekduck.com/events"

    driver.get(url)

    #get the lxml of the url page
    soup = BeautifulSoup(driver.page_source, "lxml")

    #find all div with class name "current-events"
    soup = soup.find_all("div", class_="current-events")[0]

    #find all spans with class="event-header-item-wrapper"
    soup = soup.find_all(
        "span",
        class_="event-header-item-wrapper"
    )
    timeZone = str()
    Description = str()
    event_links = set()
    img_src = list()

    for span in soup:
        #get all href from a in html of the url
        event_name = span.find("a").get("href")
        #if event is uannounced then pass since we dont have any deatils on the event
        if "unannounced" in event_name:
            continue
        link = f"https://leekduck.com{event_name}"
        #append list with url for all events in leekduck page
        event_links.add(link)
    
    #iterate through each link to obtain date
    for link in event_links:
        soup_bonus = []
        htmldata = getdata(link) 
        soup = BeautifulSoup(htmldata, 'html.parser') 
        soup2 = BeautifulSoup(driver.page_source, "lxml")
        
        img_src = []
        pokemonId = []
        #find all "img" in the event page
        for item in soup.find_all('img'):
            #get the source of the image so that i can used in the front end
            src = item.get("src")
            if src:
                src = requests.compat.urljoin(url, src)
                #to always include the first link in the img src list 
                if len(img_src)==0 or 'pokemon_icons' in src:
                    if '_crop' not in src:
                        if src not in img_src:
            #img_link='https://leekduck.com'+item['src']
                            img_src.append(src)
                            #find a digits in the img src string to get the pokemon id
                            pokemonIdData = re. findall('\d+', src)
                            if len(pokemonIdData)>0:
                                # if the digits is less or equal to 3 and pokemon_icons is in string of img src:
                                if len(pokemonIdData[0])<=3 and 'pokemon_icons' in src:
                                    #remove leading zeroes from pokemon id , since it is to be used in pokeapi api
                                    pokemonIdCleaned = pokemonIdData[0].lstrip("0")
                                    #check for mega pokemon
                                    if '_51.png' in src:
                                        pokemonId.append(str(pokemonIdCleaned+'_51'))
                                    elif '_52.png' in src:
                                        pokemonId.append(str(pokemonIdCleaned+'_52'))
                                    elif 'fMEGA' in src:
                                        pokemonId.append(str(pokemonIdCleaned+'fMEGA'))
                                    elif '_61.png' in src:
                                        pokemonId.append(str(pokemonIdCleaned+'_61'))
                                    elif 'fHISUIAN' in src:
                                        pokemonId.append(str(pokemonIdCleaned+'fHISUIAN'))
                                    else:
                                        pokemonId.append(pokemonIdCleaned)
                                        #print(pokemonIdData[0].lstrip("0"))
                elif 'shiny-icon' in src:
                    #prev_img_link=soup.findall("li",class_='pkmn-list-item')
                    img_poke_shiny=img_src[len(img_src)-1]   
                    if '.icon.' in img_poke_shiny and (img_poke_shiny.count('.s')<2):
                        print(img_poke_shiny)
                        print(img_poke_shiny.count('.s'))
                        img_poke_shiny=img_poke_shiny.split('.icon.')
                        img_poke_shiny=img_poke_shiny[0]+'.s.icon.png'
                        if img_poke_shiny not in img_src and img_poke_shiny.count('.s')<2:
                            img_src.append(img_poke_shiny)
                            pokemonIdData = re. findall('\d+', img_poke_shiny)
                            if len(pokemonIdData)>0:
                                # if the digits is less or equal to 3 and pokemon_icons is in string of img src:
                                if len(pokemonIdData[0])<=3 and 'pokemon_icons' in img_poke_shiny:
                                    #remove leading zeroes from pokemon id , since it is to be used in pokeapi api
                                    pokemonIdCleaned = pokemonIdData[0].lstrip("0")
                                    #check for mega pokemon
                                    if '_51.png' in img_poke_shiny or '_51.s.icon.png' in img_poke_shiny:
                                        print(img_poke_shiny)
                                        pokemonId.append(str(pokemonIdCleaned+'_51'))
                                    elif '_52.png' in img_poke_shiny or '_52.s.icon.png' in img_poke_shiny :
                                        pokemonId.append(str(pokemonIdCleaned+'_52'))
                                    elif 'fMEGA' in img_poke_shiny:
                                        pokemonId.append(str(pokemonIdCleaned+'fMEGA'))
                                    elif '_61.png' in img_poke_shiny  or '_61.s.icon.png' in img_poke_shiny :
                                        pokemonId.append(str(pokemonIdCleaned+'_61'))
                                    elif 'fHISUIAN' in img_poke_shiny:
                                        pokemonId.append(str(pokemonIdCleaned+'fHISUIAN'))
                                    else:
                                        pokemonId.append(pokemonIdCleaned)

                    elif '_shiny' in img_poke_shiny and  (img_poke_shiny.count('_shiny')<2 and img_poke_shiny.count('.s')<2):
                        print(img_poke_shiny)
                        img_poke_shiny=img_poke_shiny.split('.png')
                        img_poke_shiny=img_poke_shiny[0]+'_shiny.png'
                        if img_poke_shiny not in img_src and img_poke_shiny.count('_shiny')<2 and img_poke_shiny.count('.s')<2 :
                            img_src.append(img_poke_shiny)
                            pokemonIdData = re. findall('\d+', img_poke_shiny)
                            if len(pokemonIdData)>0:
                                # if the digits is less or equal to 3 and pokemon_icons is in string of img src:
                                if len(pokemonIdData[0])<=3 and 'pokemon_icons' in img_poke_shiny:
                                    #remove leading zeroes from pokemon id , since it is to be used in pokeapi api
                                    pokemonIdCleaned = pokemonIdData[0].lstrip("0")
                                    #check for mega pokemon
                                    if '_51.png' in img_poke_shiny or '_51_shiny.png' in img_poke_shiny:
                                        pokemonId.append(str(pokemonIdCleaned+'_51'))
                                    elif '_52.png' in img_poke_shiny or '_52_shiny.png' in img_poke_shiny:
                                        pokemonId.append(str(pokemonIdCleaned+'_52'))
                                    elif 'fMEGA' in img_poke_shiny:
                                        pokemonId.append(str(pokemonIdCleaned+'fMEGA'))
                                    elif '_61.png' in img_poke_shiny or '_61_shiny.png' in img_poke_shiny:
                                        pokemonId.append(str(pokemonIdCleaned+'_61'))
                                    elif 'fHISUIAN' in img_poke_shiny:
                                        pokemonId.append(str(pokemonIdCleaned+'fHISUIAN'))
                                    else:
                                        pokemonId.append(pokemonIdCleaned)
        #img_src.pop()
        #obtain all div with class="bonus" to get bonus details for thet event
        for soups in soup.find_all("div",class_="bonus-text"):
            soup_bonus.append(soups.string)
        #get all span with event end time for that event to get the timezone
        for span in soup2.find_all('span', {'id': 'event-time-end'}):
            timeZoneString = span.string
            #cleaning of data
            timeZoneSplit = timeZoneString.split('M')
            timeZone = timeZoneSplit[1]
        driver.get(link)
        soup = BeautifulSoup(driver.page_source, "lxml")

        #find the description of the event
        for p in soup.find_all("div",class_="event-description"):
            #find the paragraph to get event description
            data = p.find_all('p')
            #cleaning data
            desc = str(data[0]).replace('<p>','')
            Description = desc.replace('</p>','')

        #get the title of the event
        title = soup.find("h1").text.strip()  

        #get start date of the event
        start_date = (
            WebDriverWait(driver, 10)
            .until(EC.presence_of_element_located((By.ID, "event-date-start")))
            .text.strip()
            .rstrip(",")
            .replace("  ", " ")
        )
        #get start time of the event
        start_time = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "event-time-start"))
        ).text.split("M")[0] + "M".replace("  ", " ")

        #calculate start date time
        complete_start_date = f"{start_date}, {start_time}"

        #get end date
        end_date = (
            WebDriverWait(driver, 10)
            .until(EC.presence_of_element_located((By.ID, "event-date-end")))
            .text.strip()
            .rstrip(",")
            .replace("  ", " ")
        )
        #get end time
        end_time = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "event-time-end"))
        ).text.split("M")[0] + "M".replace("  ", " ")

        #calculate end date time
        complete_end_date = f"{end_date}, {end_time}"
        
        #if start date not empty , parse the dates and pass data to Event class to structure it
        if start_date != "None":
            parsed_start_date = parse_date(complete_start_date)
            parsed_end_date = parse_date(complete_end_date)

            new_event = Event(parsed_start_date, parsed_end_date, title, link,img_src,soup_bonus,timeZone,Description,pokemonId)
            events[link] = new_event

    #create a dataframe of events to be saved as csv
    df = pandas.DataFrame(events,index=[0]).T
    df.columns = ['Summary']
    df.to_csv(constants.URL+'file.csv')
    driver.quit()
    

if __name__ == "__main__":
    main()