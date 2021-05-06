const app = require("express").Router();
const bcrypt = require("bcrypt");
const validator = require("../validation/validation.register");
const {validationResult} = require("express-validator");
const userModel = require("../models/user.model");
app.get('/register', (req, res) => {
    res.render("register" , {isLoggedIn : req.session.isLoggedIn , errors : req.flash("errors") , oldInputs : req.flash("oldInputs")});
});
app.post('/handleRegister', validator ,async(req, res) => {
    let errors = validationResult(req);
    const {name , email , password} = req.body;
    if(errors.isEmpty() == true)
    {
        bcrypt.hash(password , 7 , async function(err,hashedPassword){
            await userModel.insertMany({name , email , password:hashedPassword})
            res.redirect("/login")
        })
    } else {
        req.flash('errors' , errors.array())
        req.flash('oldInputs' , {name , email , password})
        res.redirect("/register")
    }
});
module.exports = app;