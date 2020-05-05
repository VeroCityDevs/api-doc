# Access Token

We4city Platform API implements a RESTFul API based into Oauth 2.0 Standard. In thinks guide, we will use the Client Credential Flow.

## Implementing the Client Credentials Flow

The Client Credentials flow is recommended for using in machine-to-machine authentication.
Your application will need to securely store its Client ID and Secret and pass those to API in exchange for an access token. 
At a high-level, the flow only has two steps:

- Your application passes its client credentials to your API authorization server.
- If the credentials are accurate, API responds with an access token.


## Using the Client Credentials Flow
Your Client Application will need to have its client ID and secret stored in a secure manner. 

To request API for tokens, perform a POST operation to the endpoint `{{base_url}}/api/v1/access_token` with a payload in the following format:

```bash
curl -X POST \
  {{base_url}}/api/v1/access_token \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d 'client_id={{client_id}}&client_secret={{client_secret}}&grant_type=client_credentials'

```

Note the parameters that are being passed:

- `grant_type` the value aways is `client_credentials`, indicating that we are using the Client Credentials grant type.
- `client_id` Your application Client ID. 
- `client_secret` Your application Client Secret.



If the credentials are valid the application will receive back an access token:

```json
{
    "access_token": "ZSX0M7Yj0zele0oSV4KajFyl8vFdJ6B1oETMsmao",
    "token_type": "Bearer",
    "expires_in": 36000
}
```


The access token will be linked to all public scopes.
