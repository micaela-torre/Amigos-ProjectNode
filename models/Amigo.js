const mongoose = require("mongoose");

const amigoSchema = new mongoose.Schema({
    nombre: { type: String },
    url: { type: String },
    descripcion: { type: String },
    email: { type: String },
    ubicacion: { type: String },
    userId: { type: String },
    edad:{type: String},
    likes: {type: Array}
});
const Amigo = mongoose.model("amigo", amigoSchema);
module.exports = Amigo;
