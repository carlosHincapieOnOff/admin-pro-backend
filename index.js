// este archivo va ser el punto incial de la aplicación

require('dotenv').config(); // esto es necesario para poder leer las variables de entorno del archivo .env

// esta es la forma de hacer importaciones en Node.js
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');


// crear el servidor de express
const app = express();

// Configurar cors
app.use(cors()); // el use es conocido como un middleware, lo cual son funciones que se ejecutan antes de llamar a otras
// Lectura y parseo del body
app.use( express.json() );

dbConnection();

// RUTAS
// configuramos a donde se debe de redirigir cuando pidan una determinada ruta
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));


app.listen( process.env.PORT,  () =>  {
    console.log("servior corriendo en el puerto",  process.env.PORT);
});