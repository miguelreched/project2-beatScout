//middleware =>  función  para loggeados

function isUserLogged (req,res,next) {

    if(req.session.user === undefined){

        res.redirect("/home")


    } else{

        next()
    }

}

function isAdmin(req, res, next) {
    if(req.session.user.role === "admin"){
        next() //dale que eres admin
    } else {
        res.redirect("/home")
    }
}




function updateLocals(req, res, next) {

    if (req.session.user === undefined){

        res.locals.isSessionActive = false //variable accesible en handlebars

    } else {

        res.locals.isSessionActive = true
    }
    next()// continua normalmente con las rutas




}





module.exports = {isUserLogged, isAdmin,updateLocals}