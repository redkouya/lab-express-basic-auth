const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model.js");


//* GET "/private/profile/" => redirige si esta sesion activa
const {isLoggedIn}=require("../middlewares/auth.middlewares")
router.get("/profile",isLoggedIn,(req,res,next)=>{
    res.render("private/profile")
})

//*GET "/private/main" => acceso sesion activa a gatito
router.get("/main",isLoggedIn,(req,res,next)=>{
    res.render("private/others")
})
module.exports=router