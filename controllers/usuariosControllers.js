const User = require("../models/User");
const bcryptjs = require("bcryptjs");



userControllers = {
registrar: async (req, res) => {
    const { username, email, password } = req.body;
    let hashedPass = bcryptjs.hashSync(password);
    const newUser = new User({
        username,
        email,
        password : hashedPass,
    });

    try {
        let userExist = await User.findOne({username : username});
        if (userExist) throw new Error("El usuario ya está en uso!");
        await newUser.save()
        res.redirect('/ingresar')
    } catch (e) {
        res.render('registro',{
            title: "Ingresar-Cuenta",
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
            user: req.session.user,
            error: e.message 
        });
    }
},

ingresar: async (req, res) => {
const { username, password } = req.body;
try {
        let userExist = await User.findOne({ username: username })
        if (!userExist) throw new Error("Usuario y/o contraseña incorrecta!");
        let passMatch = bcryptjs.compareSync(password, userExist.password);
        if (!passMatch) throw new Error("Usuario y/o contraseña incorrecta!")
        req.session.loggedIn = true
        req.session.userId= userExist._id,
        req.session.user= username
        res.redirect('/')
    } catch (e) {
        res.render('ingreso',{
            title: "Ingresar-Cuenta",
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
            user: req.session.user,
            error: e.message 
        });
}
},
salir: (req, res) => {
    try{
        req.session.destroy(()=>{
            res.redirect('/')
        })
    }catch(e){
        console.log(e)
    }
}
},


module.exports = userControllers