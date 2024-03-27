const Login = require('../models/loginModel')

exports.index = (req, res) => {
    if(req.session.user){
        res.locals.errors = req.flash('errors', 'Você sair da conta para acessar o login.')
        return res.redirect('/')  
    } 
    res.render('login')
}

exports.login = async function(req, res){
    try{
        const login = new Login(req.body)
        await login.login()
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(function(){
                return res.redirect('/login')
            })
            return
        }
        req.flash('success', 'Você logou com sucesso.')
        req.session.user = login.user
        req.session.save(function(){
            return res.redirect('/')
        })
    }catch(e){
        console.log(e)
        res.render('404')
    }

}

exports.logout = function(req, res){
    req.session.destroy()
    res.redirect('/login')
}