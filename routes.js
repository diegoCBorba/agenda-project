const express = require('express')
const route = express.Router()
const homeController = require("./src/controllers/homeController.js")
const loginController = require("./src/controllers/loginController.js")
const registerController = require("./src/controllers/resgisterController.js")
const contatoController = require("./src/controllers/contatoController.js")



// Rotas da home
route.get('/', homeController.index)

// Rotas de login

route.get('/login', loginController.index)
route.post('/login', loginController.login)
route.get('/logout', loginController.logout)

//Rotas de cadastro
route.get('/register', registerController.index)
route.post('/register', registerController.register)

//Rotas de contato
route.get('/contato', contatoController.index)
route.post('/contato', contatoController.register)
route.get('/contato/:id', contatoController.editIndex)

module.exports = route