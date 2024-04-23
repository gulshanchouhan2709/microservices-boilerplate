const express = require("express");
const path = require("path");
const redoc = require('redoc-express');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const expressJSDocSwagger = require("express-jsdoc-swagger");
const swaggerDocument = YAML.load('./uploads/documentation.yaml');
const app = express();

const ROUTE_PREFIX = "/v1/auth";

app.use('/uploads', express.static(__dirname + '/uploads'));

app.get(`${ROUTE_PREFIX}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get(
  `${ROUTE_PREFIX}/documentation`,
  redoc({
    title: 'Loyalty documentation - InfoBeans',
    nativeScrollbars: true,
    specUrl: 'http://localhost:5001/uploads/documentation.yaml',
    nonce: '', // <= it is optional,we can omit this key and value
    // we are now start supporting the redocOptions object
    // you can omit the options object if you don't need it
    // https://redocly.com/docs/api-reference-docs/configuration/functionality/
    redocOptions: {
      theme: {
        colors: {
          primary: {
            main: '#6EC5AB'
          }
        },
        typography: {
          fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
          fontSize: '15px',
          lineHeight: '1.5',
          code: {
            code: '#87E8C7',
            backgroundColor: '#4D4D4E'
          }
        },
        menu: {
          backgroundColor: '#ffffff'
        }
      }
    }
  })
);

app.listen(5001, () => console.log("Auth service started on port 5001"));
