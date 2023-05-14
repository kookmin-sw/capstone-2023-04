import urllib.request
import json
import os

class FindingRoute():
    def geocoding(self, address_list):
        client_id = os.environ['map_id']
        client_secret = os.environ['map_secret']
        geocode = []
        
        for address in address_list:
            query = urllib.parse.quote(address)
            url = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=' + query

            request = urllib.request.Request(url)
            request.add_header('X-NCP-APIGW-API-KEY-ID', client_id)
            request.add_header('X-NCP-APIGW-API-KEY', client_secret)

            response = urllib.request.urlopen(request)
            rescode = response.getcode()

            if(rescode == 200):
                response_body = response.read()
                response_dict = json.loads(response_body.decode('utf-8'))
                longitude = response_dict['addresses'][0]['x']
                latitude = response_dict['addresses'][0]['y']
                geocode.append([longitude, latitude])
        print("성공")
        return geocode
        
    def find_route(self, geocode_list):
        api_key = urllib.parse.quote(os.environ['transport_key'])
        SX = geocode_list[0][0]
        SY = geocode_list[0][1]
        EX = geocode_list[1][0]
        EY = geocode_list[1][1]
        
        url = "https://api.odsay.com/v1/api/searchPubTransPathT?SX=" +SX +"&SY="+SY+ "&EX=" + EX + "&EY=" + EY + "&apiKey="+api_key
        
        request = urllib.request.Request(url)
        response = urllib.request.urlopen(request)
        rescode = response.getcode()
        
        if(rescode == 200):
            response_body = response.read()
            response_dict = json.loads(response_body.decode('utf-8'))
           
            busCount = response_dict['result']["busCount"]
            subwayCount = response_dict['result']["subwayCount"]
            subwayBusCount = response_dict['result']["subwayBusCount"]
            count = {'totalCount' : busCount + subwayCount + subwayBusCount,'busCount' : busCount, 'subwayCount' : subwayCount, 'subwayBusCount' : subwayBusCount}
        
            path = {'path' : response_dict['result']['path']}
        
            print(count, path)
            
            result = [count, path]
            
            return result
                

        