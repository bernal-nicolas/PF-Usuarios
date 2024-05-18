const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUsuarioMongo, getUsuarioMongo, findUsuarioByCorreo } = require("./usuario.actions");

async function readUsuarioConFiltros(query) {
    const resultadosBusqueda = await getUsuarioMongo(query);
    return resultadosBusqueda;
}

async function createUsuario(datos) {
    const usuarioCreado = await createUsuarioMongo(datos);
    return usuarioCreado;
}

async function loginUsuario(datos) {
    const { correo, password } = datos;
    const usuario = await findUsuarioByCorreo(correo);
    if (!usuario) {
        throw new Error("Correo o contraseña incorrectos");
    }
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
        throw new Error("Correo o contraseña incorrectos");
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { usuario, token };
}

module.exports = {
    readUsuarioConFiltros,
    createUsuario,
    loginUsuario
};