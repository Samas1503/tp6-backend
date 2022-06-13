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
            msg: "Error al obtener los pasajes"
        })
    }
}
pasajeCtrl.getPasaje = async(req, res) => {
    const id = req.params.id;
    try {
        var pasaje = await Pasaje.findById(id).populate("pasajero");
        res.status(200).json(pasaje)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 0,
            msg: "Error al obtener los pasajes"
        })
    }
}
pasajeCtrl.createPasaje = async(req, res) => {
    const pasaje = new Pasaje(req.body);
    try {
        if (pasaje.categoriaPasajero != 'm' && pasaje.categoriaPasajero != 'a' && pasaje.categoriaPasajero != 'j')
            throw new Error('Categoria de Pasajero invalida')

        const persona = await Pasajero.findById(pasaje.pasajero._id)
        if (!persona) throw new Error('Persona no Existe')

        await pasaje.save();
        res.status(200).json({
            status: '1',
            msg: 'Pasaje guardado.'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al crear Pajase'
        })
    }
}
pasajeCtrl.filterPasajesByCategoria = async(req, res) => {
    try {
        const categoria = req.params.categoria;
        if (categoria != 'm' && categoria != 'a' && categoria != 'j')
            throw new Error('Categoria de Pasajero invalida')

        const pasajes = await Pasaje.find({ categoriaPasajero: categoria });
        res.status(200).json(pasajes);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar pasajes'
        })
    }
}
pasajeCtrl.editPasaje = async(req, res) => {
    const id = req.params.id;
    const pasaje = req.body;
    try {
        if (pasaje.categoriaPasajero != 'm' && pasaje.categoriaPasajero != 'a' && pasaje.categoriaPasajero != 'j')
            throw new Error('Categoria de Pasajero invalida')

        const persona = await Pasajero.findById(pasaje.pasajero._id)
        if (!persona) throw new Error('Persona no Existe')

        await Pasaje.updateOne({ _id: id }, pasaje);
        res.status(200).json({
            status: '1',
            msg: 'Pasaje Actualizado correctamente'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al actualizar Pasaje',
        })
    }
}
pasajeCtrl.deletePasaje = async(req, res) => {
    id = req.params.id;
    try {
        const pasaje = await Pasaje.findById(id)
        await Pasaje.deleteOne({ _id: pasaje.id });
        res.status(200).json({
            status: '1',
            msg: 'Pasaje Eliminado correctamente'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operacion',
        })
    }
}
module.exports = pasajeCtrl;