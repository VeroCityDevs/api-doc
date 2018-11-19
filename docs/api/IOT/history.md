# Historical Data (WIP)

When enabled, the historical data are collected every change of context data and wrote into a Static Data Lake.
This process is done using Orion Context Broker ability to subscribe


### Get history header status

The  history data information can be retrieved using  `GET /api/v1/public/iot/history/{{data_model}}`, which return is:

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
| className  |String value with class name.  |
| enabled | Boolean value with status indicating if the history is enabled  |
| lastNotification  | Datetime in ISO1806 with time zone  |
| timesSent  | Integer value it count times that the notification has sent.  |



### Historical data structure:

The historical data are stored into a NoSQL Column oriented database, each attribute (Datapoint) has their own row in this database.
For example, an Entity with 3 attributes generate 3 rows for every context change, the aggregation value available is the Date, since the Throttling is limited to 1 second.

> The throttling element is used to specify a minimum inter-notification arrival time. 
> So, setting throttling to 5 seconds as in the example above, makes a notification not to be sent if a previous notification was sent less than 5 seconds ago, no matter how many actual changes take place in that period. This is to give the notification receptor a means to protect itself against context producers that update attribute values too frequently. 
> In multi-CB configurations, take into account that the last-notification measure is local to each CB node. 
> Although each node periodically synchronizes with the DB in order to get potencially newer values (more on this here) it may happen that a particular node has an old value, **so throttling is not 100% accurate**. 
To know more about the Orion Context Broker Subscription and Notification access their documentation [here](https://fiware-orion.readthedocs.io/en/develop/user/walkthrough_apiv2/index.html#subscriptions)

|  field | description   |
|---|---|
| device_class  |String value with class name.  |
| device_id | Device ID  |
| datapoint  | The entity attribute name. |
| insertion_time  | Datetime in ISO1806 with time zone  |
| val_num  | Numeric value when the attribute is a Integer or Float value.  |
| val_raw  | The raw data received from the Context Broker notification for this attribute (datapoint).  |

> The historical database will be normalized in the future releases so the field `device_class` will be renamed to `data_model` and `device_id` to `entity_id` 

Example:
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





### Get Historical points
