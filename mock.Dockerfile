# Creates a mock sever serving from the OpenAPI specs
FROM danielgtaylor/apisprout

ADD docs/openapi.yaml /data/openapi.yaml
