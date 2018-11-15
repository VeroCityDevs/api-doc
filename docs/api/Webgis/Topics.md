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

You can get the topic's public information using the `GET /api/v1/public/webgis/topics/{{topic_id}}`:

```bash
curl -X GET \
  {{base_url}}/api/v1/public/webgis/topics/{{topic_id}} \
  -H 'authorization: Bearer {{access_token}}' 
```


## Get all subtopics for a given topic
Tho list all subtopics from a given topic you should use the `GET /api/v1/public/webgis/topics/subtopics/{{topic_id}}`:

```bash
curl -X GET \
  {{base_url}}/api/v1/public/webgis/topics/subtopics/{{topic_id}} \
  -H 'authorization: Bearer {{access_token}}' 
```




## Get all Layers for a given topic



You can get geo layers classified by this topic using the `GET /api/v1/public/webgis/topics/layers{{topic_id}}`:

```bash
curl -X GET \
  {{base_url}}/api/v1/public/webgis/topics/layers/{{topic_id}} \
  -H 'authorization: Bearer {{access_token}}' 
```

Filtering is not allowed to this endpoint.

The result set is the same described on [DOCS » WEBGIS » GEO LAYERS » LIST ALL LAYERS](https://vero-city-api-docs.readthedocs.io/en/latest/api/Webgis/Layers/index.html#list-all-layers)
```json
{
    "ret": {
        "layers": [...],
        "count": 46
    },
    "message": "OK"
}
```
