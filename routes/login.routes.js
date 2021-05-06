const app = require("express").Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
app.get('/login', (req, res) => {
    res.render("login" , {isLoggedIn : req.session.isLoggedIn});
});
app.post('/handleLogin', async(req, res) => {
    const {email , password} = req.body;
    let user = await userModel.findOne({email});
    if(user == null)
    {
        res.redirect("/login")
    } else {
        let match = await bcrypt.compare(password , user.password);
        if(match)
        {
            req.session.userID = user._id;
            req.session.name = user.name;
            req.session.isLoggedIn = true;
            res.redirect("/messages")
        } else {
            res.redirect("/login")
        }
    }
});
module.exports = app;