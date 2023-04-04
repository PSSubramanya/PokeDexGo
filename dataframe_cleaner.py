import pandas as pd
import json
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
bonus=[]
timeZone=[]
endDate=[]
description=[]

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
    strToBeCleaned=summ[1]
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
    endDate.append(summCleanedSplit.replace('\'',''))

for summary in summaries:
    summ=summary.split('timeZone')
    summTimeZone=summ[1].split(':')
    summTimeZone=summTimeZone[1].split(',')
    summTimeZone=summTimeZone[0].replace('}','')
    summTimeZone=summTimeZone.replace('\'','')
    summTimeZone=summTimeZone.replace(' ','')
    timeZone.append(summTimeZone.replace('\\xa0',''))

for summary in summaries:
    summ=summary.split('Description')
    summ=summ[1].split(':',1)
    summ=str(summ[1])
    summ=re.sub(r'<.*?>','',summ)
    summ=summ.replace('\'','')
    description.append(summ.replace('}',''))

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
    startDateV2.append(splitDate[1].replace('\'',''))
#print(dfSummaries)

pokemonData['Summary']=dfSummaries
pokemonData['Start DateTime'] = startDateV2
pokemonData['End DateTime'] = endDate
pokemonData['Img Src'] = imgSrc
pokemonData['Bonus'] = bonus
pokemonData['timeZone'] = timeZone
pokemonData['Description'] = description

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