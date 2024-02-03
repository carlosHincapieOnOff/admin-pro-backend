const {response} = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const User = require('../models/user');

const login = async(req, res = response) => {
    
    const { email, password } = req.body;

    try {

        const userDB =  await User.findOne({email});

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecto'
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecto'
            });
        }

        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token
        })

    } catch(err){
        console.log("error login", error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

module.exports = {
    login
}