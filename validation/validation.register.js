const {check} = require("express-validator");
module.exports = [
    check("name").matches(/[A-Z][a-z]*/),
    check("email").isEmail(),
    check("password").matches(/^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/).withMessage("must contain at least one number , one character and one string"),
    check("PasswordConfirmation").custom((value , {req}) => {
        if(value !== req.body.password)
        {
            return false;
        }
        return true;
    })
]