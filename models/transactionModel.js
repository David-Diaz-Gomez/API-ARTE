const Transaction = require('../dtos/transactionDTO');

async function getAllPayments(req, res) {
    try {
        const transactions = await Transaction.find();
        res.status(200).json({ transactions });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Server error: ${error}`,
            code: 0,
        });
    }
}

module.exports = {
    getAllPayments
};