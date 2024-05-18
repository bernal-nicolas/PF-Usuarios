const mongoose = require("mongoose");

const schemaUsuario = new mongoose.Schema({
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true }
}, {
    versionKey: false,
    timestamps: true
});

const Usuario = mongoose.model('Usuario', schemaUsuario);

module.exports = Usuario;