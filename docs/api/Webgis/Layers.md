# GEO Layers

TODO: Write about layers, geojson, wms etc..



## List All Layers

## Get layer information

## Get geojson format from a geometry layer

### Polygon:

```sh
curl -X POST \
  http://tdp.local/api/v1/public/webgis/layers/geoQuery \
  -H 'authorization: Bearer vVFScGYyKA20iRYp0zYFIrcKZFX0IjuJWPsbkl60' \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 82d96196-c98e-77a1-325d-9ccb629f1cad' \
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

## GeoQuery

