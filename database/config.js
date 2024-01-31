const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.BD_CNN);
        console.log("DB Online");
    } catch (err){
        console.log(err);
        throw new Error("Error al iniciar la base de datos, ver Logs");
    }
}

module.exports = {
    dbConnection
}