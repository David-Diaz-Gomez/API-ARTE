const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema  = new Schema({
    name: { type: String, required: [true,'El nombre del producto es requerido'] },
    unitPrice: { type: Number, required: [true,'El precio es requerido'] },
    quali:{type: Number, required: [true,'La calificacion del producto es requerida']},
    category:{ type: Schema.Types.ObjectId, ref: 'CategoryProd', required: [true,'La categoria del producto es requerida']},
    description: { type: String },
    state: { type: Boolean, default: true },
    image: { type: String, required: [true, 'La imagen es requerida']}
});

module.exports = mongoose.model('Product', productSchema);