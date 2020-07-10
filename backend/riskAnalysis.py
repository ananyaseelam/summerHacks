from covidApi import findPercentChange
from googleApi import returnCounty, returnPlaceType, getPlaceID
from businessApi import returnPoptimes
import csv

def calculateRisk(pc, b, avg):
    risk = (pc*100)*0.33 + b*0.33 + avg*0.33
    return risk

location = 'Target Brier Creek'
county = returnCounty(getPlaceID(location))
placeType = returnPlaceType(location)

with open('Average_Time_Spent_Risk.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        if row[0] == placeType:
            avgTimeRisk = float(row[3])

perCh = findPercentChange(county)
busyness = returnPoptimes('Thursday', 19)
print(calculateRisk(perCh, busyness, avgTimeRisk))
