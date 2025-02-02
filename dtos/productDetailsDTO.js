const mongoose = require('mongoose');

const productDetailsSchema = new mongoose.Schema({
    idInvoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true },
    idProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    idPOS: { type: mongoose.Schema.Types.ObjectId, ref: 'PointOfSale', required: true }
});

module.exports = mongoose.model('ProductDetails', productDetailsSchema);
