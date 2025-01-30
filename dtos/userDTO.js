const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    name: { type: String, required: [true, 'El nombre de la persona es requerido'] },
    lastName: { type: String, required: [true, 'El apellido de la persona es requerido'] },
    email: { type: String, required: [true, 'El email de la persona es requerido'], unique: true },
    documentId: { type: String, required: [true, 'El documento de la persona es requerido'], unique: true },
    pss: { type: String, required: [true, 'La contraseña de la persona es requerida'] },
    state: { type: Boolean, default: true },
    adress: { type: String, required: [true, 'La dirección es requerida'] },
    phone: { type: Number, required: [true, 'El teléfono es requerido'] },
    dateOfBirth: { type: Date, required: [true, 'La fecha de nacimiento es requerida'] },
    creationDate: { type: Date, default: Date.now }, // Se agrega la fecha de creación automáticamente
    rol: { type: Schema.Types.ObjectId, ref: 'Rol', required: [true, 'El rol es requerido'] }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
