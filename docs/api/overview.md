# Overview


All of the Vero City Platform APIs are organized around REST - if you've interacted with a RESTful API already, many of the concepts will be familiar to you. 
All API calls to Vero City Platform should be made to the base domain. The base domain  changes for each project and it will be represented as  ``{{base_url}}`` in the documentation.

## API Request
We use many standard HTTP features, like HTTP verbs, which can be understood by many HTTP clients. JSON will be returned in all responses from the API, including errors.   
The APIs are designed to have predictable, straightforward URLs and to use HTTP response codes to indicate API errors.

### Headers
Every request should be made by HTTP request, only HTTP 1.1 is supported in this version.
We have two required headers, the `Authorization` and the `Content-Type` and its value as `application/json` when `POST` verb:

```txt
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

> **Note:** The access token request is an exception of this rule, the `Content-Type` should be `application/x-www-form-urlencoded` and there is no `Authorization` header.
 


### Post Body
The post body should be a valid JSON string:

```json
{"key":"value"}
```



## API Response

```json
{
    "ret": {...},
    "message": "OK"
}
```


## API Usage Guidelines
 
The Vero City Platform public endpoints are powered by the same underlying technology that powers the  Vero City Platform core application.As a result,  Vero City Platform engineering closely monitors usage of the public APIs to ensure a quality experience for users of the  Vero City Platform.

Below, you'll find the limits by which a single integration (as identified by an client_id) can consume the  Vero City Platform public APIs. 
If you have any questions, please post them in the https://github.com/VeroCityDevs/api-doc/issues

1. Clients exceeding either of those limits will receive error responses with a 429 response code. 
1. Requests resulting in an error response may not exceed 5% of your total requests.
1. Integrations should use Vero City Platform's OAuth protocol.
1. Integrators must store time-to-live (TTL) data for OAuth access tokens, which will be returned to you in an `expires_in` parameter whenever you generate an access token. Unauthorized (401) requests are not a valid indicator that a new access token must be retrieved.
1. We reserve the right to change or deprecate the APIs over time - we will website note and provide social media notification in those cases.


### API Limits
Vero City Platform has the following limits in place for API requests:  
* 50 requests per second.  
* 100,000 requests per day. 
This daily limit resets at midnight based on the time zone setting of the client ID.   
 



