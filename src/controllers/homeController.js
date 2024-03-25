exports.paginaInicial = (requisicao, resposta) => {
    resposta.render('index', {
        titulo: "Título da pag",
        numeros: [0, 1, 2, 3, 4, 5]
    })
}

exports.enviaFormulario = (req, res) => {
    res.send("Formulario Enviado")
    console.log(req.body)
}