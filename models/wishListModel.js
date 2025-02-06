const WishList = require('../dtos/wishListDTO');

function add_wishList(req, res) {
    const wl = new WishList({
        productId: req.body.productId,
        userId: req.body.userId
    });
    
    wl.save()
        .then(result => {
            res.status(201).json({
                error: false,
                message: "Lista de deseos agregada exitosamente",
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
async function read_wishList(req, res) {
    try {
        const wl = await WishList.find()
            .populate('productId')  // Trae la información del producto
            .populate('userId');     // Trae la información del punto de venta
        res.status(200).json({ wl });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error}`
        });
    }
}

async function read_wishListByUserId(req, res) {
    try {
        const { userId } = req.params;
        const wishList = await WishList.find({ userId })
            .populate('productId')  // Trae la información del producto
            .populate('userId');     // Trae la información del usuario
        
        if (!wishList.length) {
            return res.status(404).json({
                error: true,
                message: "No se encontraron listas de deseos para este usuario"
            });
        }

        res.status(200).json({ error: false, data: wishList });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error}`
        });
    }
}

async function delete_wishList(req, res) {
    try {
        const { id } = req.params;
        const deletedWishList = await WishList.findByIdAndDelete(id);
        
        if (!deletedWishList) {
            return res.status(404).json({
                error: true,
                message: "Lista de deseos no encontrada"
            });
        }
        
        res.status(200).json({
            error: false,
            message: "Lista de deseos eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error del servidor: ${error}`
        });
    }
}
module.exports = {
    add_wishList,
    read_wishList,
    delete_wishList,
    read_wishListByUserId
};