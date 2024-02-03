const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    img : {
        type: String,
    },
    role : {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google : {
        type: Boolean,
        default: false
    },
});

// si pasa por una conversión a json, hace la siguiente transformación con el objeto devuelto
UserSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema);