# Topics



## List All topics
curl -X GET \
  {{base_url}}/api/v1/public/webgis/layers \
  -H 'authorization: Bearer {{access_token}}' \
  -d '{
	"layers":["86", "90", "91", "94", "98", "107", "155"],
	"geometry":{"type":"Polygon","coordinates":[[[16.364994,48.213321],[16.385207,48.207716],[16.373019,48.201766],[16.364994,48.213321]]]}
}'


##