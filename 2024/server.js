const express = require('express');
const routes = require('./controllers');


const swaggerUi = require('swagger-ui-express');
//const swaggerDoc = require('./swagger.json');
const swaggerV1 = require('./swagger-v1.json');
const swaggerV2 = require('./swagger-v2.json');

// KEEPING OUT  swaggerOptions  so that the component schemas 
// in the Swagger UI documentation are visible
// this will object hides the component schemas in the Swagger UI documentation
// & edit the app.use() method to include the swaggerOptions object as a second argument:
//
// const swaggerOptions = {
//   defaultModelsExpandDepth: -1
// };





const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(routes);

// to edit out the component schemas in the Swagger UI documentation
// edit the app.use() method to include the swaggerOptions object as a second argument:
// app.use(
//   '/docs',
//   // if we want to hide the component schemas in the Swagger UI documentation
//   // uncomment the below line
//   //swaggerUi.serveFiles(swaggerDoc, {swaggerOptions}),
//   swaggerUi.serveFiles(swaggerDoc),
//   swaggerUi.setup(swaggerDoc)
// );
// restart the Node.js server and navigate to http://localhost:3001/docs/ to see the Swagger UI documentation for your API.


app.use(
  '/docs/v1',
  swaggerUi.serveFiles(swaggerV1),
  swaggerUi.setup(swaggerV1)
);

app.use(
  '/docs/v2',
  swaggerUi.serveFiles(swaggerV2),
  swaggerUi.setup(swaggerV2)
);






app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
