const Pasaje = require('../models/pasaje');
const Pasajero = require('../models/persona')
const pasajeCtrl = {}
pasajeCtrl.getPasajes = async(req, res) => {
    var pasajes = await Pasaje.find();
    if (pasajes.length != 0) {
        pasajes.forEach(async(pas) => {
            var pasajero = await Pasajero.findById(pas.pasajero.valueOf())
            console.log(pasajero)
        })
        res.json(pasajes);
    } else res.json({ "Message": "No hay Transacciones" })
}
pasajeCtrl.createPasaje = async(req, res) => {
    var pasaje = new Pasaje(req.body);
    try {
        await pasaje.save();
        res.json({
            'status': '1',
            'msg': 'Pasaje guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.',
            'error': error
        })
    }
}
pasajeCtrl.getPasajesCategoria = async(req, res) => {
    const pasajes = await Pasaje.find({ "categoriaPasajero": req.params.categoria });
    res.json(pasajes);
}
pasajeCtrl.editPasaje = async(req, res) => {
    try {
        await Pasaje.updateOne({ _id: req.body._id }, res.body);
        res.json({
            'status': '1',
            'msg': 'Pasaje updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
pasajeCtrl.deletePasaje = async(req, res) => {
    try {
        await Pasaje.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Pasaje removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = pasajeCtrl;