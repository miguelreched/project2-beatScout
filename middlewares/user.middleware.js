//middleware =>  función  para loggeados

function isUserLogged (req,res,next) {

    if(req.session.user === undefined){

        res.redirect("/")


    } else{

        next()
    }



}

module.exports = isUserLogged