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



// function isUserRegistered (req,res, next) {

//     if (req.session.user === undefined) {

//         res.redirect("/home")
        
//     } else{

//         next()
//     }
// }


// function updateLocals (req,res,next) {

//     if (req.user.sesion.user)




// }






module.exports = isUserLogged, isAdmin