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
    var email = req.params.email;
    if (email != undefined) {
        var transacciones = await Transaccion.find({ "emailCliente": req.params.email });
        res.json(transacciones);
    } else
        res.status(401).json({
            'status': '0',
            'msg': 'Parametros mal ingresados'
        })
}
transaccionCtrl.getTransaccionsDivisa = async(req, res) => {
    var transacciones = await Transaccion.find({ "monedaOrigen": req.query.origen, "modenaDestino": req.query.destino });
    res.json(transacciones)
}
module.exports = transaccionCtrl;