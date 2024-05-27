const express = require('express');
const router = express.Router();
const { readUsuarioConFiltros, createUsuario, loginUsuario } = require("./usuario.controller");
const { respondWithError } = require('../utils/functions');

async function GetUsuarios(req, res) {
    try {
        const resultadosBusqueda = await readUsuarioConFiltros(req.query);
        res.status(200).json(resultadosBusqueda);
    } catch (e) {
        respondWithError(res, e);
    }
}

async function PostUsuario(req, res) {
    try {
        await createUsuario(req.body);
        res.status(201).json({ mensaje: "Usuario creado con éxito." });
    } catch (e) {
      if (typeof e === "object"){
        res.status(409).json({ msg: "Email is taken!" })
      } else {
        respondWithError(res, e);
      }
    }
}

async function LoginUsuario(req, res) {
    try {
        const { usuario, token } = await loginUsuario(req.body);
        res.status(200).json({ token, id: usuario.id });
    } catch (e) {
        if (typeof e === "object"){
          res.status(401).json({ msg: "UNAUTHORIZED" })
        } else {
          respondWithError(res, e);
        }
    }
}

router.get("/", GetUsuarios);
router.post("/", PostUsuario);
router.post("/login", LoginUsuario);

module.exports = router;