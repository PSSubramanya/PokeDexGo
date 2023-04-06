import pandas as pd
import json
from bottle import *
from pivottablejs import pivot_ui
import re
from ast import literal_eval

data=[]
distance=[]
summaries=[]
imgSrc=[]
pokemonName=[]
combatPower=[]

df=pd.read_csv('./egg_data.csv')

eggData=pd.DataFrame()

for i in range(len(df)):
    distance.append(df.iloc[i,0])
    summaries.append(df.iloc[i,1])

eggData['Distance'] = distance

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

    imgSrc.append(summCleanedSplit)

for  summary in summaries:
    summ=summary.split('pokemonName')
    summ=summ[1].split('combatPower')
    summ=summ[0].split(':')
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
    pokemonName.append(summCleanedSplit)

for  summary in summaries:
    summ=summary.split('combatPower')
    summ=summ[1].split(':',1)
    summ=summ[1].replace('}','')
    combatPower.append(summ)

eggData['imgSrc'] = imgSrc
eggData['pokemonName'] = pokemonName
eggData['combatPower'] = combatPower

eggData['json'] = eggData.to_json(orient='records', lines=True).splitlines()

pivot_ui(eggData)

for i in eggData['json']:
    data.append(json.loads(i))

for i in data:
    i['imgSrc'] = literal_eval(i['imgSrc'])
    i['pokemonName'] = literal_eval(i['pokemonName'])
    i['combatPower'] = literal_eval(i['combatPower'])

with open('./egg_data.json',"w") as output_file:
    #output_file.write(pokemon_json.replace('\\','')+'\n')
    #output_file.write(pokemon_json_cleaned)
    #output_file.write(json.dumps({"data": pokemonJsonCleaned}, indent=4 ))
    output_file.write(json.dumps({"data": data}, indent=4 ))