//defino controlador para el manejo de CRUD
const pasajeCtrl = require('./../controllers/pasaje.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de pasaje
router.get('/', pasajeCtrl.getPasajes);
router.post('/', pasajeCtrl.createPasaje);
router.get('/:categoria', pasajeCtrl.getPasajesCategoria);
router.put('/:id', pasajeCtrl.editPasaje);
router.delete('/:id', pasajeCtrl.deletePasaje);
//exportamos el modulo de rutas
module.exports = router;