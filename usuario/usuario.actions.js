const Usuario = require("./usuario.model")
const bcrypt = require("bcrypt");

async function getUsuarioMongo(filtros) {
    filtros.isActive = true;
    const usuariosFiltrados = await Usuario.find(filtros);
    
    return usuariosFiltrados;
}

async function createUsuarioMongo(datos) {
    const salt = await bcrypt.genSalt(10);
    datos.password = await bcrypt.hash(datos.password, salt);
    const usuarioCreado = await Usuario.create(datos);
    return usuarioCreado;
}

async function findUsuarioByCorreo(correo) {
    const usuario = await Usuario.findOne({ correo, isActive: true });
    return usuario;
}

module.exports = {
    createUsuarioMongo,
    getUsuarioMongo,
    findUsuarioByCorreo
};