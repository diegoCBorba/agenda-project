const LoginModel = require('./schemaLogin')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

class Login{
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

    async login(){
        this.valida()
        if(this.errors.length > 0) return

        this.user = await LoginModel.findOne({ email: this.body.email })

        // Se não houver o usuário ou a senha estiver errada
        if(!this.user || !bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Usuário ou senha inválida.')
            return
        }
    }

    valida(){
        this.cleanUp()
        // Validação
        // O e-mail precisa ser válido
        if(!validator.isEmail(this.body.email)){
            this.errors.push('E-mail inválido.')
        }

        // A senha precisa ter entre 3 e 50 caracteres
        if(this.body.password.length < 3 || this.body.password.length > 50){
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.')
        } 
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login