const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();


const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Proyecto Artesanías",
      version: "1.0.0"
    },
    servers: [
      {
        url: "https://apirestartesanias.onrender.com"
      }
    ],
  },
  apis: [`${path.join(__dirname, "./controllers/*.js")}`] // Asegúrate de que esta ruta sea correcta
}

const app = express();
const port = 3000; // El puerto en el que se ejecutará el servidor

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// app.use(cors({
//   origin: [
//     "http://127.0.0.1:5500", // Permite solo el frontend en local
//     "https://apirestartesanias.onrender.com" // Permite el frontend desplegado
//   ]
// }));
app.use(cors({
  origin: "*" // Permite cualquier origen (ideal para desarrollo)
}));

mongoose.connect('mongodb+srv://davidgerdiaz777:qYFGV1gnC4APnzBa@cluster0.zk9cc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log('mongodb connection up'))
  .catch(error => console.log(`unable to connect to mongodb: ${error.message}`));

  console.log(process.env.SERVER_SECRET_KEY)
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});


app.use(
  '/api', 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerJsDoc(swaggerSpec))
  );

 

app.use( require('./controllers/routes') );