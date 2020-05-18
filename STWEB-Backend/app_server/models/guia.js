const mongoose = require( 'mongoose' );

const guiaSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellidos: {type: String, required: true},
    telefono: {type: String, required: true},
    espanol: {type: Boolean, required: true},
    ingles: {type: Boolean, required: true},
    frances: {type: Boolean, required: true},
    aleman: {type: Boolean, required: true},
    italiano: {type: Boolean, required: true},
    otros: String
});

module.exports = mongoose.model('Guia', guiaSchema);