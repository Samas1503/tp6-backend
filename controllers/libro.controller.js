const Libro = require('../models/libro');
const libroCtrl = {}
libroCtrl.getLibros = async(req, res) => {
    try {
        var libros = await Libro.find();
        res.status(200).json(libros);
    } catch (error) {
        res.status(400).json({
            status: 0,
            msg: "Error al obtener los libros",
            error: error
        })
    }
}
libroCtrl.filterByDestacados = async(req, res) => {
    try {
        var librosDestacados = await Libro.find({ destacado: true })
        res.tatus(200).json(librosDestacados)
    } catch (error) {
        res.status(400).json({
            status: 0,
            msg: "Error al filtrar el libro",
            error: error
        })
    }
}
libroCtrl.createLibro = async(req, res) => {
    var libro = new Libro(req.body);
    try {
        await libro.save();
        res.status(200).json({
            status: '1',
            msg: 'Libro guardado.'
        })
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando operacion.',
            error: error
        })
    }
}
libroCtrl.editLibro = async(req, res) => {
    try {
        await Libro.updateOne({ _id: req.body._id }, req.body);
        res.status(200).json({
            status: '1',
            msg: 'Libro actualizado correctamente'
        })
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al actualizar Libro',
            error: error
        })
    }
}
libroCtrl.deleteLibro = async(req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: '1',
            msg: 'Libro eliminado'
        })
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al eliminar el libro',
            error: error
        })
    }
}
module.exports = libroCtrl;