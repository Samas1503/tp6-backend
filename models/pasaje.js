const mongoose = require('mongoose');
const { Schema } = mongoose;
const PasajeSchema = new Schema({
    precioPasaje: { type: Number, required: true },
    categoriaPasajero: { type: String, required: true },
    fechaCompra: { type: String, required: true },
    pasajero: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true }
})

module.exports = mongoose.model('Pasaje', PasajeSchema);