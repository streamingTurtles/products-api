const express = require('express');
const routes = require('./controllers');


const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

// this will object hides the component schemas in the Swagger UI documentation
// & edit the app.use() method to include the swaggerOptions object as a second argument:
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
app.use(
  '/docs',
  //swaggerUi.serveFiles(swaggerDoc, {swaggerOptions}),
  swaggerUi.serveFiles(swaggerDoc),
  swaggerUi.setup(swaggerDoc)
);
// restart the Node.js server and navigate to http://localhost:3001/docs/ to see the Swagger UI documentation for your API.






app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
