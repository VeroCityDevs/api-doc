# Topics

Geo layers can be classified by Topic and Subtopic, the API allow listing topics, subtopics and geo layers by these characteristics. 

## Object structure

The geo layers has a header with some basic information: 

|  field | description   |
|---|---|
| idsubtopics  | Subtopic ID   |
| idtopic  | Topic ID   |
| descr | Short description  |



## List All subtopics

You can get all the public subtopics using the `GET /api/v1/public/webgis/subtopics/all`:

```json
curl -X GET \
  {{base_url}}/api/v1/public/webgis/subtopics/all \
  -H 'authorization: Bearer {{access_token}}'

```


which response is: 


```json
{
    "ret": {
        "subtopics": [
          {
            "idsubtopics": 1,
            "idtopic": 49,
            "descr": "Public Transport"
        
          }, 
          {...}
        ],
        "count": 0
    },
    "message": "OK"
}
```

#### Filtering 

Apart from providing the whole set of entities, this operation implements [filtering capabilities](https://vero-city-api-docs.readthedocs.io/en/latest/advanced-filtering/index.html) in order to adjust the list of retrieved entities to what you need.

In particular this example will return topic ordering by description with limit of 3 topics.


```bash
curl -X POST \
   {{base_url}}/api/v1/public/webgis/subtopics/all \
  -H 'authorization: Bearer {{access_token}}' \
  -H 'content-type: application/json' \
  -d '{"limit": 3, "order": "descr"}'
```

Response:
```json
{
    "ret": {
        "subtopics": [
                  {
                    "idsubtopics": 2,
                    "idtopic": 49,
                    "descr": "Car sharing"
                
                  },
                  {
                    "idsubtopics": 1,
                    "idtopic": 49,
                    "descr": "Public Transport"
                  },
            {...}
        ],
        "count": 3
    },
    "message": "OK"
}
```


## Get single subtopics information

You can get the topic's public information using the `GET /api/v1/public/webgis/subtopics/{{subtopics_id}}`:

```bash
curl -X GET \
  {{base_url}}/api/v1/public/webgis/subtopics/{{subtopics_id}} \
  -H 'authorization: Bearer {{access_token}}' 
```

```json
{
    "ret": {
        "idsubtopic": 3,
        "idtopic": 61,
        "descr": "Streets"
    },
    "message": "OK"
}
```

## Get all Layers for a given topic



You can get geo layers classified by this topic using the `GET /api/v1/public/webgis/subtopics/layers/{{subtopics_id}}`:

```bash
curl -X GET \
  {{base_url}}/api/v1/public/webgis/subtopics/layers/{{subtopics_id}} \
  -H 'authorization: Bearer {{access_token}}' 
```

The result set is the same described on [DOCS » WEBGIS » GEO LAYERS » LIST ALL LAYERS](https://vero-city-api-docs.readthedocs.io/en/latest/api/Webgis/Layers/index.html#list-all-layers)

```json
{
    "ret": {
        "layers": [
            {
                "idlayer": 13,
                "descr": "Real Time Cameras",
                "geotype": "Point",
                "idtopic": 49,
                "idsubtopic": 1
            }
        ],
        "count": 1
    },
    "message": "OK"
}
```

Filtering is not allowed to this endpoint.
