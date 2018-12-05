# Network
On Vero City Platform a network is an element of the system that can be used to group entities. Networks can be subdivided in "Branches" to provide further grouping capabilities.

## Anatomy of a Network
Networks are quite simple, being composed of id, description and a public indication. A network can possess from 1 to *n* branches, one of them being the **Master** branch, which is mandatory and every network possesses. When an entitiy is linked to a network, actually it is linked to the master branch.


## The Network Headers Endpoint
The following table presents a description of the data returned by the network endpoint.

|  field | description   | Type |
|---|---|---|
| id | The unique identification of the network. | int |
| descr | A user friendly name or description of the network | string |
| public | A flag to indicate if the network is public or not | boolean |

To get a list of networks, a GET request must be sent to `{{base_url}}/api/v1/public/Iot/Networks/`. If you wish to get data from a single network, add the id at the end of the url as follows: `{{base_url}}/api/v1/public/Iot/Networks/{{network_id}}`.

```bash
curl --request GET \
  --url '{{base_url}}/api/v1/public/Iot/Networks/' \
  --header 'Authorization: Bearer {{access_token}}'
```

## Listing the Entities of a Network
This endpoint lists all entities of a network regardless of which branches they are linked to. The following table shows the data available for each linked device and it is the request syntax.

|  field | description   | Type |
|---|---|---|
| device_id | The unique identification of the entitiy. | string |
| idbranch | The id of the network branch which the entitiy is linked to | int |
| class_name | The name of the entitiy class | string |
| branch_descr | The name of the branch which the entitiy is linked to | string |
| network_descr | The description of the network | string |

```bash
curl --request GET \
  --url '{{base_url}}/api/v1/public/Iot/Networks/devices/{{network_id}}' \
  --header 'Authorization: Bearer {{access_token}}'

## Listing the Branches of a Network
To access the brances list of a network, simply use a GET request to the following url, informing the network id, `{{base_url}}/api/v1/public/Iot/Networks/branches/{{network_id}}`. The return is an array of objects with the following data:

|  field | description   | Type |
|---|---|---|
| id | The unique identification of the branch. | int |
| descr | A user friendly name of the branch | string |
| idnetwork | The id of the network that the branch belongs to | string |
| public | A flag to indicate if the branch is public or not | boolean |

``````bash
curl --request GET \
  --url '{{base_url}}/api/v1/public/Iot/Networks/branches/{{network_id}}' \
  --header 'Authorization: Bearer {{access_token}}'
```
