import pandas as pd
import json
from bottle import *

links=[]
summaries=[]
json_summary=[]
df_summaries=[]
start_date=[]
start_date_v2=[]

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
    start_date.append(summ[i].replace('{',''))
    
    json_summary.append(summ[0].replace('{',''))
#print(start_date)

for summary in json_summary:
    split_sum=summary.split(':')
    df_summaries.append(split_sum[1])

for sdate in start_date:
    split_date=sdate.split(':',1)
    #split_date_v2=str(split_date).split(':',1)
    start_date_v2.append(split_date[1])
#print(df_summaries)

pokemon_data['Summary']=df_summaries
pokemon_data['Start DateTime'] = start_date_v2
print(pokemon_data)
pokemon_json=pokemon_data.to_json();
print(pokemon_json)

@get('/')
def server_json():
    return{"msg":pokemon_json,"error":"Cannot Host Data"}

run(host='localhost',port=8080)
#pokemon_data.to_csv('./cleaned.csv')
    
#split json_Summary on : and create a column in datafarme with column :Summary