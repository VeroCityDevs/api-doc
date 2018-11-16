# Entities
On the vero city platform entities and their context state can be accessed with the RESTful API. This section will present what can be accessed trough the Entities endpoint.

## Characteristics of a Entity
An entity represents an actual element of a certain type (Data Model). To represent a real "thing" entities have two types of data: Description that identifies and details the entity and a "state", stored on the orion context, that is composed of the current data of the entitiy datapoints. The data that makes up the entity state is defined primarily by its Data Model, wich every entity must possess, but also can vary in both ways, having extra or fewer datapoints from what is defined by the data model schema.

## Accessing Entities Description Data (Headers)
To access the entities description data a GET request must be sent to `{{base_url}}/api/v1/public/Iot/Entities/`, for a list of entities, and to `{{base_url}}/api/v1/public/Iot/Entities/{{entity_id}}` to get data from a specific entity. The description data is composed of:

|  Parameter | Description | Type |
|---|---|---|
| id | Unique identifier of the entity. It must bem unique in all of the context independently of the entity data model. | string |
| descr | A optional user-friendly name for the entity. | string |
| label | A prefrerrably small name or identifier of the entity that is normally used on the Vero City Platform UIs. | string |
| obs | Any extra information about the entity | string |
| __public | A flag that indicates if this entity is public or not | boolean |
| class_name | The name of the data model of the entity | string |

The request format can be seen bellow:
