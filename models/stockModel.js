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

module.exports = {
    add_stock,
    read_stock,
    read_stockProducto,
    read_stockPOS,
    update_stock,
    delete_stock
};
