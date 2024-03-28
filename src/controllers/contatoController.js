const Contato = require('../models/contatoModel')

exports.index = (req, res) => {
    if(!req.session.user){
        res.locals.errors = req.flash('errors', 'Você precisa logar para acessar o contato.')
        return res.redirect('/login')  
    } 

    res.render("contato", {
        contato: {}
    })
}

exports.register = async (req, res) => {
    try{
        const contato = new Contato(req.body)
        await contato.register() 
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato'))
            return
        }
    
        req.flash('success', 'Contato registrado com sucesso.')
        req.session.save(() => res.redirect(`/contato/${contato.contato._id}`))
        return
    }catch(e){
        console.log(e)
        return res.render('404')
    }
}

exports.editIndex = async (req, res) => {
    if(!req.session.user){
        res.locals.errors = req.flash('errors', 'Você precisa logar para acessar o contato.')
        return res.redirect('/login')  
    } 

    if(!req.params.id) return res.render('404')

    const contato = await Contato.buscaPorId(req.params.id)
    if(!contato) return res.render('404')

    res.render('contato', { contato })
}

exports.edit = async (req, res) => {
    try{
        if(!req.params.id) return res.render('404')
        const contato = new Contato(req.body)
        await contato.edit(req.params.id)
    
        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('back'))
            return
        }
    
        req.flash('success', 'Contato editado com sucesso.')
        req.session.save(() => res.redirect('/'))
        return
    }catch(e){
        console.log(e)
        return res.render('404')
    }
}

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404')

    const contato = await Contato.delete(req.params.id)
    if(!contato) return res.render('404')

    req.flash('success', `Contato (${contato.nome}) apagado com sucesso.`)
    req.session.save(() => res.redirect('/'))
}