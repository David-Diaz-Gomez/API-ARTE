const POS = require('../dtos/pointsOfSaleDTO');

// Agregar un nuevo punto de venta
async function add_pos(req, res) {
    console.log(req.body);
    try {
        const pos = new POS({
            name: req.body.name,
            city: req.body.city,
            state: req.body.state !== undefined ? req.body.state : true,
            adress: req.body.adress,
            departament: req.body.departament,
        });

        const result = await pos.save();
        res.status(201).json({
            error: false,
            message: "Punto de venta creado exitosamente",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error.message}`,
        });
    }
}

// Obtener todos los puntos de venta
async function read_pos(req, res) {
    try {
        const posList = await POS.find();
        res.status(200).json({ posList });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error.message}`,
        });
    }
}

// Obtener un punto de venta por ID
async function read_posById(req, res) {
    try {
        const { id } = req.params;
        const pos = await POS.findById(id);

        if (!pos) {
            return res.status(404).json({
                error: true,
                message: "Punto de venta no encontrado",
            });
        }

        res.status(200).json({ pos });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error.message}`,
        });
    }
}

// Actualizar un punto de venta
async function update_pos(req, res) {
    try {
        const { id } = req.params;
        const updatedData = {
            name: req.body.name,
            city: req.body.city,
            state: req.body.state !== undefined ? req.body.state : true,
            adress: req.body.adress,
            departament: req.body.departament,
        };

        const pos = await POS.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

        if (!pos) {
            return res.status(404).json({
                error: true,
                message: "No se encontró el punto de venta para actualizar",
            });
        }

        res.status(200).json({
            error: false,
            message: "Punto de venta actualizado correctamente",
            data: pos,
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error.message}`,
        });
    }
}

// Eliminar un punto de venta
async function delete_pos(req, res) {
    try {
        const { id } = req.params;
        const pos = await POS.findByIdAndDelete(id);

        if (!pos) {
            return res.status(404).json({
                error: true,
                message: "No se encontró el punto de venta para eliminar",
            });
        }

        res.status(200).json({
            error: false,
            message: "Punto de venta eliminado exitosamente",
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error.message}`,
        });
    }
}

// Cambiar el estado del punto de venta a `false` (Deshabilitar acceso)
async function updateAcceso_pos(req, res) {
    try {
        const { id } = req.params;
        const pos = await POS.findByIdAndUpdate(id, { $set: { state: false } }, { new: true });

        if (!pos) {
            return res.status(404).json({
                error: true,
                message: "No se encontró el punto de venta para actualizar",
            });
        }

        res.status(200).json({
            error: false,
            message: "Acceso deshabilitado correctamente",
            data: pos,
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error.message}`,
        });
    }
}

module.exports = {
    add_pos,
    read_pos,
    read_posById,
    update_pos,
    delete_pos,
    updateAcceso_pos
};
