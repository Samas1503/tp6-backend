//defino controlador para el manejo de CRUD
const pasajeCtrl = require('./../controllers/pasaje.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de pasaje
router.get('/', pasajeCtrl.getPasajes);
router.get('/:id', pasajeCtrl.getPasaje);
router.get('/filtro/:categoria', pasajeCtrl.filterPasajesByCategoria);
router.post('/', pasajeCtrl.createPasaje);
router.put('/:id', pasajeCtrl.editPasaje);
router.delete('/:dni', pasajeCtrl.deletePasaje);
//exportamos el modulo de rutas
module.exports = router;