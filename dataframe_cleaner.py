import pandas as pd
import json
from bottle import *
from pivottablejs import pivot_ui
import re
from ast import literal_eval
import requests
from urllib.request import Request,urlopen


links=[]
summaries=[]
jsonSummary=[]
dfSummaries=[]
startDate=[]
startDateV2=[]
imgSrc=[]
bonus=[]
timeZone=[]
endDate=[]
description=[]
data=[]
pokemonId=[]
dateDuration=[]
pokemonType=[]

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
    summ=summary.split('img_src')
    summ=summ[1].split('Bonus')
    summ=summ[0].split(':',1)
    summ=summ[1].split('pokemonId')
    strToBeCleaned=summ[0]
    strToReplace='\''
    replacementStr=''
    pos=strToBeCleaned.rfind(strToReplace)
    if pos >-1:
        summCleanedSplit=strToBeCleaned[:pos]+replacementStr + strToBeCleaned[pos + len(strToReplace): ]
    else:
        summCleanedSplit=strToBeCleaned
    strToReplace2=','
    pos2=summCleanedSplit.rfind(strToReplace2)
    if pos2 >-1:
        summCleanedSplit=summCleanedSplit[:pos2]+replacementStr + summCleanedSplit[pos2 + len(strToReplace): ]
    else:
        summCleanedSplit=summCleanedSplit
    imgSrc.append(summCleanedSplit)

for summary in summaries:
     summ= summary.split('timeZone')
     #summSplit=summ[1].split(':',1)
     summ=summ[0].split('Bonus')
     summ=summ[1].split(':',1)
     summ=summ[1]
     #summCleaned=summSplit[1].replace('}','')
     #summCleanedSplit=summCleaned.split('timeZone')
     strToBeCleaned=summ
     strToReplace='\''
     replacementStr=''
     pos=strToBeCleaned.rfind(strToReplace)
     if pos >-1:
         summCleanedSplit=strToBeCleaned[:pos]+replacementStr + strToBeCleaned[pos + len(strToReplace): ]
     else:
         summCleanedSplit=strToBeCleaned
     strToReplace2=','
     pos2=summCleanedSplit.rfind(strToReplace2)
     if pos2>-1:
         summCleanedSplit=summCleanedSplit[:pos2]+replacementStr + summCleanedSplit[pos2 + len(strToReplace2): ]
     else:
        summCleanedSplit=strToBeCleaned
     bonus.append(summCleanedSplit)

for summary in summaries:
    summ=summary.split('end')
    summ=summ[1].split('img_src')
    summ=summ[0].split(':',1)
    summ=summ[1].split(':',1)
    summ=summ[1].replace('}','')
    summ=summ.replace(',','')
    strToReplace='\''
    replacementStr=''
    pos=summ.rfind(strToReplace)
    if pos >-1:
        summCleanedSplit=summ[:pos]+replacementStr + summ[pos + len(strToReplace): ]
    else:
        summCleanedSplit=summ
    summCleanedSplit=summCleanedSplit.replace('\'','')
    summCleanedSplit=summCleanedSplit.lstrip()
    summCleanedSplit=summCleanedSplit.rstrip()
    endDate.append(summCleanedSplit)

for summary in summaries:
    summ=summary.split('timeZone')
    summTimeZone=summ[1].split(':')
    summTimeZone=summTimeZone[1].split(',')
    summTimeZone=summTimeZone[0].replace('}','')
    summTimeZone=summTimeZone.replace('\'','')
    summTimeZone=summTimeZone.replace(' ','')
    if summTimeZone=="":
        summTimeZone="LocalTime"
        timeZone.append(summTimeZone.replace('\\xa0',''))
    elif summTimeZone!="":
        timeZone.append(summTimeZone.replace('\\xa0',''))

for summary in summaries:
    summ=summary.split('Description')
    summ=summ[1].split(':',1)
    summ=str(summ[1])
    summ=re.sub(r'<.*?>','',summ)
    summ=summ.replace('\'','')
    description.append(summ.replace('}',''))

