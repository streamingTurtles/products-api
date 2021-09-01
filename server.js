const express = require('express');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

const swaggerUi = require('swagger-ui-express');
// const swaggerDoc = require('./swagger.json');
const swaggerV1 = require('./swagger-v1.json');
const swaggerV2 = require('./swagger-v2.json');



const swaggerOptions = {
  defaultModelsExpandDepth: -1
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(
  '/docs/v1',
  // '/docs',
  // removing below option remove the list of schemas at the bottom of the http://localhost:3001/docs/#/
  // swaggerUi.serveFiles(swaggerDoc),
  // adding this option will remove seeing all your schemas
  // swaggerUi.serveFiles(swaggerDoc, { swaggerOptions }),
  // swaggerUi.setup(swaggerDoc)
  swaggerUi.serveFiles(swaggerV1, { swaggerOptions }),
  swaggerUi.setup(swaggerV1)  
);


app.use(
  '/docs/v2',
  swaggerUi.serveFiles(swaggerV2, { swaggerOptions }),
  swaggerUi.setup(swaggerV2)
);





app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
