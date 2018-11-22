# Network Branchs
On the Vero City Platform every network is composed of one master branch and *n* other branches. When a entity is added to a network, actually it is linked to one of it branches. The API provide a few endpoints regarding network branches, wich are described on this section of the documentation.

## Understanding the Master Branch
The **master branch** is the main branch of every network and is used to represent the network as a whole. This means that every other branch of a network is "under" the master one. When a entity is linked to any branch of a network it is also connected to the master branch. This is also true when a entity is linked only to the network, with no branch specified. In those cases, the entity is simply being linked to the master branch of the network.

## Getting a List of a Network Branches
To access all branches of a network a GET request must be sent to `{{base_url}}/public/Iot/Networkbranches/all/{{network_id}}`, informing the network id. The result format and the request syntax can be seen ahead:

```json
[
    {
        "id": 213,
        "descr": "MASTER",
        "idnetwork": 82,
        "master": 1
    }
]
```

```bash
curl --request GET \
  --url '{{base_url}}/public/Iot/Networkbranches/all/{{network_id}}' \
  --header 'Authorization: Bearer {{access_token}}'
```

## Getting Entities Linked to a Branch
This endpoint allows to list devices that are linked to the given network branch. To do this, send a GET request to `{{base_url}}/public/Iot/Networkbranches/devices/{{branch_id}}`. The result and the request syntax are shown bellow:

```json
[
    {
        "device_id": "ELOGISTIK_1",
        "idbranch": 213,
        "data_model": "EletricalVehicle",
        "branch_descr": "MASTER",
        "network_descr": "eLogistik (Simulation)"
    },
    {
        "device_id": "ELOGISTIK_2",
        "idbranch": 213,
        "data_model": "EletricalVehicle",
        "branch_descr": "MASTER",
        "network_descr": "eLogistik (Simulation)"
    }
]
```

``````bash
curl --request GET \
  --url '{{base_url}}/public/Iot/Networkbranches/devices/{{branch_id}}' \
  --header 'Authorization: Bearer {{access_token}}'
```

## Network Branches as GeoJSON
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
````

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
