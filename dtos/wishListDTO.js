const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishListSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: [true, 'El ID del producto es requerido'] },
    userId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El ID del usuario es requerido'] }
});


module.exports = mongoose.model('WhisList', WishListSchema);