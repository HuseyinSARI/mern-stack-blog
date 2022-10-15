const mongoose = require('mongoose');

// veri tabanı(mongodb) işlemlerini kolaylaştırmak için mongoose kullandık
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        uniquq: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})



module.exports = mongoose.model('User',UserSchema);