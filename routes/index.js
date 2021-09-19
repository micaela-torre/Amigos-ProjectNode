const express = require('express')
const router = express.Router()
const amigosControllers = require('../controllers/amigosControllers')
const usuariosControllers = require('../controllers/usuariosControllers')
const validador = require('../controllers/validador')

router
.route('/')
.get(amigosControllers.home)

router
.route('/error')
.get(amigosControllers.error)

router
.route('/ayudar')
.get(amigosControllers.ayudar)

router 
.route('/registro')
.get(amigosControllers.registro)
.post(validador, usuariosControllers.registrar)

router
.route('/ingresar')
.get(amigosControllers.ingreso)
.post(usuariosControllers.ingresar)

router 
.route('/amigos')
.get(amigosControllers.amigos)

router 
.route('/requisitos')
.get(amigosControllers.requisitos)

router 
.route('/publicar')
.get(amigosControllers.publicar)
.post(amigosControllers.publicarAmigo)

router
.route('/borrar-publicacion/:_id')
.get(amigosControllers.borrarAmigo)

router
.route('/editar-publicacion/:_id')
.get(amigosControllers.editarAmigo)

router 
.route('/salir')
.get(usuariosControllers.salir)
router 


module.exports = router