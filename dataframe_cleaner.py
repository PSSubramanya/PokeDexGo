import pandas as pd
import json
import unicodedata
from bottle import *
from pivottablejs import pivot_ui
import re

links=[]
summaries=[]
json_summary=[]
df_summaries=[]
start_date=[]
start_date_v2=[]
img_src=[]

df=pd.read_csv('./file.csv')

pokemon_data=pd.DataFrame()

for i in range(len(df)):
    links.append(df.iloc[i,0])
    summaries.append(df.iloc[i,1])

pokemon_data['Links'] = links

for summary in summaries:
    summ=summary.split(',')
    i=2
    if 'start' not in summ[2]:
        i=3
        while 'start' not in summ[i]:
            i+=1
    summ_cleaned_date=summ[i].replace('{','')
    start_date.append(summ_cleaned_date.replace('}',''))
    
    json_summary.append(summ[0].replace('{',''))
#print(start_date)

for summary in summaries:
    summ=summary.split(',')
    i=2
    if 'img' not in summ[2]:
        i=3
        while 'img' not in summ[i]:
            i+=1
    img_split=summ[i].split(':',1)
    img_split=img_split[1]
    img_src.append(img_split.replace('\'','').replace('}',''))

for summary in json_summary:
    split_sum=summary.split(':')
    split_sum_clean=split_sum[1].replace('\\xa0',' ')
    split_sum_clean=split_sum_clean.replace('\"','')
    split_sum_clean=split_sum_clean.replace('\'','')
    split_sum_clean=re.sub(r'[^\x00-\x7F]+','',split_sum_clean)
    df_summaries.append(split_sum_clean)

for sdate in start_date:
    split_date=sdate.split(':',1)
    #split_date_v2=str(split_date).split(':',1)
    start_date_v2.append(split_date[1].replace('\'',''))
#print(df_summaries)

pokemon_data['Summary']=df_summaries
pokemon_data['Start DateTime'] = start_date_v2
pokemon_data['Img Src'] = img_src

pivot_ui(pokemon_data)

pokemon_json=pokemon_data.to_json()
pokemon_json_cleaned=json.loads(pokemon_json)

@get('/')
def server_json():
    return{"msg":pokemon_json,"error":"Cannot Host Data"}

#run(host='localhost',port=8080)
pokemon_object = json.dumps(pokemon_json,indent=4)

with open('./pokemon_data.json',"w") as output_file:
    #output_file.write(pokemon_json.replace('\\','')+'\n')
    #output_file.write(pokemon_json_cleaned)
    output_file.write(json.dumps({"data": pokemon_json_cleaned}, indent=4 ))

#pokemon_data.to_csv('./cleaned.csv')