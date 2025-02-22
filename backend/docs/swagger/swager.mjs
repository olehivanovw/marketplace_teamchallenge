// swager.mjs


import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fullPath = resolve(__dirname, '../../src/components/routes/*.mjs');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Marketplace Api',
      version: '1.0.0',
      description: 'Simple Marketplace Api',
      contact: {
        name: 'Yaroslav',
        email: 'kamilka13me@gmal.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001/api/',
        description: 'Main server Api'
      }
    ],
  },
  apis: [`${fullPath}`],
};

// console.log(fullPath);

const specs = swaggerJSDoc(options);


function swaggerDocs(app, port) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

  // Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
};



export default swaggerDocs;
