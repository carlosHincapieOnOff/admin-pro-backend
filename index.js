// este archivo va ser el punto incial de la aplicación
require('dotenv').config();

// esta es la forma de hacer importaciones en Node.js
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');


// crear el servidor de express
const app = express();
dbConnection();

// Configurar cors
app.use(cors()); // el use es conocido como un middleware


// RUTAS
// req = lo que envia el cliente
// res = lo que le respondemos al cliente
app.get('/', (req, res) =>  {
    /*res.json({
        ok: true,
        msg: 'Hola Carlos'
    })*/
    // 
    res.status(400).json({
        ok: true,
        msg: 'Hola Carlos'
    })
});

app.listen( process.env.PORT,  () =>  {
    console.log("servior corriendo en el puerto",  process.env.PORT);
});