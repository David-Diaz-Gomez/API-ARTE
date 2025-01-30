const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const POSSchema = new Schema({
    name: { type: String, required: [true, 'El nombre del punto de venta es requerido'] },
    city: { type: String, required: [true, 'La ciudad es requerida'] },
    state: { type: Boolean, default: true },
    adress: { type: String, required: [true, 'La dirección es requerida'] },
    departament: { type: Number, required: [true, 'El departamento es requerido'] },
});

module.exports = mongoose.model('PointsOfSale', POSSchema);