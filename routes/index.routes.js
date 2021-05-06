const app = require("express").Router();
app.get('/', (req, res) => {
    res.render("index" , {isLoggedIn : req.session.isLoggedIn});
});
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
});
module.exports = app;