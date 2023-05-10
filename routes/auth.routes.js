const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model.js");

//* GET "/auth/signup" => formulario de creación de usuario
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

//* POST "/auth/signup" => recibe datos de formulario de creacion de usuarios
router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({
      username,
      password:hashPassword,
    });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

//* GET "/auth/login" => formulario de acceso guardado de sesion
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

//* POST "/auth/login" =>  recibe formulario de datos de login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const foundUser = await User.findOne({ username });


    const isPasswordCorrect= await bcrypt.compare(password,foundUser.password)
    if(isPasswordCorrect===false)
    {
        res.render("auth/login",{errorMessage:"Contraseña incorrecta"})
        return
    }

    req.session.user=foundUser
    req.session.save(()=>{
        res.redirect("/private/profile")
    })
  } catch (err) {
    next(err);
  }
});

module.exports = router;
