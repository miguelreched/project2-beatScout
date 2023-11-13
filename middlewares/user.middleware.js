//middleware =>  función  para loggeados

function isUserLogged (req,res,next) {

    if(req.session.user === undefined){

        res.redirect("/home")


    } else{

        next()
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






module.exports = isUserLogged