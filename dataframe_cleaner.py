import pandas as pd
import json
from bottle import *
from pivottablejs import pivot_ui
import re
from ast import literal_eval
import requests
from urllib.request import Request,urlopen
import shutil
import constants


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

df=pd.read_csv(constants.URL+'file.csv')

pokemonData=pd.DataFrame()

def getPokeName(pokeId,mainurl,req):
    responseJSON=urlopen(req)
    dataJSONType=json.loads(responseJSON.read())
    typeData=dataJSONType['forms']
    typeData=str(typeData).split('name')
    typeData=typeData[1].split(',')
    typeData=typeData[0].split(':')
    typeData=typeData[1].replace(" ","")
    typeData=typeData.replace('\'','')
    return typeData

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
    description.append(summ.replace('}','').lstrip())

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
        pokeId=pokeId.lstrip()
        #pokeId=int(pokeId.strip() or 0)
        if len(pokeId)>0:
            if '_51' in pokeId:
                pokeId=pokeId.replace('_51','')
                mainurl=url+pokeId
                req = Request(
                    url=mainurl, 
                    headers={'User-Agent': 'Mozilla/5.0'}
                )
                typeData=getPokeName(pokeId,mainurl,req)
                if pokeId == '6' or pokeId == '150':
                    newurl=url+(typeData+'-mega-x')
                else:
                    newurl=url+(typeData+'-mega')
                req2=Request(
                    url=newurl, 
                    headers={'User-Agent': 'Mozilla/5.0'}
                )
                responseJSON2=urlopen(req2)
                dataJSONType2=json.loads(responseJSON2.read())
                for k in range(len(dataJSONType2['types'])):
                    typeData2=dataJSONType2['types'][k]
                    typeData2=str(typeData2).split('name')
                    typeData2=typeData2[1].split(',')
                    typeData2=typeData2[0].split(':')
                    typeData2=typeData2[1].replace(" ","")
                    typeData2=typeData2.replace('\'','')
                    pokemonMiniType2.append(typeData2)
                pokemonMiniType.append(pokemonMiniType2)
            elif '_52' in pokeId:
                pokeId=pokeId.replace('_52','')
                mainurl=url+pokeId
                req = Request(
                    url=mainurl, 
                    headers={'User-Agent': 'Mozilla/5.0'}
                )
                typeData=getPokeName(pokeId,mainurl,req)
                newurl=url+(typeData+'-mega-y')
                req2=Request(
                    url=newurl, 
                    headers={'User-Agent': 'Mozilla/5.0'}
                )
                responseJSON2=urlopen(req2)
                dataJSONType2=json.loads(responseJSON2.read())
                for k in range(len(dataJSONType2['types'])):
                    typeData2=dataJSONType2['types'][k]
                    typeData2=str(typeData2).split('name')
                    typeData2=typeData2[1].split(',')
                    typeData2=typeData2[0].split(':')
                    typeData2=typeData2[1].replace(" ","")
                    typeData2=typeData2.replace('\'','')
                    pokemonMiniType2.append(typeData2)
                pokemonMiniType.append(pokemonMiniType2)
            else:
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
    dfSummaries.append(splitSumClean.lstrip())

for sdate in startDate:
    splitDate=sdate.split(':',1)
    #splitDate_v2=str(splitDate).split(':',1)
    splitDate=splitDate[1].split(':',1)
    splitDateString=splitDate[1].replace('\'','')
    splitDateString=splitDateString.lstrip()
    startDateV2.append(splitDateString)

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


for i in pokemonData['json']:
    data.append(json.loads(i))

for i in data:
    i['Img Src'] = literal_eval(i['Img Src'])
    i['Bonus'] = literal_eval(i['Bonus'])
    i['pokemonId'] = literal_eval(i['pokemonId'])
    
for j in data:
    for k in range(len(j['pokemonId'])):
        if '_51' in j['pokemonId'][k]:
            j['pokemonId'][k]=j['pokemonId'][k].replace('_51','')
        elif '_52' in j['pokemonId'][k]:
            j['pokemonId'][k]=j['pokemonId'][k].replace('_52','')

