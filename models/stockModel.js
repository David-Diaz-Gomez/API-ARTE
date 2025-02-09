const Stock = require('../dtos/stockDTO');

// Agregar stock
function add_stock(req, res) {
    const stock = new Stock({
        amount: req.body.amount,
        idProduct: req.body.idProduct,
        idPOS: req.body.idPOS
    });
    
    stock.save()
        .then(result => {
            res.status(201).json({
                error: false,
                message: "Stock agregado exitosamente",
                data: result
            });
        })
        .catch(error => {
            res.status(500).json({
                error: true,
                message: `Error del servidor: ${error}`
            });
        });
}

// Obtener todos los stocks con información de producto y punto de venta
async function read_stock(req, res) {
    try {
        const stocks = await Stock.find()
            .populate('idProduct')  // Trae la información del producto
            .populate('idPOS');     // Trae la información del punto de venta
        res.status(200).json({ stocks });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error}`
        });
    }
}

// Obtener stock por ID de producto con información de producto y punto de venta
async function read_stockProducto(req, res) {
    try {
        const { idProduct } = req.params;
        const stocks = await Stock.find({ idProduct })
            .populate('idProduct')
            .populate('idPOS');
        res.status(200).json({ stocks });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error}`
        });
    }
}

// Obtener stock por ID de punto de venta con información de producto y punto de venta
async function read_stockPOS(req, res) {
    try {
        const { idPOS } = req.params;
        const stocks = await Stock.find({ idPOS })
            .populate('idProduct')
            .populate('idPOS');
        res.status(200).json({ stocks });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error}`
        });
    }
}

// Actualizar stock
async function update_stock(req, res) {
    try {
        const { id } = req.params;
        const updatedStock = await Stock.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedStock) {
            return res.status(404).json({
                error: true,
                message: "Stock no encontrado"
            });
        }
        
        res.status(200).json({
            error: false,
            message: "Stock actualizado correctamente",
            data: updatedStock
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error}`
        });
    }
}

// Eliminar stock
async function delete_stock(req, res) {
    try {
        const { id } = req.params;
        const deletedStock = await Stock.findByIdAndDelete(id);
        
        if (!deletedStock) {
            return res.status(404).json({
                error: true,
                message: "Stock no encontrado"
            });
        }
        
        res.status(200).json({
            error: false,
            message: "Stock eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error}`
        });
    }
}

// Obtener la cantidad total de productos por punto de venta
async function count_products_by_POS(req, res) {
    try {
        const stockAggregation = await Stock.aggregate([
            {
                $group: {
                    _id: "$idPOS",  // Agrupa por punto de venta
                    totalAmount: { $sum: "$amount" }  // Suma la cantidad de productos en cada POS
                }
            },
            {
                $lookup: {
                    from: "pointsofsales",  // Asegúrate de que es el nombre correcto en MongoDB
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
                    namePOS: "$posInfo.name",  // Ajusta según el campo correcto en tu modelo de POS
                    totalAmount: 1
                }
            }
        ]);

        res.status(200).json({ stockAggregation });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error}`
        });
    }
}


// Obtener la cantidad total de stock por categoría de producto
async function count_stock_by_category(req, res) {
    try {
        const stockByCategory = await Stock.aggregate([
            {
                $lookup: {
                    from: "products", // Asegúrate de que coincide con el nombre real de la colección
                    localField: "idProduct",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            {
                $unwind: "$productInfo"
            },
            {
                $lookup: {
                    from: "categoryprods", // Asegúrate de que coincide con el nombre real de la colección
                    localField: "productInfo.category",
                    foreignField: "_id",
                    as: "categoryInfo"
                }
            },
            {
                $unwind: "$categoryInfo"
            },
            {
                $group: {
                    _id: "$categoryInfo._id", // Agrupa por ID de categoría
                    categoryName: { $first: "$categoryInfo.name" },
                    totalStock: { $sum: "$amount" } // Suma la cantidad total de stock por categoría
                }
            },
            {
                $project: {
                    _id: 0,
                    idCategory: "$_id",
                    categoryName: 1,
                    totalStock: 1
                }
            }
        ]);

        res.status(200).json({ stockByCategory });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error}`
        });
    }
}



module.exports = {
    add_stock,
    read_stock,
    read_stockProducto,
    read_stockPOS,
    update_stock,
    delete_stock,
    count_products_by_POS,
    count_stock_by_category
};
