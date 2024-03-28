const Contato = require('../models/contatoModel')

exports.index = async (req, res) => {
    if(!req.session.user) return res.redirect('/login')
    const contatos = await Contato.buscaContatos()
    res.render('index', { contatos })
}
