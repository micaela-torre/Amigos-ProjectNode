const Amigo = require("../models/Amigo")
const amigosControllers = {
    home: (req,res) => {
    try{
        res.render('index', {
            title: "Inicio",
            loggedIn: req.session.loggedIn,
            user: req.session.user,
            error: null
        })
    } catch(e){
        console.log(e)
        res.redirect('error')
    }
    },
    ayudar: (req,res) => {
        try{
            res.render('ayudar', {
                title: "Ayudar",
                loggedIn: req.session.loggedIn,
                user: req.session.user,
                error: null
            })
        } catch(e){
            console.log(e)
            res.redirect('error')
        }
        },
        requisitos: (req,res) => {
            try{
                res.render('requisitos', {
                    title: "Requisitos",
                    loggedIn: req.session.loggedIn,
                    user: req.session.user,
                    error: null
                })
            } catch(e){
                console.log(e)
                res.redirect('error')
            }
            },
    registro: (req,res) => {
    try{
        if(!req.session.loggedIn){
            res.render('registro', {
                title: "Cuenta",
                loggedIn: req.session.loggedIn,
                userId: req.session.userId,
                user: req.session.user,
                error: null
            })
        } else {
            res.redirect('/error')
        }
    } catch(e){
        console.log(e)
        res.redirect('/error')
    }
},
ingreso: (req,res) => {
    try{
        if(!req.session.loggedIn){
            res.render('ingreso', {
                title: "Cuenta",
                loggedIn: req.session.loggedIn,
                userId: req.session.userId,
                user: req.session.user,
                error: null
            })
        } else {
            res.redirect('/error')
        }
    } catch(e){
        console.log(e)
        res.redirect('/error')
    }
},
amigos: async (req,res) => {
    try{
    const amigos = await Amigo.find()
    res.render('amigos' , {
        title: "Adoptar",
        amigos,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        user: req.session.user,
        error: null
    })
    }catch(e){
    console.log(e)
    res.redirect('/error')
}
},

error: (req,res) => {
    try{
        res.render('error', {
            title: "ERROR",
            loggedIn: req.session.loggedIn,
            user: req.session.user,
            error: null
        })
    }catch(e){
        console.log(e)
    }
    },
    publicar: (req,res) => {
    try{
        if(req.session.loggedIn ){
            res.render('publicar', {
                title: "Publicar",
                editar : false,
                loggedIn: req.session.loggedIn,
                userId: req.session.userId,
                user: req.session.user,
                error: null
            })
        }else {
            res.redirect('/error')
        }
    }catch(e){
        console.log(e)
        res.redirect('/error')
    }
},
    publicarAmigo: async (req,res) => {
    const {nombre , email, url, ubicacion, descripcion , _id, userId} = req.body
    var newAmigo;
    if(! _id){
        newAmigo = new Amigo ({
            nombre ,
            email, 
            url, 
            ubicacion, 
            descripcion,
            userId
    })
    } else {
        newAmigo = await Amigo.findOne({_id})
        newAmigo.nombre = nombre,
        newAmigo.email = email,
        newAmigo.url = url,
        newAmigo.ubicacion = ubicacion,
        newAmigo.descripcion = descripcion
    }
        try{
            await newAmigo.save()
            res.redirect('/amigos')
        }catch{
            console.log(e)
            res.redirect('/error')
        }
    },
    borrarAmigo: async(req, res) => {
        try{
            await  Amigo.findOneAndDelete({_id : req.params._id})
            res.redirect('/amigos')
        }catch(e){
            console.log(e)
            res.redirect('/error')
        }
    },
    editarAmigo: async(req, res) => {
    try{
        let amigo = await Amigo.findOne({_id: req.params._id})
        res.render('publicar', {
            title: "Editar - Publicar",
            editar : amigo,
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
            user: req.session.user,
            error: null
        })
    } catch(e){
        console.log(e)
        res.redirect('/error')
    }
    },
}


module.exports = amigosControllers