const { throwCustomError } = require("../utils/functions");
const { createUsuarioMongo, getUsuarioMongo, updateUsuarioMongo, deleteUsuarioMongo } = require("./usuario.actions");

async function readUsuarioConFiltros(query) {
    const { correo, password } = query;

    const resultadosBusqueda = await getUsuarioMongo(query);

    return resultadosBusqueda;
}

async function createUsuario(datos) {
    const { correo, password } = datos;

    const usuarioCreado = await createUsuarioMongo(datos);

    return usuarioCreado;
}


function updateUsuario(datos) {
    const { _id, ...cambios } = datos;

    const usuarioActualizado = updateUsuarioMongo(_id, cambios);

    return usuarioActualizado;
}

function deleteUsuario(id) {

    const usuarioEliminado = deleteUsuarioMongo(id);

    return usuarioEliminado;
}

module.exports = {
    readUsuarioConFiltros,
    createUsuario,
    updateUsuario,
    deleteUsuario
}