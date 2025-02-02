const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    total: { type: Number, required: true },
    totalTax: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    state: { type: Boolean, default: true },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
