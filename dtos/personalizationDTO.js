const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalizationSchema = new Schema({
    category: { type: String, required: [true, 'La categoría de la persona es requerida'] },
    state: { 
        type: String, 
        enum: ['pendiente', 'aceptado', 'rechazado'], 
        default: 'pendiente',
        required: [true, 'El estado es requerido']
    },
    description: { type: String, required: [true, 'La descripción es requerida'] },
    budget: { type: Number, required: [true, 'El precio sugerido es requerido'] },
    date: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El ID de usuario es requerido'] }
});

module.exports = mongoose.model('Personalization', PersonalizationSchema);

