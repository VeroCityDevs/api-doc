# Topics

Geo layers can be classified by Topic and Subtopic, the API allow listing topics, subtopics and geo layers by these characteristics. 

## Object structure

The geo layers has a header with some basic information: 

|  field | description   |
|---|---|
| idtopic  | Topic ID   |
| descr | Short description  |



## List All topics

You can get all the public topics using the `GET /api/v1/public/webgis/topics/all`:


curl -X GET \
  {{base_url}}/api/v1/public/webgis/topics/all \
  -H 'authorization: Bearer {{access_token}}'

which response is: 


```json
{
    "ret": {
        "topics": [
            {
                "idtopic": 51,
                "descr": "03 - Geography and planning"
            },
            {...}
        ],
        "count": 15
    },
    "message": "OK"
}
```

#### Filtering 

Apart from providing the whole set of entities, this operation implements [filtering capabilities](https://vero-city-api-docs.readthedocs.io/en/latest/advanced-filtering/index.html) in order to adjust the list of retrieved entities to what you need.

In particular this example will return topic ordering by description with limit of 3 topics.


```bash
curl -X POST \
   {{base_url}}/api/v1/public/webgis/topics/all \
  -H 'authorization: Bearer {{access_token}}' \
  -H 'content-type: application/json' \
  -d '{"limit": 3, "order": "descr"}'
```

Response:
```json
{
    "ret": {
        "topics": [
            {
                "idtopic": 49,
                "descr": "01 - Mobility and Transport"
            },
            {
                "idtopic": 50,
                "descr": "02 - Education"
            },
            {
                "idtopic": 51,
                "descr": "03 - Geography and planning"
            }
        ],
        "count": 3
    },
    "message": "OK"
}
```


## Get single topic information

You can get the public information to geo layer using the `GET /api/v1/public/webgis/topics/{{topic_id}}`:

|  field | description   |
|---|---|
| info  | Additional information, if exists  |
|total_geometries|Integer value with total of geometries in a layer|
|total_geometry_vertices|Integer with total of all geometries vertices.|

```bash
curl -X GET \
  {{base_url}}/api/v1/public/webgis/topics/{{topic_id}} \
  -H 'authorization: Bearer {{access_token}}' 
```


## Get all subtopics for a given topic


## Get all Layers for a given topic


