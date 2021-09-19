const joi = require("joi");

const validador = (req, res, next) => {
    const schema = joi.object({
    username: joi
    .string()
    .trim()
    .min(2)
    .max(15)
    .required()
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
        "string.min": "El usuario debe contener al menos 2 caracteres!",
        "string.empty": "Ningún campo puede estar vacío!",
        'string.pattern.base': "El usuario no puede contener números!"
    }),
    email: joi
    .string()
    .required()
    .trim()
    .email()
    .messages({
        "string.email": "Por favor ingresa un  email correcto!",
        "string.empty": "Ningún campo puede estar vacío!",
        
    }),  
    password: joi
    .string()
    .trim()
    .required()
    .min(4)
    .messages({
        "string.min": "La clave debe contener al menos 4 caracteres!",
        "string.empty": "Ningún campo puede estar vacío!"
    }),
});
    const validation = schema.validate(req.body, { abortEarly: false });
    if (!validation.error) {
    next();
    } else {
    res.render('registro',{
        title: "Cuenta",
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        user: req.session.user,
        error: validation.error.details[0].message
    });
}
};

module.exports = validador;

