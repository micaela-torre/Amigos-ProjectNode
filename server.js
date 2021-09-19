const express = require('express')
const app = express()
const router = require('./routes/index')
const session = require('express-session')
const mongo = require('connect-mongodb-session')(session)
require("dotenv").config();
const store = new mongo({
    uri: process.env.MONGODB,
    collection: 'sessions',
})
require("./config/db");
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: process.env.FRASE,
    resave: false ,
    saveUninitialized: false,
    store: store
}))
app.use('/' , router)
app.listen(process.env.PORT || 4000, process.env.HOST || '0.0.0.0', () => console.log("Server in port :)"))