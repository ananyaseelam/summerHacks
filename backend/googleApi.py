import googlemaps
import pprint
import time
import requests
import json #// sort, search, etc 
import populartimes
import csv

# the result is a Python dictionary:

API_KEY = ''

def getPlaceID(address):
    gmaps = googlemaps.Client(key=API_KEY)
    oneplaceblob = gmaps.find_place(address, 'textquery')
    oneplaceID = ((oneplaceblob['candidates'])[0])['place_id']
    return oneplaceID

def returnCounty(placeID):
    gmaps = googlemaps.Client(key=API_KEY)
    oneplace = gmaps.place(str(placeID))
    #print(oneplace)
    searchString = (oneplace['result'])['address_components']
    searchString = str(searchString)
    county = countySearch(searchString)
    return county


def returnState(placeID):
    gmaps = googlemaps.Client(key=API_KEY)
    oneplace = gmaps.place(str(placeID))
    stateString = (oneplace['result'])['address_components']
    state = stateSearch(stateString)
    #print(json.dumps(oneplace, sort_keys=True, indent=4))
    return state

def returnPlaceType(address):
    gmaps = googlemaps.Client(key=API_KEY)
    oneplaceblob = gmaps.find_place(address, 'textquery')
    oneplaceID = ((oneplaceblob['candidates'])[0])['place_id']
    oneplace = gmaps.place(str(oneplaceID))
    placeType = (oneplace['result'])['types']
    return placeType[0]

def returnLL(address):
    gmaps = googlemaps.Client(key=API_KEY)
    oneplaceblob = gmaps.find_place(address, 'textquery')
    oneplaceID = ((oneplaceblob['candidates'])[0])['place_id']
    oneplace = gmaps.place(str(oneplaceID))
    ltlng = ((oneplace['result'])['geometry'])['location']
    return ltlng

def countySearch(searchString):
    searchString = str(searchString)
    #print(searchString)
    #county = searchString[:searchString.find(' County')]
    #pos = county.rindex("'")
    #countyVal = county[pos+1:]
    #return countyVal
    endCountyPos = searchString.find(", 'types': ['administrative_area_level_2'") - 8
    print(endCountyPos)
    if endCountyPos == -9: #location isn't in a county
        endCountyPos = searchString.find(", 'types': ['locality'") -1
        cutOffCountyPos = searchString[:endCountyPos].rfind(': ')+3
        county = searchString[cutOffCountyPos:endCountyPos]
        return (county + ' city')
    else: #else find county name
        cutOffCountyPos = searchString[:endCountyPos].rfind(': ')+3
        #print(searchString)
        county = searchString[cutOffCountyPos:endCountyPos]
        return county

def stateSearch(searchString):
    searchString = str(searchString)
    endStatePos = searchString.find(", 'types': ['administrative_area_level_1'") - 21
    cutOffStatePos = searchString[:endStatePos].rfind(': ')+3
    state = searchString[cutOffStatePos:endStatePos]
    return state

def returnPoptimes(day, hour, location):
    if (returnPlaceType(location) != 'locality' 
    and returnPlaceType(location) != 'sublocality'
    and returnPlaceType(location) != 'administrative_area_level_1'
    and returnPlaceType(location) != 'administrative_area_level_2'
    and returnPlaceType(location) != 'administrative_area_level_3'
    and returnPlaceType(location) != 'administrative_area_level_4'
    and returnPlaceType(location) != 'administrative_area_level_5'
    and returnPlaceType(location) != 'sublocality_level_1'
    and returnPlaceType(location) != 'sublocality_level_2'
    and returnPlaceType(location) != 'sublocality_level_3'
    and returnPlaceType(location) != 'sublocality_level_4'
    and returnPlaceType(location) != 'intersection'):
        # periodPos = hour.find('M') -1
        # timePeriod = hour[periodPos:] 
        # semiPos = hour.find(':')
        # hour = int(hour[:semiPos])
        # if timePeriod == "PM": #converts to military time
        #     hour+=12
        # if hour == 12: #changes 12 to 0
        #     hour = 0
        # if hour == 24: #changes 24 to 12
        #     hour = 12
        loc = hour.find(':')
        hour = hour[0:loc]
        print("time is: ", hour)
        dayNum = {'Monday':0, 'Tuesday':1, 'Wednesday':2, 'Thursday':3, 'Friday':4, 'Saturday':5, 'Sunday':6}
        poptimes = populartimes.get_id(API_KEY, getPlaceID(location))
        try:
            dataPoint = (((poptimes['populartimes'])[dayNum[str(day)]])['data'])[int(hour)-1]
        except KeyError:
            dataPoint = 0
    else:
        dataPoint = 0 
    return dataPoint

def avgTimeSpent(placeType):
    avgTimeRisk = 0
    with open('Average_Time_Spent_Risk.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if row[0] == placeType:
                avgTimeRisk = float(row[2])
    return avgTimeRisk

def avgTimeRisk(placeType, transportType):
    avgTimeRisk = 0
    with open('Average_Time_Spent_Risk.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        if transportType == True:
            for row in csv_reader:
                if row[0] == "meal_delivery":
                    avgTimeRisk = float(row[3])
        else:
            for row in csv_reader:
                if row[0] == placeType:
                    avgTimeRisk = float(row[3])
    return avgTimeRisk

def returnPlaceGroup(placeType):
    placeGroup = ''
    with open('Risk_by_PlaceType.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if row[0] == placeType:
                placeGroup = row[1]
    return placeGroup

def returnRiskPlaceType(placeGroup, transportType):
    riskPlaceType = 0
    print("place group is: ", placeGroup)
    print("entered risk place type")
    with open('Risk_by_PlaceType_Prereq.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        if transportType == True:
            for row in csv_reader:
                if row[0] == 'Delivery/Takeout':
                    riskPlaceType = float(row[4])
        else:
            print('entered else')
            for row in csv_reader:
                if row[0] == placeGroup:
                    print('placeGroup: ', placeGroup)
                    riskPlaceType = float(row[4])
    print(riskPlaceType)
    return riskPlaceType*10


