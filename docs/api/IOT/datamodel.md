# Data Model
Used as templates for iot entities, Data Models can be accessed trough the platform API. This section will provide details surrounding the access of 
datamodels data and datapoints. 

## The Data Model Role 
On the Vero City Platform every entity is related to a Data Model. Besides acting as a type, models describes the datapoints minimum schema that its entities  possesses, working as a interface definition much like as seen in Object Oriented Programming. This way, through the entity data model is possible to know what datapoints are available to access.

## Data Model Header Endpoint
The data model header endpoint provides access to the following data:

|  Parameter | Description | Type |
|---|---|---|
| name | The data model name and also a unique identifier. The name is used to create the relationship between entities and the data model. | string |
| descr | A user friendly name for the data model. | string |
| info | Extra information and details about the data model. | string |
| strict | Strict data models forbids the entities to have attributes that aren't declared on the data model schema. | boolean |
| published | Tells if the data model is ready to be used as a template for creating entities. | boolean |

To access data models make a GET request to `{{base_url}}/api/v1/public/Iot/Datamodel/` informing the access token as following:

```bash
curl --request GET \
  --url '{{base_url}}/public/Iot/Datamodel/' \
  --header 'Authorization: Bearer {{access_token}}'

```

To get data of a specific data model use the data model name at the end of the url as follows: `{{base_url}}/api/v1/public/Iot/Datamodel/{{data_model_name}}`.

## Data Model Datapoints Endpoint
This endpoint returns the datapoints of a given data model through it's name. Entities datapoints are attributes that holds some data on the context. For each datapoint of the data model this endpoint provides the following information:

|  Parameter | Description | Type |
|---|---|---|
| name | The name of the datapoint. The name property must be unique between datapoints of a data model. | string |
| descr |A user friendly name of the datapoint.| string |
| class_name | The name of the class that the datapoint belongs to.| string |
| uom_id | The id of a unity of measure. | int |
| __required | Tells if the datapoint is mandatory to the entity that implements the data model. | boolean |

To list the datapoints of a data model make a GET request to `{{base_url}}/api/v1/public/Iot/Datamodel/datapoints/{{data_model_name}}` where `data_model_name` is the name of the desired data model. The request has the following format:

```bash
curl --request GET \
  --url '{{base_url}}/public/Iot/Datamodel/datapoints/{{data_model_name}}' \
  --header 'Authorization: Bearer {{access_token}}'

```
