# Network
On the Vero City Platform a network is a element of the system that can be used to group entities. Networks can be subdivided in "Branches" to provide further grouping capabilities.

## Anatomy of a Network
Networks are quite simple, being composed of id, description and a public indication. A network can posses from 1 to *n* branches, one of them being the **Master** branch, wich is mandatory and every network possess. When a entitiy is linked to a network, actually it's beeing linked to the master branch.


## The Network Headers Endpoint
The following table presents a description of the data returned by the network endpoint.

|  field | description   | Type |
|---|---|---|
| id | The unique identification of the network. | int |
| descr | A user friendly name or description of the network | string |
| public | A flag to indicate if the network is public or not | boolean |

To get a list of networks a GET request must be sento to `{{base_url}}/public/Iot/Networks/`. If willing to get data from a single network, add the id at the end of the url as follows: `{{base_url}}/public/Iot/Networks/{{network_id}}`.

```bash
curl --request GET \
  --url '{{base_url}}/public/Iot/Networks/' \
  --header 'Authorization: Bearer {{access_token}}'
```

## Listing the Entities of a Network
This endpoint lists all entities of a network regardless of with wich branches they are linked. The following table shows the data available for each linked device and following it is the request syntax.

|  field | description   | Type |
|---|---|---|
| device_id | The unique identification of the entitiy. | string |
| idbranch | The id of the network branch in wich the entitiy is linked | int |
| class_name | The name of the entitiy class | string |
| branch_descr | The name of the branch in wich the entitiy is linked | string |
| network_descr | The description of the network | string |

```bash
curl --request GET \
  --url '{{base_url}}/public/Iot/Networks/devices/{{network_id}}' \
  --header 'Authorization: Bearer {{access_token}}'
```

## Listing the Branches of a Network
To access the brances list of a network simply use a GET request to the following url, informing the network id, `{{base_url}}/public/Iot/Networks/branches/{{network_id}}`. The return is a array of objects with the following data:

|  field | description   | Type |
|---|---|---|
| id | The unique identification of the branch. | int |
| descr | A user friendly name of the branch | string |
| idnetwork | The id of the network that the branch belongs to. | string |
| public | A flag to indicate if the branch is public or not | boolean |

## The Network as a GeoJSON
The API allows to get a geoJSON generated from the position of the entities of a network branches. This endpoint receives an array of branches id and returns the geospatial data. If is necessary to generate a geoJSON of all entities in a network, simply use the master branch id.

Besides the geospatial data of the entities, this endpoint also give access to the context data for each entity. To use this endpoint, send a POST request to `{{base_url}}/public/Iot/Networks/geoJson`, informing the following data on the request body:

```json
{
	"branches": [{{branch1_id}}, {{branch2_id}}]
}
```

The request syntax can be seen bellow:

```bash
curl --request POST \
  --url '{{base_url}}/public/Iot/Networks/geoJson' \
  --header 'Authorization: Bearer {{access_token}}' \
  --header 'Content-Type: application/json' \
  --data '{
	"branches": [{{branch_id}}]
}'
```

The return of this endpoint is a geoJSON wich each feature has the geometry informations and the entity properties with the respective context value. An example can be seen bellow:

```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "id": "pt91286",
                "type": "Elogistik",
                "_UID": 11403,
                "_label": "PT-91286",
                "_network": [
                    219
                ],
                "_owner": 15,
                "dateObserved": "2017-11-14T00:00:00+00:00",
                "rangeOnDeparture": 70,
                "rangeOnReturn": 0,
                "remainingBatteryOnReturn": 0,
                "traveledDistance": 0,
                "vm9__mapmarkid": 1605,
                "dateCreated": "2018-11-06T14:36:46.00Z",
                "dateModified": "2018-11-06T14:40:50.00Z"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.39724,
                    48.206000000000003
                ]
            },
            "id": "Elogistik-pt91286"
        },
        {
            "type": "Feature",
            "properties": {
                "id": "pt91287",
                "type": "Elogistik",
                "_UID": 11404,
                "_label": "PT-91287",
                "_network": [
                    219
                ],
                "_owner": 15,
                "dateObserved": "2017-11-09T00:00:00+00:00",
                "rangeOnDeparture": 70,
                "rangeOnReturn": 25,
                "remainingBatteryOnReturn": 49,
                "traveledDistance": 23,
                "vm9__mapmarkid": 1605,
                "dateCreated": "2018-11-06T14:36:50.00Z",
                "dateModified": "2018-11-06T14:46:34.00Z"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.383600000000001,
                    48.202480000000001
                ]
            },
            "id": "Elogistik-pt91287"
        }
    ]
}
```
