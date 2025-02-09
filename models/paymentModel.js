const mongoose = require('mongoose');
const Transaction = require('../dtos/transactionDTO');
const Invoice = require('../dtos/invoiceDTO');
const ProductDetails = require('../dtos/productDetailsDTO');
const Stock = require('../dtos/stockDTO');

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

        // 3. Insertar detalles de productos y actualizar stock
        const productDetails = [];

        for (const product of products) {
            // Buscar en la colección Stock
            const stockRecord = await Stock.findOne(
                { idProduct: product.idProduct, idPOS: product.idPOS }
            ).session(session);

            if (!stockRecord) {
                throw new Error(`Stock no encontrado para el producto ${product.idProduct} en POS ${product.idPOS}`);
            }

            // Verificar si hay suficiente stock
            if (stockRecord.amount < product.quantity) {
                throw new Error(`Stock insuficiente para el producto ${product.idProduct}`);
            }

            // Actualizar la cantidad en stock
            stockRecord.amount -= product.quantity;
            await stockRecord.save({ session });

            // Insertar el detalle del producto
            productDetails.push({
                idInvoice: savedInvoice._id,
                idProduct: product.idProduct,
                quantity: product.quantity,
                idPOS: product.idPOS
            });
        }

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

async function getTotalAndPOSSales(req, res) {
    try {
        const salesAggregation = await ProductDetails.aggregate([
            {
                $group: {
                    _id: "$idPOS", // Agrupa por POS
                    totalSold: { $sum: "$quantity" } // Suma la cantidad de productos vendidos
                }
            },
            {
                $lookup: {
                    from: "pointsofsales", // Asegúrate de que coincide con el nombre real de la colección
                    localField: "_id",
                    foreignField: "_id",
                    as: "posInfo"
                }
            },
            {
                $unwind: "$posInfo"
            },
            {
                $project: {
                    _id: 0,
                    idPOS: "$_id",
                    namePOS: "$posInfo.name",
                    totalSold: 1
                }
            }
        ]);

        // Obtener la cantidad total de productos vendidos
        const totalSoldGeneral = await ProductDetails.aggregate([
            { 
                $group: { 
                    _id: null, 
                    totalSold: { $sum: "$quantity" } 
                } 
            }
        ]);

        const totalSold = totalSoldGeneral.length > 0 ? totalSoldGeneral[0].totalSold : 0;

        res.status(200).json({
            totalSold,
            salesByPOS: salesAggregation
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error.message}`
        });
    }
}


async function getTotalSalesByPOS(req, res) {
    try {
        let { idPOS } = req.params;

        // Convertir a ObjectId si es necesario (MongoDB usa ObjectId por defecto en _id)
        if (mongoose.Types.ObjectId.isValid(idPOS)) {
            idPOS = new mongoose.Types.ObjectId(idPOS);
        }

        const salesAggregation = await ProductDetails.aggregate([
            {
                $match: { idPOS: idPOS } // Asegura que se filtre correctamente por el ID
            },
            {
                $group: {
                    _id: "$idPOS",
                    totalSold: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "pointsofsales",
                    localField: "_id",
                    foreignField: "_id", // Asegura que coincida con la estructura de tu BD
                    as: "posInfo"
                }
            },
            {
                $unwind: {
                    path: "$posInfo",
                    preserveNullAndEmptyArrays: true // Evita errores si no hay coincidencia
                }
            },
            {
                $project: {
                    _id: 0,
                    idPOS: "$_id",
                    namePOS: "$posInfo.name",
                    totalSold: 1
                }
            }
        ]);

        if (!salesAggregation.length) {
            return res.status(404).json({
                error: true,
                message: "No se encontraron ventas para el punto de venta proporcionado o el ID no es correcto."
            });
        }

        res.status(200).json({
            salesByPOS: salesAggregation[0]
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error.message}`
        });
    }
}




async function getTransactionCountByUser(req, res) {
    try {
        const transactionCounts = await Invoice.aggregate([
            {
                $group: {
                    _id: "$userId", // Agrupa por usuario
                    transactionCount: { $sum: 1 } // Cuenta la cantidad de facturas
                }
            },
            {
                $lookup: {
                    from: "usuarios", // Nombre real de la colección de usuarios
                    localField: "_id",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            {
                $unwind: "$userInfo"
            },
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    userName: "$userInfo.name", // Ajusta según el campo real del nombre de usuario
                    transactionCount: 1
                }
            }
        ]);

        res.status(200).json({
            error: false,
            data: transactionCounts
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error obteniendo el conteo de transacciones por usuario: ${error.message}`
        });
    }
}

module.exports = { 
    processPayment,
    getPaymentDetails,
    getTotalAndPOSSales,
    getTotalSalesByPOS,
    getTransactionCountByUser
};