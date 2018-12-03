# Historical Data 

When enabled, the historical data is collected at every change of context data and written into a Static Data Lake. This process is done using Orion Context Broker's ability to subscribe.


### Get history header status

The history data information can be retrieved using  `GET /api/v1/public/iot/history/{{data_model}}`, which return is:

```json
{
    "ret": {
        "className": "AirQualityObserved",
        "enabled": true,
        "lastNotification": "2018-11-06T14:46:34.00Z",
        "timesSent": 628
    },
    "message": "OK"
}
```



#### Data structure


|  field | description   |
|---|---|
| className  | String value with class name.  |
| enabled | Boolean value with status indicating if the history is enabled  |
| lastNotification  | Datetime in ISO1806 with time zone  |
| timesSent  | Integer value counts the number of times that the notification has been sent.  |



### Historical data structure:

The historical data is stored in a NoSQL Column-oriented database. Each attribute (Datapoint) has its own row in this database. For example, an Entity with 3 attributes generates 3 rows for every context change. The Throttling is limited to 1 second.

> The throttling element is used to specify a minimum inter-notification arrival time. 
> So, setting throttling to 5 seconds as in the example above makes a notification not to be sent if a previous notification was sent less than 5 seconds ago, no matter how many actual changes take place in that period. This is to give the notification receptor means to protect itself against context producers that update attribute values too frequently. 
> In multi-CB configurations, take into account that the last-notification measure is local to each CB node. 
> Although each node periodically synchronizes with the DB in order to get potencially newer values (more on this here) it may happen that a particular node has an old value, **so throttling is not 100% accurate**.

 
To know more about the Orion Context Broker Subscription and Notification, access their documentation [here](https://fiware-orion.readthedocs.io/en/develop/user/walkthrough_apiv2/index.html#subscriptions)

|  field | description   |
|---|---|
| device_class  | String value with class name.  |
| device_id | Device ID  |
| datapoint  | The entity attribute name. |
| insertion_time  | Datetime in ISO1806 with time zone  |
| val_num  | Numeric value when the attribute is an Integer or Float value.  |
| val_raw  | The raw data received from the Context Broker notification for this attribute (datapoint).  |  


> The historical database will be normalized in the future releases so the field `device_class` will be renamed to `data_model` and `device_id` to `entity_id` 


The object in JSON notation:  

```json
{
  "device_class": "BuildingEnergyObserved",
  "device_id": "Enkplatz4",
  "datapoint": "BoilerHeatMeter",
  "insertion_time": "2018-07-31T09:00:00-03:00",
  "val_num": 2580,
  "val_raw": 2580
}
```



## Get Historical points
To retrive historical points from the `Static Data Lake` you can use `POST {{base_url}}/api/v1/public/iot/history/all/{{data_model}}`:


|  field |type| description   |
|---|---|---|
|data_model|String| This parameter should be sent on the url immediately after all/ on URI|
|entity_id|String| This parameter represents the entity id|
|datapoint|String| The datapoint name|
|limit|Integer| Limit number of rows|


```bash
curl -X POST \
  {{base_url}}/api/v1/public/iot/history/all/{{data_model}} \
  -H 'authorization: Bearer {{access_token}}' \
  -H 'content-type: application/json' \
  -d '{"entity_id": "Enkplatz4","datapoint":"BoilerHeatMeter","limit": 3}'

```



The GET request can also be used   `GET {{base_url}}/api/v1/public/iot/history/all/{{data_model}}?params`: 

```bash
curl -X GET \
  {{base_url}}/api/v1/public/iot/history/all/BuildingEnergyObserved?entity_id=Enkplatz4&datapoint=BoilerHeatMeter&limit=3 \
  -H 'authorization: Bearer {{access_token}}'
```
If you chose to use GET you must convert the parameters to Query-String format.


The examples above, GET or POST, are queering the last 3 historical records from the `BoilerHeatMeter` of device `Enkplatz4`, with data model `BuildingEnergyObserved`, which result is: 


```json
{
    "ret": [
        {
            "device_class": "BuildingEnergyObserved",
            "device_id": "Enkplatz4",
            "datapoint": "BoilerHeatMeter",
            "insertion_time": "2018-07-31T09:00:00-03:00",
            "val_num": 2580,
            "val_raw": 2580
        },
        {
            "device_class": "BuildingEnergyObserved",
            "device_id": "Enkplatz4",
            "datapoint": "BoilerHeatMeter",
            "insertion_time": "2018-07-31T08:30:00-03:00",
            "val_num": 2580,
            "val_raw": 2580
        },
        {
            "device_class": "BuildingEnergyObserved",
            "device_id": "Enkplatz4",
            "datapoint": "BoilerHeatMeter",
            "insertion_time": "2018-07-31T08:00:00-03:00",
            "val_num": 2580,
            "val_raw": 2580
        }
    ],
    "message": "OK"
}
```


## Requesting an CSV export

The `Static Data Lake` is a storage repository that holds a vast amount of raw data in its native format until it is needed. It does not allow complex queries such filtering and aggregations. The analytics process was made by third-party software. 
To be able to consume this data from API, we implemented an export tool, that allows to get specific data and save it into a CSV file. 


You can request an export using `POST {{base_url}}/api/v1/public/iot/history/export` :

```bash
curl -X POST \
  {{base_url}}/api/v1/public/iot/history/export/{{data_model}} \
  -H 'authorization: Bearer {{access_token}}' \
  -H 'content-type: application/json' \
  -d '{
	"data_model":"BuildingEnergyObserved",
	"datapoints":["BoilerHeatMeter"],
	"entities": [],
	"start": "2018-11-06T14:46:34.00Z",
	"end": "2018-12-06T14:46:34.00Z"
}'
```
/{{data_model}}

The CSV export is done async on the server. If the requests success it will return the `exportId`: 

```json
{
    "ret": {
        "exportId": "5bf30e91f453b716f5360422"
    },
    "message": "OK"
}
```

### Check export status:

To check the status and get the status of the export you can use   `GET {{base_url}}/api/v1/public/iot/history/exportStatus/{{exportId}}`: 

```bash
curl -X GET \
  {{base_url}}/api/v1/public/iot/history/exportStatus/{{exportId}} \
  -H 'authorization: Bearer {{access_token}}'
```



Result:

```json
{
    "ret": {
        "status": "DONE",
        "params": {
            "data_model": "BuildingEnergyObserved",
            "datapoints": [
                "BoilerHeatMeter"
            ],
            "devices": [
                "Enkplatz4"
            ]
        },
        "artifact": "http://static_file_server/exports/csv/5bf3130ef453b74a1a786722",
        "expires": "2018-11-24T19:46:22+0000",
        "export_time": 0.086199999999999999,
        "statusId": "abf3130ef453b74a1a786722"
    },
    "message": "OK"
}
```

Detailed object: 


|  field | description   |
|---|---|
| status  | String value with status name. Possible values:  DONE|RUNNING|FAILURE|EXPIRED|NO_RESULTS |
| artifact | Artifact URL, it will redirect to download the file  |
| expires  | Datetime in ISO1806 with time zone when the artifact will expire.  |
| export_time  | Export time in seconds  |
| statusId  | String value with the export identification |
| params  | Object with the parameters sent to generate this export can be used to resend the export request.**** |

##### Status codes:

- `DONE` : The export was finished and is ready to be downloaded.
- `RUNNING`: The export is still running.
- `FAILURE`: The export failed.
- `EXPIRED`: The export has already expired. You should submit it again.
- `NO_RESULTS`: There is no results for your export.



### Retrieving the CSV file

The generated CSV file could be large according with the number of points.
 For this reason, the API will not serve it directly. Instead, the value of the `artifact` 
 attribute should be used to get the data from the static files server.
 
 The server will stream the binary of a zip file to the HTTP Client. It is not necessary authentication to access the file. So, keep the url in secret.
 
 Inside of the zip file there will be one csv file with raw data from historical database.
