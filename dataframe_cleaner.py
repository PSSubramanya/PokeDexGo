import pandas as pd
import json
import unicodedata
from bottle import *
from pivottablejs import pivot_ui
import re

links=[]
summaries=[]
jsonSummary=[]
dfSummaries=[]
startDate=[]
startDateV2=[]
imgSrc=[]

df=pd.read_csv('./file.csv')

pokemonData=pd.DataFrame()

for i in range(len(df)):
    links.append(df.iloc[i,0])
    summaries.append(df.iloc[i,1])

pokemonData['Links'] = links

for summary in summaries:
    summ=summary.split(',')
    i=2
    if 'start' not in summ[2]:
        i=3
        while 'start' not in summ[i]:
            i+=1
    summCleanedDate=summ[i].replace('{','')
    startDate.append(summCleanedDate.replace('}',''))
    
    jsonSummary.append(summ[0].replace('{',''))
#print(startDate)

for summary in summaries:
    summ=summary.split(',')
    i=2
    if 'img' not in summ[2]:
        i=3
        while 'img' not in summ[i]:
            i+=1
    imgSplit=summ[i].split(':',1)
    imgSplit=imgSplit[1]
    imgSrc.append(imgSplit.replace('\'','').replace('}',''))

for summary in jsonSummary:
    splitSum=summary.split(':')
    splitSumClean=splitSum[1].replace('\\xa0',' ')
    splitSumClean=splitSumClean.replace('\"','')
    splitSumClean=splitSumClean.replace('\'','')
    splitSumClean=re.sub(r'[^\x00-\x7F]+','',splitSumClean)
    dfSummaries.append(splitSumClean)

for sdate in startDate:
    splitDate=sdate.split(':',1)
    #splitDate_v2=str(splitDate).split(':',1)
    startDateV2.append(splitDate[1].replace('\'',''))
#print(dfSummaries)

pokemonData['Summary']=dfSummaries
pokemonData['Start DateTime'] = startDateV2
pokemonData['Img Src'] = imgSrc

pivot_ui(pokemonData)

pokemonJson=pokemonData.to_json()
pokemonJsonCleaned=json.loads(pokemonJson)

@get('/')
def server_json():
    return{"msg":pokemonJsonCleaned,"error":"Cannot Host Data"}

#run(host='localhost',port=8080)
pokemon_object = json.dumps(pokemonJson,indent=4)

with open('./pokemon_data.json',"w") as output_file:
    #output_file.write(pokemon_json.replace('\\','')+'\n')
    #output_file.write(pokemon_json_cleaned)
    output_file.write(json.dumps({"data": pokemonJsonCleaned}, indent=4 ))

#pokemonData.to_csv('./cleaned.csv')