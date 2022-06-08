//defino controlador para el manejo de CRUD
const transaccionCtrl = require('./../controllers/transaccion.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de transaccion
router.get('/all', transaccionCtrl.getTransaccions);
router.post('/', transaccionCtrl.createTransaccion);
router.get('/:email', transaccionCtrl.getTransaccionsClient);
router.get('/:origen?:destino?', transaccionCtrl.getTransaccionsDivisa);
//exportamos el modulo de rutas
module.exports = router;