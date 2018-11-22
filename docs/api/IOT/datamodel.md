# Data Model

Data Models allow the applications to know the expected data structure before querying the context, even if some attributes are not present.
In the beginning, we called it "Device Class", and old docs may contain reference like this name, but will be refactored in the future as "data model".
Used as templates for iot entities, Data Models can be accessed through the platform API. This section will provide details surrounding the access of 
data models data and datapoints. 

These Data Models can be used to implement [FIWARE Data Models](https://www.fiware.org/developers/data-models/), to know more, access the documentation page: [https://fiware-datamodels.readthedocs.io/en/latest](https://fiware-datamodels.readthedocs.io/en/latest)

>These data models have been harmonized to enable data portability for different applications including, but not limited, to Smart Cities. They are intended to be used together with FIWARE NGSI version 2. If you want to contribute and create additional data models, please, have a look at our repository of data models and the data model development guidelines.



## The Data Model Role 
On the Vero City Platform every entity is related to a Data Model. Besides acting as a `type`, models describes the datapoints minimum schema that its entities  possesses, working as a interface definition much like as seen in Object Oriented Programming. This way, through the entity data model is possible to know what datapoints are available to access.

## Data Model Header Endpoint
The data model header endpoint provides access to the following data:

|  Parameter | Description | Type |
|---|---|---|
| name | The data model name and also a unique identifier. The name is used to create the relationship between entities and the data model. | string |
| descr | A user friendly name for the data model. | string |
| info | Extra information and details about the data model. | string |
| strict | Strict data models forbid the entities to have attributes that are not declared on the data model schema. | boolean |
| published | Tells if the data model is ready to be used as a template for creating entities. | boolean |

To access data models, make a GET request to `{{base_url}}/api/v1/public/Iot/Datamodel/` informing the access token as following:

```bash
curl --request GET \
  --url '{{base_url}}/public/Iot/Datamodel/all' \
  --header 'Authorization: Bearer {{access_token}}'

```

To get data of a specific data model, use the data model name at the end of the url as follows: `{{base_url}}/api/v1/public/Iot/Datamodel/{{data_model_name}}`.

## Data Model Datapoints Endpoint
This endpoint returns the datapoints of a given data model through its name. When an entity is created it can inherit the datapoint schema of its Data Model. Those datapoints of an entity are attributes that holds data on the context. For each datapoint of the data model this endpoint provides the following information:

|  Parameter | Description | Type |
|---|---|---|
| name | The name of the datapoint. The name property must be unique between datapoints of a data model. | string |
| descr | A user friendly name of the datapoint.| string |
| class_name | The name of the class that the datapoint belongs to.| string |
| uom_id | The id of a unity of measurement. | int |
| __required | Tells if the datapoint is mandatory to the entity that implements the data model. | boolean |

To list the datapoints of a data model, make a GET request to `{{base_url}}/api/v1/public/Iot/Datamodel/datapoints/{{data_model}}` where `data_model` is the name of the desired data model. The request has the following format:

```bash
curl --request GET \
  --url '{{base_url}}/public/Iot/Datamodel/datapoints/{{data_model_name}}' \
  --header 'Authorization: Bearer {{access_token}}'

```
