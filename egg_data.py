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

@dataclass
class Event:
    imgSrc : list
    pokemonName : list
    combatPower : list

    def to_dict(self):
        metadata = {
                "imgSrc": self.imgSrc,
                "pokemonName": self.pokemonName,
                "combatPower":self.combatPower,
        }

        return metadata

    def __str__(self):
        return str(self.to_dict())

def main():
    events = defaultdict()
    driver = webdriver.Chrome(ChromeDriverManager().install())
    distance =[]
    imgSrc=[]
    pokemonName=[]
    combatPower=[]

    url = "https://leekduck.com/eggs/"

    driver.get(url)

    soup = BeautifulSoup(driver.page_source, "lxml")

    for item in soup.find_all('h2'):
        distance.append(item.string)
    distance2=distance.pop()

    for i in range(len(distance)):
        soup1=soup.find_all("ul",class_='egg-list-flex')[i]
        soup2=soup1.find_all("li",class_='egg-list-item')
        for li in soup2:
            img=li.find('img')
            src=img.get('src')
            if src:
                src = requests.compat.urljoin(url, src)
                imgSrc.append(src)
            span=li.find("span",class_='hatch-pkmn')
            pokemonName.append(span.string)
            spanCp=li.find("div",class_='font-size-smaller color-555555')
            spanCpStr=str(spanCp)
            spanCpList=spanCpStr.split('n>')[1]
            spanCpCleaned=str(spanCpList).replace('</div>','')
            combatPower.append(spanCpCleaned.replace('\n','').strip())
        events[distance[i]]=Event(imgSrc,pokemonName,combatPower)
        imgSrc=[]
        pokemonName=[]
        combatPower=[]
    
    df=pandas.DataFrame(events,index=[0]).T
    df.columns=['Summary']
    df.to_csv('./egg_data.csv')
    driver.quit()

if __name__ == "__main__":
    main()