const Transaccion = require('../models/transaccion');
const transaccionCtrl = {}
transaccionCtrl.getTransaccions = async(req, res) => {
    try {
        var transaccions = await Transaccion.find();
        res.status(200).json(transaccions);
    } catch (error) {
        res.status(400).json({
            status: '1',
            msg: 'Error al obtener las transacciones',
            error: error
        })
    }
}
transaccionCtrl.createTransaccion = async(req, res) => {
    var transaccion = new Transaccion(req.body);
    try {
        await transaccion.save();
        res.status(200).json({
            status: '1',
            msg: 'Transaccion guardado.'
        })
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando operacion.',
            error: error
        })
    }
}
transaccionCtrl.getTransaccionesCliente = async(req, res) => {
    try {
        const email = req.params.email;
        var transacciones = await Transaccion.find({ emailCliente: email });
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar transaccione por cliente',
            error: error
        })
    }
}
transaccionCtrl.getTransaccionesDivisas = async(req, res) => {
    try {
        const origen = req.query.origen,
            destino = req.query.destino;
        var transacciones = await Transaccion.find({ monedaOrigen: origen, modenaDestino: destino });
        res.status(200).json(transacciones)
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar transacciones por divisas',
            error: error
        })
    }
}
module.exports = transaccionCtrl;