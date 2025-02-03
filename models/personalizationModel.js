const mongoose = require('mongoose');
const Personalization = require('../dtos/personalizationDTO');  // Asegúrate de ajustar la ruta

// Crear una nueva personalización
async function add_personalization(req, res) {
    try {

        const personalization = new Personalization({
            category: req.body.category,
            state: req.body.state || 'pendiente',
            description: req.body.description,
            budget: req.body.budget,
            userId: req.body.userId
        });

        try {
            const result = await personalization.save();
            res.status(201).json({
                error: false,
                message: 'Se creó la personalización',
                data: result
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: `Error al guardar la personalización: ${error}`
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error}`,
            code: 0
        });
    }
}

// Obtener todas las personalizaciones
async function read_personalizations(req, res) {
    try {
        // Usamos el populate para traer los datos del usuario (solo los de userId)
        const personalizations = await Personalization.find()
            .populate('userId')  // Puedes incluir los campos que necesites del usuario
            .exec();

        res.status(200).json({ personalizations });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error}`,
            code: 0
        });
    }
}


// Obtener una personalización por su ID
async function read_personalizationById(req, res) {
    try {
        const personalization = await Personalization.findOne({ _id: req.params.id });
        if (!personalization) {
            return res.status(404).json({
                error: true,
                message: 'Personalización no encontrada'
            });
        }
        res.status(200).json({ personalization });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error}`,
            code: 0
        });
    }
}

// Actualizar una personalización existente
async function update_personalization(req, res) {
    try {

        const updatedPersonalization = await Personalization.findByIdAndUpdate(
            req.params.id, 
            {
                category: req.body.category,
                state: req.body.state || 'pendiente',
                description: req.body.description,
                budget: req.body.budget
            },
            { new: true }  // Retorna el documento actualizado
        );

        if (!updatedPersonalization) {
            return res.status(404).json({
                error: true,
                message: 'Personalización no encontrada'
            });
        }

        res.status(200).json({
            error: false,
            message: 'Personalización actualizada',
            data: updatedPersonalization
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Error en el servidor: ${error}`,
            code: 0
        });
    }
}

// Eliminar una personalización
async function delete_personalization(req, res) {
    const personalizationId = req.params.id;

    try {
        const result = await Personalization.findOneAndDelete({ _id: personalizationId });

        if (result) {
            res.status(200).json({
                resultado: true,
                msg: 'Personalización eliminada exitosamente'
            });
        } else {
            res.status(404).json({
                resultado: false,
                msg: 'No se pudo encontrar la personalización para eliminar, verifique el id'
            });
        }
    } catch (error) {
        res.status(500).json({
            resultado: false,
            msg: 'Ocurrió un error al eliminar la personalización',
            error: error
        });
    }
}

module.exports = {
    add_personalization,
    read_personalizations,
    read_personalizationById,
    update_personalization,
    delete_personalization
};
