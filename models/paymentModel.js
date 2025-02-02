const mongoose = require('mongoose');
const Transaction = require('../dtos/transactionDTO');
const Invoice = require('../dtos/invoiceDTO');
const ProductDetails = require('../dtos/productDetailsDTO');

async function processPayment(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { idPayPortal, idMeansOP, total, totalTax, userId, products } = req.body;

        // 1. Crear la transacción
        const transaction = new Transaction({
            idPayPortal,
            idMeansOP
        });

        const savedTransaction = await transaction.save({ session });

        // 2. Crear la factura
        const invoice = new Invoice({
            total,
            totalTax,
            userId,
            transactionId: savedTransaction._id,
            state: true
        });

        const savedInvoice = await invoice.save({ session });

        // 3. Insertar detalles de productos
        const productDetails = products.map(product => ({
            idInvoice: savedInvoice._id,
            idProduct: product.idProduct,
            quantity: product.quantity,
            idPOS: product.idPOS
        }));

        await ProductDetails.insertMany(productDetails, { session });

        // 4. Confirmar la transacción
        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            error: false,
            message: "Pago procesado exitosamente",
            data: {
                transaction: savedTransaction,
                invoice: savedInvoice,
                productDetails
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            error: true,
            message: `Error procesando el pago: ${error.message}`
        });
    }
}

async function getPaymentDetails(req, res) {
    try {
        const { transactionId } = req.params;

        // Buscar la transacción
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({
                error: true,
                message: "Transacción no encontrada"
            });
        }

        // Buscar la factura asociada a la transacción
        const invoice = await Invoice.findOne({ transactionId: transactionId });
        if (!invoice) {
            return res.status(404).json({
                error: true,
                message: "Factura no encontrada"
            });
        }

        // Buscar los detalles de los productos de la factura
        const productDetails = await ProductDetails.find({ idInvoice: invoice._id });

        res.status(200).json({
            transaction,
            invoice,
            productDetails
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error.message}`
        });
    }
}

module.exports = { 
    processPayment,
    getPaymentDetails
 };
