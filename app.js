const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
let session = require("express-session");
let MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const port = 3000;
const app = express();
app.use(express.static(path.join(__dirname , 'public')));
app.set('view engine', 'ejs');
let store = new MongoDBStore({
    uri : 'mongodb://localhost:27017/sarahahDB',
    collection : 'mySessions'
})
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true,
    store
}))
app.use(flash());
app.use(express.urlencoded({extended:false}));
app.use(require("./routes/index.routes"));
app.use(require("./routes/login.routes"));
app.use(require("./routes/register.routes"));
app.use(require("./routes/user.routes"));
app.use(require("./routes/messages.routes"));
mongoose.connect('mongodb://localhost:27017/sarahahDB' , {useNewUrlParser : true , useUnifiedTopology : true});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});