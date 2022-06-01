const Transaccion = require('../models/transaccion');
const Cliente = require('./../models/persona');
const transaccionCtrl = {}
transaccionCtrl.getTransaccions = async(req, res) => {
    var transaccions = await Transaccion.find();
    res.json(transaccions);
}
transaccionCtrl.createTransaccion = async(req, res) => {
    var transaccion = new Transaccion(req.body);
    try {
        await transaccion.save();
        res.json({
            'status': '1',
            'msg': 'Transaccion guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
transaccionCtrl.getTransaccionsClient = async(req, res) => {
    var transacciones = await Transaccion.find({ "emailCliente": req.params.email });
    res.json(transacciones);
}
transaccionCtrl.getTransaccionsDivisa = async(req, res) => {
    var transacciones = await Transaccion.find({ "monedaOrigen": req.params.moneda });
    var transaccionesD = await Transaccion.find({ "monedaDestino": req.params.moneda })
    transaccionesD.forEach((t) => {
        transacciones.push(t)
    })
    res.json(transacciones)
}
module.exports = transaccionCtrl;