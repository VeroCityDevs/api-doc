# Entities
On the vero city platform entities and their context state can be accessed with the RESTful API. This section will present what can be accessed trough the Entities endpoint.

## Characteristics of a Entity
An entity represents an actual element of a certain type (Data Model). To represent a real "thing" entities have two types of data: Description that identifies and details the entity and a "state", stored on the orion context, that is composed of the current data reading of the entitiy datapoints. The data that makes up the entity state is defined primarily by its Data Model, wich every entity must possess, but also can vary in both ways, having extra or fewer datapoints from what is defined by the data model schema.

## Accessing Entities Description Data (Headers)
To access the entities description data a GET request must be sent to `{{base_url}}/api/v1/public/Iot/Entities/`, for a list of entities, and to `{{base_url}}/api/v1/public/Iot/Entities/{{entity_id}}` to get data from a specific entity. The description data is composed of:

|  Parameter | Description | Type |
|---|---|---|
| id | Unique identifier of the entity. It must bem unique in all of the context independently of the entity data model. | string |
| descr | A optional user-friendly name for the entity. | string |
| label | A prefrerrably small name or identifier of the entity that is normally used on the Vero City Platform UIs. | string |
| obs | Any extra information about the entity | string |
| __public | A flag that indicates if this entity is public or not | boolean |
| class_name | The name of the data model of the entity | string |

The request format can be seen bellow:

```bash
curl --request GET \
  --url '{{base_url}}/api/v1/public/Iot/Entities/{{entitiy_id}}' \
  --header 'Authorization: Bearer {{access_token}}'
```

## Accessing the Context of a Entity
Every entity has the state of it's datapoints stored on the orion context. This endpoint allows to get the state data of a entity. The request, wich must be a GET, can be seen beelow:

```bash
curl --request GET \
  --url '{{base_url}}/api/v1/public/Iot/Entities/context/{{entity_id}}' \
  --header 'Authorization: Bearer {{access_token}}'
```

The response is an object representing the entity identified by the ID. The object follows the JSON entity representation format.

```json
{
    "ret": {
        "id": "Enkplatz4",
        "type": "BuildingEnergyObserved",
        "BoilerHeatMeter": {
            "type": "datapoint",
            "value": 2580,
            "metadata": {}
        },
        "BoilerWaterMeter": {
            "type": "datapoint",
            "value": 9.1539999999999999,
            "metadata": {}
        },
        "HeaterElectricityMeter": {
            "type": "datapoint",
            "value": 8852.4920000000002,
            "metadata": {}
        },
        "HeaterHeatMeter": {
            "type": "datapoint",
            "value": 113973,
            "metadata": {}
        },
        "TotalElectricityMeter": {
            "type": "datapoint",
            "value": 5015.8680000000004,
            "metadata": {}
        },
        "TotalWaterMeter": {
            "type": "datapoint",
            "value": 70.343000000000004,
            "metadata": {}
        },
        "_label": {
            "type": "String",
            "value": "Enkpl. 4",
            "metadata": {}
        },
        "_location": {
            "type": "geo:json",
            "value": {
                "type": "Point",
                "coordinates": [
                    16.411947300000001,
                    48.175454700000003
                ]
            },
            "metadata": {}
        },
        "_network": {
            "type": "branch_id",
            "value": [
                208,
                212,
                211
            ],
            "metadata": {}
        },
        "dateObserved": {
            "type": "datapoint",
            "value": "2018-07-31T12:00:00+0000",
            "metadata": {}
        },
        "dateCreated": {
            "type": "DateTime",
            "value": "2017-11-02T14:06:53.00Z",
            "metadata": {}
        },
        "dateModified": {
            "type": "DateTime",
            "value": "2018-11-16T19:30:04.00Z",
            "metadata": {}
        }
    },
    "message": "OK"
}
```

The `id` and `type` are mandatory attributes from NGSIv2,  where id are an unique identification and the type represents the Data Model. 
Some attributes are created by the system as mandatory, all this attributes are represented with  prefix  underscore `__`.
At the example above is possible to see some of then:

- `_label` , its a description for the entity.
- `_location` , the geographical location, as NGSIv2 only allow one attribute as geographical we decided to normalize it as an fixed attribute.
- `_network`, the array with branch IDs , represents which network branch this entity are in.


This endpoint also support NGSIv2 Parameters:

|  Parameter | Description | Type |
|---|---|---|
| attrs | Comma-separated list of attribute names whose data must be included in the response. The attributes are retrieved in the order specified by this parameter. See "Filtering out attributes and metadata" section for more detail. If this parameter is not included, the attributes are retrieved in arbitrary order, and all the attributes of the entity are included in the response. Example: temperature,humidity.|String|
| metadata | A list of metadata names to include in the response.  Example: accuracy. See "Filtering out attributes and metadata" section in [FIWARE-NGSI v2 Specification](https://orioncontextbroker.docs.apiary.io/#reference/entities)  for more detail.|String|
| options | Options dictionary Possible values:  keyValues , values | String|

This parameters can be sent by post body or Query String when GET request. 

By default, the call without any parameters will use `options=dateModified,dateCreated` but the value can be modified when using any of NGSIv2 parameters:
For example, return only the datapoint `BoilerHeatMeter` in key-value format you can use `GET /api/v1/public/iot/entities/context/Enkplatz4?options=keyValues&attrs=BoilerHeatMeter`,

The return will be: 

```json
{
    "ret": {
        "id": "Enkplatz4",
        "type": "BuildingEnergyObserved",
        "BoilerHeatMeter": 2580
    },
    "message": "OK"
}
```