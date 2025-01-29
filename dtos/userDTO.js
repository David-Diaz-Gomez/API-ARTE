const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    name: { type: String, required: [true, 'El nombre de la persona es requerido']},
    email: { type: String, required: [true, 'El email de la persona es requerido'] },
    pss: { type: String, required: [true, 'La contraseña de la persona es requerido'] },
    state: {type: Boolean, default: true },
    rol: { type: Schema.Types.ObjectId, ref: 'rols',  required: [true, 'El rol es requerido'] } // Referencia al modelo de roles
});

module.exports = mongoose.model('Usuario', UsuarioSchema);