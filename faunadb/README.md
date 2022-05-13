# FaunaDB

## Running FaunaDB

### Run with docker

Build image:
```
docker build -t sb-dev/faunadb:latest . -f faunadb/Dockerfile
```

Run:
```
docker run -d -p 8443:8443 -p 8084:8084 --name ymdrinksDb \
    sb-dev/faunadb:latest --config /etc/fauna.yml 
```

Endpoint: http://localhost:8443

### Remote

Endpoint: https://graphql.eu.fauna.com/graphql

## Queries

Delete collection items:
```
Map(
  Paginate(Documents(Collection("collection_name")), { size: 9999 }),
  Lambda(["ref"], Delete(Var("ref")))
)
```
