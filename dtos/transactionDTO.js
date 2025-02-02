const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    idPayPortal: { type: String, required: true },
    idMeansOP: { type: mongoose.Schema.Types.ObjectId, ref: 'MeansOfPay', required: true }
});

module.exports = mongoose.model('Transaction', transactionSchema);
