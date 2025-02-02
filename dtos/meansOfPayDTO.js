const mongoose = require('mongoose');
 
const mensOfPaySchema = new mongoose.Schema({
    state: {
        type: Boolean,
        required: true,
        default: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
})
 
module.exports = mongoose.model('MensOfPay', mensOfPaySchema);
 
