const Pasaje = require('../models/pasaje');
const Pasajero = require('../models/persona')
const pasajeCtrl = {}
pasajeCtrl.getPasajes = async(req, res) => {
    try {
        var pasajes = await Pasaje.find().populate("pasajero");
        res.status(200).json(pasajes);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 0,
            msg: "Error al obtener los pasajes",
            'error': error
        })
    }
}
pasajeCtrl.createPasaje = async(req, res) => {
    const pasaje = new Pasaje(req.body);
    try {
        if (pasaje.categoria != 'm' && pasaje.categoria != 'a' && pasaje.categoria != 'j')
            throw new Error('Categoria de Pasajero invalida')

        const persona = await Pasajero.findById(pasaje.pasajero._id)
        if (!persona) throw new Error('Persona no Existe')

        await pasaje.save();
        res.satus(200).json({
            status: '1',
            msg: 'Pasaje guardado.'
        })
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al crear Pajase',
            'error': error
        })
    }
}
pasajeCtrl.filterPasajesByCategoria = async(req, res) => {
    try {
        const categoria = req.query.categoria;
        if (categoria != 'm' && categoria != 'a' && categoria != 'j')
            throw new Error('Categoria de Pasajero invalida')

        const pasajes = await Pasaje.find({ categoriaPasajero: categoria });
        res.status(200).json(pasajes);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar pasajes',
            'error': error
        })
    }
}
pasajeCtrl.editPasaje = async(req, res) => {
    const pasaje = new Pasaje(req.body);
    try {
        if (pasaje.categoria != 'm' && pasaje.categoria != 'a' && pasaje.categoria != 'j')
            throw new Error('Categoria de Pasajero invalida')

        const persona = await Pasajero.findById(pasaje.pasajero._id)
        if (!persona) throw new Error('Persona no Existe')

        await Pasaje.updateOne({ _id: pasaje._id }, pasaje);
        res.status(200).json({
            status: '1',
            msg: 'Pasaje Actualizado correctamente'
        })
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al actualizar Pasaje',
            'error': error
        })
    }
}
pasajeCtrl.deletePasaje = async(req, res) => {
    try {
        const pasaje = await Pasaje.findById(req.params.id)
        await Pasaje.deleteOne({ _id: pasaje.id });
        res.status(200).json({
            status: '1',
            msg: 'Pasaje Eliminado correctamente'
        })
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operacion',
            'error': error
        })
    }
}
module.exports = pasajeCtrl;