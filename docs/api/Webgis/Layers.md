# GEO Layers

Vero City Platform has a geospatial database and the Platform Admin can upload many sources of geospatial data such WMS, geoTIFF, ShapeFile, KML,and others. 
The aplication API provides a RESTful endpoint to access each geo layer according to [GeoJSON Specification (RFC 7946)](https://tools.ietf.org/html/rfc7946)
>  GeoJSON is a geospatial data interchange format based on JavaScript
>     Object Notation (JSON).
 
## Geo Layer header structure

Geo layers have a header with some basic information: 

|  field | description   |
|---|---|
| idlayer  | Layer ID   |
|  descr | Short description  |
| idtopic  | Topic ID, if exists  |
| idsubtopic  |  Topic ID, if exists |
| source  | Data provider  |

## List All Layers
  
You can get all the public geo layer using `GET /api/v1/public/webgis/layers/all`:

```bash
curl -X GET \
  {{base_url}}/api/v1/public/webgis/layers/all \
  -H 'authorization: Bearer {{access_token}}'
```

which response is: 

```json
{
    "ret": {
        "layers": [
            {
                "idlayer": 699,
                "descr": "ATKIS® DGM - Digitales Geländemodell",
                "geotype": null,
                "idtopic": 66,
                "idsubtopic": null
            },
            {...}
        ],
        "count": 100
    },
    "message": "OK"
}
```

### Applying Filter


Apart from providing the whole set of entities, this operation implements [filtering capabilities](https://vero-city-api-docs.readthedocs.io/en/latest/advanced-filtering/index.html) in order to adjust the list of retrieved entities to what you need. 
In particular, this example will return only geo layers with type "Point", with limit of 200.


```bash
curl -X POST \
  {{base_url}}/api/v1/public/webgis/layers/all \
  -H 'authorization: Bearer {{access_token}}' \
  -H 'content-type: application/json' \
  -d '{"q":[{"field":"geotype","value":"Point"	}],"limit": 200}'
```


## Get layer information

You can get the public information to geo layer using the `GET /api/v1/public/webgis/layers/{{idlayer}}`:

|  field | description   |
|---|---|
| info  | Additional information, if exists  |
|total_geometries| Integer value with total of geometries in a layer|
|total_geometry_vertices| Integer with total of all geometries vertices.|

```bash
curl -X GET \
  {{base_url}}/api/v1/public/webgis/layers/{{layer_id}} \
  -H 'authorization: Bearer {{access_token}}' 
```


## Get geojson format from a geometry layer
You can get the geoJSON with a layer using  `GET /api/v1/public/webgis/layers/geoJson/{{idlayer}}`:

````bash
curl -X GET \
  {{base_url}}/api/v1/public/webgis/layers/geoJson/{{layer_id}} \
  -H 'authorization: Bearer {{access_token}}' 

````

### Geometry filtering: 

It is possible to filter which geometries will be loaded in the `FeatureCollection` sending an array with geometries ID:
```bash
curl -X POST \
  {{base_url}}/api/v1/public/webgis/layers/geoJson/{{layer_id}} \
    -H 'authorization: Bearer {{access_token}}' \
  -H 'content-type: application/json' \
  -d '{
	"geometries": [
                    "5a6f374b797baf2cbe0fa7bb"
	]
}'



As all other responses from the API, the geoJSON will be in of `ret`:


```json
{
    "ret": {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "id": "5a6f374b797baf2cbe0fa7bb",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        16.346224179716,
                        48.192431650502002
                    ]
                },
                "properties": {
                    "ANZAHL": 6,
                    "BEZIRK": 6,
                    "ADRESSE": "Stumpergasse 14",
                    "ART_KAT": 0,
                    "SE_SDO_ROW": 3239795,
                    "__style": {
                        "fillColor": null,
                        "color": null,
                        "mapmarkid": null,
                        "weight": 3
                    },
                    "__id": "5a6f374b797baf2cbe0fa7bb",
                    "__descr": null,
                    "__info": "3239795 6 Stumpergasse 14 6 0"
                }
            }
        ]
    },
    "message": "OK"
}
```


## Geo-located Queries

You can filter by geographical location using `POST /api/v1/public/webgis/layers/geoQuery`

The searching parameters are:

|  field |type| description   |
|---|---|---|
|layers|Array| A list of layers. You must include at least one layer id in order to filter|
|geometry|geoJSON geometry object| Supported geometry types: Polygon and Point|
|radius|Integer| Representation in meters (i.e.: 1000 = 1km). Max value allowed 5000|

The API allows the following possibilities:

### Filter layers geometries inside a Polygon:

```sh
curl -X POST \
  {{base_url}}/api/v1/public/webgis/layers/geoQuery \
  -H 'authorization: Bearer {{access_token}}' \
  -H 'content-type: application/json' \
  -d '{
	"layers":["86", "90", "91", "94", "98", "107", "155"],
	"geometry":{"type":"Polygon","coordinates":[[[16.403523,48.180847],[16.401738,48.179291],[16.400631,48.17798],[16.399635,48.173355],[16.403275,48.170453],[16.405746,48.168873],[16.407733,48.1677],[16.408695,48.167345],[16.410223,48.167082],[16.412059,48.16707],[16.41357,48.167288],[16.41484,48.16762],[16.416059,48.168192],[16.417415,48.168879],[16.41805,48.169406],[16.418977,48.169955],[16.420059,48.170608],[16.419883,48.1709],[16.416244,48.174426],[16.411561,48.178807],[16.40703,48.182833],[16.403523,48.180847]]]}
}'
```
 
### Filter layers geometries given by point and radius:
```json
{
	"layers":["86", "90", "91", "94", "98", "107", "155"],
	"geometry": { "type": "Point" , "coordinates": [ 16.38027, 48.17089 ] },
	"radius" : 500
}
```

> Hint: Use Topic and Subtopi API to get LayersID by an specific subject.


### Result set:

The query result includes only the geometries grouped by Layer ID located in that area, i.e.:



```json
{
    "ret": {
        "layers": [
          {
                        "idlayer": 94,
                        "geometries": [
                            "5a6f3733797baf2cba0fa855",
                            "5a6f3733797baf2cba0fa985",
                            "5a6f3733797baf2cba0fa876"
                        ]
                    },
                    {
                        "idlayer": 107,
                        "geometries": [
                            "5a6f38cf797baf2d023b20ba",
                            "5a6f38cf797baf2d023b20bb",
                            "5a6f38cf797baf2d023b20b2"
                        ]
                    }
        ],
        "querytime": 1.9166219711303711
    },
    "message": "OK"
}
```

> Hint: This result can be used to get the geoJSON using the geometry filtering.

![alt text](/latest/api/Webgis/geoquery.png "Platform sample")