for k in data:
    for i in k['Img Src']:
        if '_shiny' in i:
            imageSrc=i.split('_shiny')
            imageSrc=imageSrc[0]+'.png'
            pokemonIdData = re. findall('\d+', imageSrc)
            pokemonIdCleaned = pokemonIdData[0].lstrip("0")
            if imageSrc not in k['Img Src']:
                k['Img Src'].append(imageSrc)
                k['pokemonId'].append(pokemonIdCleaned)
                if '_51' in imageSrc:
                    #add code to add types for pokemon
                    pokeURL='https://pokeapi.co/api/v2/pokemon/'
                    urlLink=pokeURL+str(pokemonIdCleaned)
                    pokereq = Request(
                        url=urlLink, 
                        headers={'User-Agent': 'Mozilla/5.0'}
                    )
                    typePoke=getPokeName(pokemonIdCleaned,urlLink,pokereq)
                    if pokemonIdCleaned == 6 or pokemonIdCleaned == 150:
                        newpokeurl=urlLink+(typePoke+'-mega-x')
                    else:
                        newpokeurl=urlLink+(typePoke+'-mega')
                    req3=Request(
                        url=newpokeurl, 
                        headers={'User-Agent': 'Mozilla/5.0'}
                    )
                    responseJSON3=urlopen(req3)
                    dataJSONType3=json.loads(responseJSON3.read())
                    pokemonMiniType3=[]
                    for h in range(len(dataJSONType3['types'])):
                        typeData3=dataJSONType3['types'][h]
                        typeData3=str(typeData3).split('name')
                        typeData3=typeData3[1].split(',')
                        typeData3=typeData3[0].split(':')
                        typeData3=typeData3[1].replace(" ","")
                        typeData3=typeData3.replace('\'','')
                        pokemonMiniType3.append(typeData3)
                    k['type'].append(pokemonMiniType3)
                elif '_52' in imageSrc:
                    pokeURL='https://pokeapi.co/api/v2/pokemon/'
                    urlLink=pokeURL+str(pokemonIdCleaned)
                    pokereq = Request(
                        url=urlLink, 
                        headers={'User-Agent': 'Mozilla/5.0'}
                    )
                    typePoke=getPokeName(pokemonIdCleaned,urlLink,pokereq)
                    newpokeurl=urlLink+(typePoke+'-mega-y')
                    req3=Request(
                        url=newpokeurl, 
                        headers={'User-Agent': 'Mozilla/5.0'}
                    )
                    responseJSON3=urlopen(req3)
                    dataJSONType3=json.loads(responseJSON3.read())
                    pokemonMiniType3=[]
                    for h in range(len(dataJSONType3['types'])):
                        typeData3=dataJSONType3['types'][h]
                        typeData3=str(typeData3).split('name')
                        typeData3=typeData3[1].split(',')
                        typeData3=typeData3[0].split(':')
                        typeData3=typeData3[1].replace(" ","")
                        typeData3=typeData3.replace('\'','')
                        pokemonMiniType3.append(typeData3)
                    k['type'].append(pokemonMiniType3)
                else:
                    pokeURL='https://pokeapi.co/api/v2/pokemon/'
                    newpokeurl=pokeURL+str(pokemonIdCleaned)
                    req3=Request(
                        url=newpokeurl, 
                        headers={'User-Agent': 'Mozilla/5.0'}
                    )
                    responseJSON3=urlopen(req3)
                    dataJSONType3=json.loads(responseJSON3.read())
                    pokemonMiniType3=[]
                    for h in range(len(dataJSONType3['types'])):
                        typeData3=dataJSONType3['types'][h]
                        typeData3=str(typeData3).split('name')
                        typeData3=typeData3[1].split(',')
                        typeData3=typeData3[0].split(':')
                        typeData3=typeData3[1].replace(" ","")
                        typeData3=typeData3.replace('\'','')
                        pokemonMiniType3.append(typeData3)
                    k['type'].append(pokemonMiniType3)


        elif '.s.' in i:
            imageSrc=i.split('.s')
            imageSrc=imageSrc[0]+'.icon.png'
            pokemonIdData = re. findall('\d+', imageSrc)
            pokemonIdCleaned = pokemonIdData[0].lstrip("0")
            print(pokemonIdCleaned)
            if imageSrc not in k['Img Src']:
                k['Img Src'].append(imageSrc)
                k['pokemonId'].append(pokemonIdCleaned)

#pokemonJson=pokemonData.to_json()  
#pokemonJsonCleaned=json.loads(pokemonJson)

#@get('/')
#def server_json():
    #return{"msg":pokemonJsonCleaned,"error":"Cannot Host Data"}

#run(host='localhost',port=8080)
#pokemon_object = json.dumps(pokemonJson,indent=4)

with open('C:/Users/Rahul V Hegde/Desktop/subbu/PokeDexGo/pokemon_data2.json',"w") as output_file:
    #output_file.write(pokemon_json.replace('\\','')+'\n')
    #output_file.write(pokemon_json_cleaned)
    #output_file.write(json.dumps({"data": pokemonJsonCleaned}, indent=4 ))
    output_file.write(json.dumps({"data": data}, indent=4 ))

#pokemonData.to_csv('./cleaned.csv')
shutil.copy((constants.URL+'pokemon_data2.json'),(constants.COMMIT_URL))