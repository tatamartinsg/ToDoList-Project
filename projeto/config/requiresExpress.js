const express = require("express")
const consign = require('consign')
const bodyParser = require('body-parser')
const handlebars = require("express-handlebars")
const session = require('express-session')
const flash = require('connect-flash')
const cors = require('cors')

module.exports = () => {
    const app = express()

    app.use(cors())

    //'pegar' o js do front e o css
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    app.use(express.static('public'));
    //configurar o handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine','handlebars')
    //configurar o body parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())


    consign() //serve para interligar as rotas que estao em um arquivo js separado!!
        .include('routes')
        .into(app)

    return app
}
