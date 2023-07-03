from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from collections import defaultdict
from dataclasses import dataclass
from bs4 import BeautifulSoup
import pandas as pd
import requests
import json
from bottle import *
from pivottablejs import pivot_ui
from ast import literal_eval
import pandas as pd
import json
from bottle import *
import re
import requests
from urllib.request import Request,urlopen


@dataclass
class Event:
    imgSrc : list
    pokemonName : list
    combatPower : list
    shiny : list
    pokeId: list

    def to_dict(self):
        metadata = {
                "imgSrc": self.imgSrc,
                "pokemonName": self.pokemonName,
                "pokeId" : self.pokeId,
                "shiny": self.shiny,
                "combatPower": self.combatPower,
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
    data=[]
    distanceEgg=[]
    summaries=[]
    imgSrcEgg=[]
    pokemonNameEgg=[]
    combatPowerEgg=[]
    shinyEgg=[]
    shiny=[]
    pokeId=[]
    pokeIdEgg=[]

    url = "https://leekduck.com/eggs/"

    driver.get(url)

    soup = BeautifulSoup(driver.page_source, "lxml")

    for item in soup.find_all('h2'):
        distance.append(item.string)
    #distance2=distance.pop()
    newdis=distance[:7]
    for i in range(len(newdis)-1):
        soup1=soup.find_all("ul",class_='egg-list-flex')[i]
        soup2=soup1.find_all("li",class_='egg-list-item')
        for li in soup2:
            img=li.find('img')
            imgShiny=li.find("img",class_='shiny-icon')
            if imgShiny!=None:
                shiny.append(True)
            else:
                shiny.append(False)
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
        for h in pokemonName:
            pokeName=h.lower()
            if pokeName == 'mime jr.':
                pokeName = 'mr-mime-galar'
            elif 'far' in pokeName:
                pokeName = 'farfetchd-galar'
            elif 'alolan' in pokeName:
                pokeNamelist= pokeName.split(' ')
                pokeNamelist=pokeNamelist[1]
                pokeName=pokeNamelist+'-alola'
            elif 'galarian' in pokeName:
                pokeNamelist= pokeName.split(' ')
                pokeNamelist=pokeNamelist[1]
                pokeName=pokeNamelist+'-galar'
            elif 'hisuian' in pokeName:
                pokeNamelist= pokeName.split(' ')
                pokeNamelist=pokeNamelist[1]
                pokeName=pokeNamelist+'-hisui'
            url='https://pokeapi.co/api/v2/pokemon/'
            newurl=url+pokeName
            req=Request(
                url=newurl, 
                headers={'User-Agent': 'Mozilla/5.0'}
            )
            responseJSON2=urlopen(req)
            dataJSONType=json.loads(responseJSON2.read())
            pokeId.append(dataJSONType['id'])
        events[distance[i]]=Event(imgSrc,pokemonName,combatPower,shiny,pokeId)
        imgSrc=[]
        pokemonName=[]
        combatPower=[]
        shiny=[]
        pokeId=[]
    
    df=pd.DataFrame(events,index=[0]).T
    df.columns=['Summary']
    
    df.to_csv('./egg_data.csv')

    df=pd.read_csv('./egg_data.csv')
    eggData=pd.DataFrame()

    for i in range(len(df)):
        distanceEgg.append(df.iloc[i,0])
        summaries.append(df.iloc[i,1])

    eggData['Distance'] = distanceEgg

    for summary in summaries:
        summ=summary.split('pokemonName')
        summ=summ[0].split(':',1)
        strToBeCleaned=summ[1]
        strToReplace=','
        replacementStr=''
        pos=strToBeCleaned.rfind(strToReplace)
        if pos >-1:
            summCleanedSplit=strToBeCleaned[:pos]+replacementStr + strToBeCleaned[pos + len(strToReplace): ]
        else:
            summCleanedSplit=strToBeCleaned
        strToBeCleaned2=summCleanedSplit
        strToReplace2='\''
        replacementStr2=''
        pos2=strToBeCleaned2.rfind(strToReplace2)
        if pos2 >-1:
            summCleanedSplit=strToBeCleaned2[:pos2]+replacementStr2 + strToBeCleaned2[pos2 + len(strToReplace2): ]
        else:
            summCleanedSplit=strToBeCleaned2

        imgSrcEgg.append(summCleanedSplit)

    for  summary in summaries:
        summ=summary.split('pokemonName')
        summ=summ[1].split('combatPower')
        summ=summ[0].split(':')
        summ=summ[1].rsplit(',',1)
        strToBeCleaned=summ[0]
        """strToReplace=','
        replacementStr=''
        pos=strToBeCleaned.rfind(strToReplace)
        if pos >-1:
            summCleanedSplit=strToBeCleaned[:pos]+replacementStr + strToBeCleaned[pos + len(strToReplace): ]
        else:
            summCleanedSplit=strToBeCleaned
        #strToBeCleaned2=summCleanedSplit
        strToBeCleaned2=strToBeCleaned
        strToReplace2='\''
        replacementStr2=''
        pos2=strToBeCleaned2.rfind(strToReplace2)
        if pos2 >-1:
            summCleanedSplit=strToBeCleaned2[:pos2]+replacementStr2 + strToBeCleaned2[pos2 + len(strToReplace2): ]
        else:
            summCleanedSplit=strToBeCleaned2"""
        pokemonNameEgg.append(strToBeCleaned)

    for summary in summaries:
        summ=summary.split('combatPower')
        summ=summ[1].split(':',1)
        summ=summ[1].replace('}','')
        combatPowerEgg.append(summ)

    for summary in summaries:
        summ=summary.split('shiny')
        summ=summ[1].split('combatPower')
        summ=summ[0].split(':',1)
        summ=summ[1].rsplit(',',1)
        shinyEgg.append(summ[0])
    
    for summary in summaries:
        summ=summ=summary.split('pokeId')
        summ=summ[1].split('shiny')
        summ=summ[0].split(':',1)
        summ=summ[1].rsplit(',',1)
        pokeIdEgg.append(summ[0])


    eggData['imgSrc'] = imgSrcEgg
    eggData['pokemonName'] = pokemonNameEgg
    eggData['pokeId'] = pokeIdEgg
    eggData['shiny'] = shinyEgg
    eggData['combatPower'] = combatPowerEgg

    eggData['json'] = eggData.to_json(orient='records', lines=True).splitlines()

    pivot_ui(eggData)

    for i in eggData['json']:
        data.append(json.loads(i))

    for i in data:
        i['imgSrc'] = literal_eval(i['imgSrc'])
        i['pokemonName'] = literal_eval(i['pokemonName'])
        i['combatPower'] = literal_eval(i['combatPower'])
        i['shiny'] = literal_eval(i['shiny'])
        i['pokeId'] = literal_eval(i['pokeId'])

    with open('./egg_data.json',"w") as output_file:
        #output_file.write(pokemon_json.replace('\\','')+'\n')
        #output_file.write(pokemon_json_cleaned)
        #output_file.write(json.dumps({"data": pokemonJsonCleaned}, indent=4 ))
        output_file.write(json.dumps({"data": data}, indent=4 ))
        driver.quit()

if __name__ == "__main__":
    main()