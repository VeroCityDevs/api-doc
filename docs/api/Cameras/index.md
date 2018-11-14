# Live Cameras

The Vero City Platform can group real time cameras from different sources. The aplication API provides a RESTful endpoint to access real cameras data
and sources. 

## Data Acessible Trough this Endpoint
In the Vero City system a real time camera consists of a specialization of a broader concept called "Resources". Each type of resource has it own attributes and caracteristics, but all of them are classified under a category and subcategory structure. The real time cameras endpoint provides the following data for each camera:

- id(int): The unique identification attribute. When a camera is linked to other elements of the system, this value is used to create the relationship.
- cod (string): A unique code that fallows a predefined pattern. This is used to address each camera individually in a UI-Friendly way.
- descr (string): The name of the camera.
- info (string): Details or extra information about the camera. It can be empty.
- idcategoria (int): The id of the camera category. 
- idsubcategoria (int): The id of the subcategory. It is a optional field.
- iframe (boolean): Tells if the camera source url is meant to be visualized trough an iframe.
- streaming (boolean): Tells if the camera source url is a streaming service.
- url (string): The camera url from where the image comes from.

## The Request Syntax

```bash
curl --request GET \
  --url 'http://{{base_url}}/public/Cameras/Live/' \
  --header 'Authorization: Bearer {{access_token}}'

```
