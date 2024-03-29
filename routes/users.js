/*
    Ruta: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT ,getUsers);

// en el segundo parametro enviamos middlewares
router.post(
    '/',
    [
        validateJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validateFields // aca por ultimo pasamos nuestro middleware personalizado para personalizar el mensaje que enviamos
    ],
    createUser
);

router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validateFields // aca por ultimo pasamos nuestro middleware personalizado para personalizar el mensaje que enviamos
    ],
    updateUser
);

router.delete('/:id', validateJWT, deleteUser);

module.exports = router;