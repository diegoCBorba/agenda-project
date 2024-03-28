const mongoose = require('mongoose')
const { ContatoModel } = require('./schemaModel')
const validator = require('validator')

function Contato(body){
    this.body = body
    this.errors = []
    this.contato = null
}

Contato.buscaPorId = async function(id){
    try{
        if(typeof id !== 'string') return
        if(!mongoose.Types.ObjectId.isValid(id)) return
        const user = await ContatoModel.findById(id)
        return user
    }catch(e){
        console.log(e)
        return res.render('404')
    }
}

Contato.prototype.register = async function(){
    this.valida()
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body)
}

Contato.prototype.valida = function(){
    this.cleanUp()
    // Validação
    //Nome - name
    if(!this.body.nome) this.errors.push("Nome é um campo obrigatório.")
    // Email - email
// Telefone - phone
    if(!this.body.email && !this.body.telefone){
        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.')
    }else{
        if(this.body.email && !validator.isEmail(this.body.email)){
            this.errors.push('E-mail inválido.')
        }
        const regex = /^\((\d{2})\) (\d{5})-(\d{4})$/;
        if (this.body.telefone && !regex.test(this.body.telefone)) {
        this.errors.push('Telefone inválido.');
        }
    }
}

Contato.prototype.cleanUp = function(){
    for(const key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key] = ''
        }
    }

    this.body = {
        nome: this.body.name,
        sobrenome: this.body.lastname,
        email: this.body.email,
        telefone: this.body.phone
    }
}

module.exports = Contato