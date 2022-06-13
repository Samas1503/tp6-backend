const Persona = require('../models/persona');
const personaCtrl = {}
personaCtrl.getPersonas = async(req, res) => {
    try {
        var personas = await Persona.find();
        res.status(200).json(personas);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al obtener las personas',

        })
    }
}
personaCtrl.deletePersona = async(req, res) => {
    id = req.params.id;
    try {
        var persona = await Persona.findById(id);
        await Persona.deleteOne({ _id: persona._id });
        res.status(200).json({
            status: '1',
            msg: 'Persona eliminada correctamente'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al eliminar una Persona'
        })
    }
}
personaCtrl.createPersona = async(req, res) => {
    var persona = new Persona(req.body);
    try {
        await persona.save();
        res.status(200).json({
            status: '1',
            msg: 'Persona guardado.'
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al crear la persona',

        })
    }
}
personaCtrl.getPersona = async(req, res) => {
    try {
        const dni = req.params.dni;
        const persona = await Persona.findOne({ dni: dni });
        res.status(200).json(persona);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al buscar Persona',

        })
    }
}
module.exports = personaCtrl;