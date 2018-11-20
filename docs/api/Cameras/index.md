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
| idcategoria | The id of the camera category. | int |
| idsubcategoria | The id of the subcategory. It is a optional field. | int |
| iframe | Tells if the camera source url is meant to be visualized trough an iframe. | boolean |
| streaming | Tells if the camera source url is a streaming service. | boolean |
| url | The camera url from where the image comes from. | string |

## The Request Syntax
Use the following call to get a list of public real time cameras of the platform. To get access of a single camera simply add its ID to the end of the request url as follows: `http://{{base_url}}/public/Cameras/Live/{{camera_id}}`.

```bash
curl --request GET \
  --url 'http://{{base_url}}/public/Cameras/Live/' \
  --header 'Authorization: Bearer {{access_token}}'

```
