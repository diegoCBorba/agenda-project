exports.meuMiddleware = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Variável Local'
    next()
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.send('BAD CSRF')
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrf = req.csrfToken()
    next()
}