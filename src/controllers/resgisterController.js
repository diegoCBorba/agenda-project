const Register = require('../models/registerModel')

exports.index = (req, res) => {
    if(req.session.user){
        res.locals.errors = req.flash('errors', 'Você sair da conta para acessar o cadastro.')
        return res.redirect('/')  
    } 
        
    res.render('cadastro')
}

exports.register = async function(req, res){
    try{
        const register = new Register(req.body)
        await register.register()
    
        if(register.errors.length > 0){
            req.flash('errors', register.errors)
            req.session.save(function(){
                return res.redirect('/register')
            })
            return
        }
        req.flash('success', 'Seu usuário foi criado com sucesso.')
        req.session.save(function(){
            return res.redirect('/login')
        })
    }catch(e){
        console.log(e)
        res.render('404')
    }

}