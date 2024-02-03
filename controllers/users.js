const {response} = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const User = require('../models/user');



const getUsers = async (req, res) =>  {

    //  
    const users = await User.find({}, 'name email role google');
    res.json({
        ok: true,
        users,
        uid: req.uid
    });
}

const createUser = async(req, res = response) =>  {
    
    const {email, password} = req.body;
    

    try {
        const existEmail = await User.findOne({email});
        if( existEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const user = new User(req.body);
        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save(); 
        console.log("user.id", user.id);

        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });
    } catch(error) {
        console.log("error createUsers", error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const updateUser = async(req, res = response) =>  {

    const uid = req.params.id;
    try {
        const userDB = await User.findById( uid );

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        
        const {password, google, email, ...fields} = req.body;
        if( userDB.email !==  email ){
            const existEmail = await User.findOne({ email });
            if(existEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe un usuario con ese email'
                });
            }
        }
        fields.email = email;
        // de esta forma si se actualiza en base de datos, pero se retorna el objeto del usuario como estaba
        //const userUpdated = await User.findByIdAndUpdate(uid, fields);

        // de esta forma si se actualiza en base de datos y retorna el objeto actualizado
        const userUpdated = await User.findByIdAndUpdate(uid, fields, {new: true});
        res.json({
            ok: true,
            userUpdated
        });
    } catch(error) {
        console.log("error updateUser", error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

const deleteUser = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const userDB = await User.findById( uid );

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: "Usuario eliminado"
        });
    } catch(err){
        console.log("error deleteUser", error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}