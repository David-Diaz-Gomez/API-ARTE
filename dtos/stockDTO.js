const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    amount: { type: Number, required: [true, 'La cantidad es requerida'] },
    idProduct: { type: Schema.Types.ObjectId, ref: 'Product', required: [true, 'El ID del producto es requerido'] }, // Debe coincidir con 'Product'
    idPOS: { type: Schema.Types.ObjectId, ref: 'PointsOfSale', required: [true, 'El ID del punto de venta es requerido'] } // Debe coincidir con 'PointsOfSale'
});


module.exports = mongoose.model('Stock', StockSchema);