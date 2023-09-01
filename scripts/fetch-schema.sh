set -e
set -o allexport
source ./.env.local
set +o allexport

curl -X POST \
  -H "Content-Type: application/json" \
  -H "apikey: $API_KEY" \
  --data '{"query":"{ __schema { types { name kind description fields { name description } } } }"}' \
  "$GRAPHQL_API_URL" > schema.graphql
