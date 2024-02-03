const {response} = require('express');

const jwt = require('jsonwebtoken')

const validateJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    try{
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid; // de esta forma podemos poner parametros en el request que recibe el controlador, desde los middlewares
        next();
    } catch (err){
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }

    
}

module.exports = {
    validateJWT
}