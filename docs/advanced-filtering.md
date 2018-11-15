# Advanced Filtering

Basically the methots that list `all` datasets can be filtered using filter attributes.


## Filter Attributes

|  Attribute | Type    |Description |
|---|---|---|
| q  | Array  | Array of Structured query objects|
| limit  | Integer   | Limit the number of records returned based on a limit value  |
| order  | String  |field name to be used as ordering attribute. e.g. `totalitem`. By standard the ascending sort will be used, you can use the `DESC` to descending  (Z to A, 9 to 0) sorting , for dates and times, ascending means that earlier values precede later ones e.g. 1/1/2000 will sort ahead of 1/1/2001.  |

#### Sample of filter attributes:

```json
{
  "q": [
    {"field":"foo","cond": "!=","value":"boo"}
  ],
  "limit": 50,
  "order": "count ASC"
}
```


## Structured query object

The Structured query object is an abstraction of the Structured Query Language, SQL. Its covers almost all basic operations possible in an where.


|  Attribute | Type    |Description |Possible values|Required|
|---|---|---|---|---|
|field|String|The name of valid attribute|Dataset attribute names| Y |
|value|Mixed|The expected value|Any possible value| Y |
|cond|String|Based on SQL conditions accept many all basic  conditionals symbols|=, <>, <, >,BETWEEN*,IN*,LIKE*, default: =|N|
|type|String|Sometimes is necessary to force a cast in a value due json conversion (ex numeric values)| string,bool,int,float. Default: String|N|
|op|String|When two or more conditions are used is necessary to use operator to separate objects|`OR` or `AND`|N|
|right|Integer|Represent a number of right parenthesis `(` before the condition|Integer values |N|
|left|Integer|Represent a number of left parenthesis `)` after the condition|Integer values |N|

* These are special conditions and the `value` attribute should respect these spects:

- BETWEEN : The `value` attribute should be an `Array` with two positions.
- IN  and NOT IN : The `value` attribute should be an `Array` with 1 or N values.
- LIKE : The LIKE condition is used to search for a specified pattern in a value. By default `%` will be add around of value.

#### Sample
```json
{
  "q": [
    {"field":"field0","value":0, "op": "and"},
    {"field":"field1","cond": "<>","value":"SOMETHING ELSE", "op": "and"},
    {"field":"field2","cond": ">","value":1, "op": "or","right":1},
    {"field":"field2","cond": "<","value":100,"left":1}
  ]
}
```
The product of this object is something like this expression:

> field0 = 0 AND field1 <> "SOMETHING ELSE" AND (field2 > 1 OR field2 < 100)

The system will filter some special characters and binary data, also is not possible to INJECT SQL structures like insert, update and drops.
