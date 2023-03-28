import pandas as pd

links=[]
summary=[]
df=pd.read_csv('./file.csv')

pokemon_data={}

for i in range(len(df)):
    #print(df.iloc[i, 0], df.iloc[i, 1])
    links.append(df.iloc[i,0])
    summary.append(df.iloc[i,1])
print(links)
print(summary)


