function isLoggedIn(req,res,next)
{

    if(req.session.user===undefined)
    {
        //el usuario no tiene sesion activa
        res.redirect("/")
    }
    else{
        next() //continua con la ruta
    }

}

module.exports= {isLoggedIn}
