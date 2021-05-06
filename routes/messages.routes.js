const app = require("express").Router();
const messageModel = require("../models/message.model");
const auth = require("../middleware/auth");
app.get('/messages', auth , async(req, res) => {
    let messages = await messageModel.find({userID:req.session.userID})
    const fullURL = req.protocol+'://'+req.headers.host+'/user/'+req.session.userID;
    res.render("messages" , {messages , name : req.session.name , fullURL , isLoggedIn : req.session.isLoggedIn});
});
module.exports = app;