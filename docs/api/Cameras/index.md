# Live Cameras

The Vero City Platform can group real time cameras from different sources. The aplication API provides a RESTful endpoint to access real cameras data
and sources. 

## Data Acessible Trough this Endpoint
In the Vero City system a real time camera consists of a specialization of a broader concept called "Resources". Each type of resource has it own attributes and caracteristics, but all of them are classified under a category and subcategory structure. The real time cameras endpoint provides the following data for each camera:

|  Parameter | Description | Type |
|---|---|---|
| id | The unique identification attribute. When a camera is linked to other elements of the system, this value is used to create the relationship. | int |
| cod | A unique code that fallows a predefined pattern. This is used to address each camera individually in a UI-Friendly way. | string |
| descr | The name of the camera. | string |
| info | Details or extra information about the camera. It can be empty. | string |
| idcategory | The id of the camera category. | int |
| isIframe | Tells if the camera source url is meant to be visualized trough an iframe. | boolean |
| isStreaming | Tells if the camera source url is a streaming service. | boolean |
| url | The camera url from where the image comes from. | string |

## The Request Syntax
Use the following call to get a list of public real time cameras of the platform: 

```bash
curl --request GET \
  --url 'http://{{base_url}}/api/v1/public/Cameras/Live/all' \
  --header 'Authorization: Bearer {{access_token}}'

```

```json
{
    "ret": {
        "cameras": [
            {
                "id": 51,
                "cod": "CAMERA",
                "descr": "TESTE CAMERA",
                "info": "CAMERATESTE",
                "idcategory": 7,
                "url": "https://localhost/ipcamera/jpegframetest.jpg",
                "isIframe": 1,
                "isStreaming": 0
            }
        ],
        "count": 1
    },
    "message": "OK"
}
```

### Applying Filter

Apart from providing the whole set of entities, this operation implements [filtering capabilities](https://vero-city-api-docs.readthedocs.io/en/latest/advanced-filtering/index.html) in order to adjust the list of retrieved entities to what you need.

In particular this example will return only cameras with streaming support:

```bash
curl -X POST \
  http://tdp.local/api/v1/public/Cameras/Live/all \
  -H 'Authorization: Bearer {{access_token}}'
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{"q":[{"field":"isStreaming","value":1}]}'
```

And may you filter results nothing:

```json
{
    "ret": {
        "cameras": [],
        "count": 0
    },
    "message": "OK"
}
```



## Get Camera information

You can get the public information to geo layer using the `GET /api/v1/public/Cameras/Live/{{camera_id}}`:



```bash
curl -X GET \
  {{base_url}}/api/v1/public/Cameras/Live/{{camera_id}} \
  -H 'authorization: Bearer {{access_token}}' 
```
