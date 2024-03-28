const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true } 
})

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: ''},
    email: { type: String, required: false },
    telefone: { type: String, required: false },
    criadoEm: { type: Date, default: Date.now }
})

const LoginModel = mongoose.model('logins', LoginSchema)
const ContatoModel = mongoose.model('contatos', ContatoSchema)

module.exports = {
    LoginModel: LoginModel,
    ContatoModel: ContatoModel
}