for summary in summaries:
    summ=summary.split('pokemonId')
    summ=summ[1].split('Bonus')
    strToBeCleaned=summ[0]
    strToReplace=','
    replacementStr=''
    pos=strToBeCleaned.rfind(strToReplace)
    if pos >-1:
        summCleanedSplit=strToBeCleaned[:pos]+replacementStr + strToBeCleaned[pos + len(strToReplace): ]
    else:
        summCleanedSplit=strToBeCleaned
    summ=summCleanedSplit.split(':',1)
    strToBeCleaned2=summ[1]
    strToReplace2='\''
    replacementStr2=''
    pos2=strToBeCleaned2.rfind(strToReplace2)
    if pos2 >-1:
        summCleanedSplit=strToBeCleaned2[:pos2]+replacementStr2 + strToBeCleaned2[pos2 + len(strToReplace2): ]
    else:
        summCleanedSplit=strToBeCleaned2
    pokemonId.append(summCleanedSplit)
    pokemonIdSplit=summCleanedSplit.split(',')
    pokemonMiniType=[]
    url='https://pokeapi.co/api/v2/pokemon/'
    for i in pokemonIdSplit:
        pokemonMiniType2=[]
        pokeId=i.replace('\'','')
        pokeId=pokeId.replace('[','')
        pokeId=pokeId.replace(']','')
        pokeId=int(pokeId.strip() or 0)
        if pokeId!=0:
            mainurl=url+str(pokeId)
            req = Request(
            url=mainurl, 
            headers={'User-Agent': 'Mozilla/5.0'}
            )
            responseJSON=urlopen(req)
            dataJSONType=json.loads(responseJSON.read())
            #print(len(dataJSONType['types']))
            for j in range(len(dataJSONType['types'])):
                typeData=dataJSONType['types'][j]
                typeData=str(typeData).split('name')
                typeData=typeData[1].split(',')
                typeData=typeData[0].split(':')
                typeData=typeData[1].replace(" ","")
                typeData=typeData.replace('\'','')
                pokemonMiniType2.append(typeData)
            pokemonMiniType.append(pokemonMiniType2)
        else:
            pokemonMiniType.append(list())
    pokemonType.append(pokemonMiniType)

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
    splitDate=splitDate[1].split(':',1)
    splitDateString=splitDate[1].replace('\'','')
    splitDateString=splitDateString.lstrip()
    startDateV2.append(splitDateString)
#print(dfSummaries)

for i in range(len(startDateV2)):
    startDateDuration=startDateV2[i].lstrip(' ').split(' ',1)
    endDateDuration=endDate[i].lstrip(' ').split(' ',1)
    duration=pd.date_range(start=startDateDuration[0],end=endDateDuration[0])

    gapDuration=[]
    for i in duration:
        match_str = re.search(r'\d{4}-\d{2}-\d{2}',str(i))
        res = datetime.strptime(match_str.group(), '%Y-%m-%d').date()
        gapDuration.append(str(res))
    dateDuration.append(gapDuration)

pokemonData['Summary']=dfSummaries
pokemonData['Start DateTime'] = startDateV2
pokemonData['End DateTime'] = endDate
pokemonData['Duration'] = dateDuration
pokemonData['Img Src'] = imgSrc
pokemonData['pokemonId'] = pokemonId
pokemonData['type'] = pokemonType
pokemonData['Bonus'] = bonus
pokemonData['timeZone'] = timeZone
pokemonData['Description'] = description

pokemonData['json'] = pokemonData.to_json(orient='records', lines=True).splitlines()

pivot_ui(pokemonData)

for i in pokemonData['json']:
    data.append(json.loads(i))

for i in data:
    i['Img Src'] = literal_eval(i['Img Src'])
    i['Bonus'] = literal_eval(i['Bonus'])
    i['pokemonId'] = literal_eval(i['pokemonId'])
    """ if i['type'][0] != list():
        for j in range(len(i['type'])):
            i['type'][j] = literal_eval(i['type'][j]) """
            
#pokemonJson=pokemonData.to_json()
#pokemonJsonCleaned=json.loads(pokemonJson)

#@get('/')
#def server_json():
    #return{"msg":pokemonJsonCleaned,"error":"Cannot Host Data"}

#run(host='localhost',port=8080)
#pokemon_object = json.dumps(pokemonJson,indent=4)

with open('./pokemon_data2.json',"w") as output_file:
    #output_file.write(pokemon_json.replace('\\','')+'\n')
    #output_file.write(pokemon_json_cleaned)
    #output_file.write(json.dumps({"data": pokemonJsonCleaned}, indent=4 ))
    output_file.write(json.dumps({"data": data}, indent=4 ))

#pokemonData.to_csv('./cleaned.csv')