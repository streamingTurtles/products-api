const express = require('express');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const swaggerOptions = {
  defaultModelsExpandDepth: -1
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(
  '/docs',
  // removing below option remove the list of schemas at the bottom of the http://localhost:3001/docs/#/
  // swaggerUi.serveFiles(swaggerDoc),
  //
  // adding this option will remove seeing all your schemas
  swaggerUi.serveFiles(swaggerDoc, { swaggerOptions }),
  swaggerUi.setup(swaggerDoc)
);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
