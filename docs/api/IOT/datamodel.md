# Data Model
Used as templates for iot entities, Data Models can be accessed trough the platform API. This section will provide details surrounding the access of 
datamodels data and datapoints. 

## The Data Model Role 
On the Vero City Platform every entity is related to a Data Model. Besides acting as a type, models describes the datapoints minimum schema that its entities  possesses, working as a interface definition much like as seen in Object Oriented Programming. This way, through the entity data model is possible to know what datapoints are available to access.

## Data Model Header Endpoint
The data model header endpoint provides access to the following data:

- name (string): The data model name and also a unique identifier. The name is used to create the relationship between entities and the data model.
- descr (string): A user friendly name for the data model.
- info (string): Extra information and details about the data model.
- strict (boolean): Strict data models forbids the entities to have attributes that aren't declared on the data model schema.
- published (boolean): Tells if the data model is ready to be used as a template for creating entities.

To access data models make a GET request to `{{base_url}}/api/v1/public/Iot/Datamodel/` informing the access token as following:

```bash
curl --request GET \
  --url '{{base_url}}/public/Iot/Datamodel/' \
  --header 'Authorization: Bearer {{access_token}}'

```

## Data Model Datapoints Endpoint
This endpoint returns the datapoints of a given data model through it's name. Entities datapoints are attributes that holds some data on the context. For each datapoint of the data model this endpoint provides the following information:

- name: The name of the datapoint. The name property must be unique between datapoints of a data model.
- descr: A user friendly name of the datapoint.
- class_name: The name of the class that the datapoint belongs to.
- uom_id: The id of a unity of measure.
- __required: Tells if the datapoint is mandatory to the entity that implements the data model.

To list the datapoints of a data model make a GET request to `{{base_url}}/api/v1/public/Iot/Datamodel/datapoints/{{data_model_name}}` where `data_model_name` is the name of the desired data model. The request has the following format:

```bash
curl --request GET \
  --url '{{base_url}}/public/Iot/Datamodel/datapoints/{{data_model_name}}' \
  --header 'Authorization: Bearer {{access_token}}'

```
