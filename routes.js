const express = require('express')
const route = express.Router()
const homeController = require("./src/controllers/homeController.js")
const loginController = require("./src/controllers/loginController.js")
const cadastroController = require("./src/controllers/cadastroController.js")


// Rotas da home
route.get('/', homeController.index)

// Rotas de login
route.get('/login', loginController.index)

//Rotas de cadastro
route.get('/cadastro', cadastroController.index)

module.exports = route