# Microservice API Gateway Boilerplate

This repo contains boilerplate code for starting with Express Gateway to use for microservices. This repo contains three applications:

- `app-gateway` - this is the gateway that proxies APIs to designated servers.
- `auth-service` - blank express microservice with `express-jsdoc-swagger` setup and a simple status endpoint.
- `product-servicer` - another blank microservice with `express-jsdoc-swagger`  setup and simple status endpoint.

## Running gateway

To run all the microservice through the gateway, here are the step you will need to take care of.

- start to auth service with `cd auth-service && npm run dev`
- start product service with `cd auth-service && npm run dev`
- start API gateway with `cd app-gateway && npm start`

This will start the application on <a href="http://localhost:8080">http://localhost:8080</a>

To access endpoints of `auth-service` you will need to go through, `/v1/auth`.
The API doc of `auth-service` can be found at `/v1/auth/api-docs`

To access endpoints of `product-service` you will need to go through, `/v1/auth`.
The API doc of `auth-service` can be found at `/v1/product/api-docs`

## Add a new microservice

If you want to add any new microservice then few things you need to do.

Add a new entry to `apiEndpoints` section of `app-gateway/config/gateway.config.yml` something like this

```yml
service_name:
  host: localhost # host name, usually it will stay localhost
  paths:
    - "/v1/service" # all the paths, this route needs to be prefixed in the service route.
    - "/v1/service/*"
```

add a new entry to in `serviceEndpoints` section of `app-gateway/config/gateway.config.yml` something like this

```yml
service_name:
  url: "http://localhost:${port}" # endpoint of your service, usually you only need to change the name of service and port
```

and in the end add a new entry to `pipelines` section.

```yml
service_name:
  apiEndpoints:
    - api_endpoint # name of your service defined in apiEndpoints
  policies:
    - proxy:
        - action:
            serviceEndpoint: service_endpoint # name of you newly added service in serviceEndpoints
            changeOrigin: true
```

And you are all good to run new service.
