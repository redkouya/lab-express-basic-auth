const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRouter=require("./auth.routes")
router.use("/auth",authRouter)


const privateRouter=require("./private.routes")
router.use("/private",privateRouter)

module.exports = router;
