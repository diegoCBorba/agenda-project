exports.meuMiddleware = (req, res, next) => {
    next()
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        res.render('404');
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrf = req.csrfToken()
    next()
}