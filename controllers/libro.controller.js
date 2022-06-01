const Libro = require('../models/libro');
const libroCtrl = {}
libroCtrl.getLibros = async(req, res) => {
    var libros = await Libro.find();
    res.json(libros);
}
libroCtrl.getLibrosDestacados = async(req, res) => {
    var libros = await Libro.find({ "destacado": "true" })
    res.json(libros)
}
libroCtrl.createLibro = async(req, res) => {
    var libro = new Libro(req.body);
    try {
        await libro.save();
        res.json({
            'status': '1',
            'msg': 'Libro guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
libroCtrl.editLibro = async(req, res) => {
    try {
        await Libro.updateOne({ _id: req.body._id }, req.body);
        res.json({
            'status': '1',
            'msg': 'Libro updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
libroCtrl.deleteLibro = async(req, res) => {
    try {
        await Libro.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Libro removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = libroCtrl;