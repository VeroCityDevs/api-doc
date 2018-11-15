# GEO Layers

The Vero City Platform has a geospatial database, the Platform Admin can upload many sources of geospatial data such WMS, geoTIFF, ShapeFile, KML,and others. 
he aplication API provides a RESTful endpoint to access each geo layer agording of [GeoJSON Specification (RFC 7946)](https://tools.ietf.org/html/rfc7946)
>  GeoJSON is a geospatial data interchange format based on JavaScript
>     Object Notation (JSON).
 
## Geo Layer header structure

The geo layers has a header with some basic information: 

|  field | description   |
|---|---|
| idlayer  | Layer ID   |
|  descr | Short description  |
| idtopic  | Topic ID, if exists  |
| idsubtopic  |  Topic ID, if exist |
| source  | Data provider  |

## List All Layers
  
You can get all the public geo layer using the `GET /api/v1/public/webgis/layers/all`:

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
In particular this example will return only geo layers with type "Point", with limit of 200.


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
|total_geometries|Integer value with total of geometries in a layer|
|total_geometry_vertices|Integer with total of all geometries vertices.|

```bash
curl -X GET \
  {{base_url}}/api/v1/public/webgis/layers/{{layer_id}} \
  -H 'authorization: Bearer {{access_token}}' 
```


## Get geojson format from a geometry layer


## GeoQuery



### Polygon:

```sh
curl -X POST \
  {{base_url}}/api/v1/public/webgis/layers/geoQuery \
  -H 'authorization: Bearer {{access_token}}' \
  -H 'content-type: application/json' \
  -d '{
	"layers":["86", "90", "91", "94", "98", "107", "155"],
	"geometry":{"type":"Polygon","coordinates":[[[16.364994,48.213321],[16.385207,48.207716],[16.373019,48.201766],[16.364994,48.213321]]]}
}'
```


```json
{
	"layers":["86", "90", "91", "94", "98", "107", "155"],
	"geometry":{"type":"Polygon","coordinates":[[[16.364994,48.213321],[16.385207,48.207716],[16.373019,48.201766],[16.364994,48.213321]]]}
}
```


### Radio:
```json
{
	"layers":["86", "90", "91", "94", "98", "107", "155"],
	"geometry": { "type": "Point" , "coordinates": [ 16.38027, 48.17089 ] },
	"radius" : 500
}
```

```json
{
    "ret": {
        "layers": {
            "86": {
                "geometries": [
                    "5a6f37ac797baf2cd0580d22",
                    "5a6f37ac797baf2cd0580d03"
                ]
            },
            "90": {
                "geometries": [
                    "5a6f374b797baf2cbe0fb46f",
                ]
            },
            "91": {
                "geometries": [
                    "5a6f379d797baf2cce0fcb8b",
                    "5a6f379d797baf2cce0fb2f2",
                    "5a6f379d797baf2cce0fbb4e",
                    "5a6f379d797baf2cce0fb537"
                ]
            }
        },
        "querytime": 1.9166219711303711
    },
    "message": "OK"
}
```