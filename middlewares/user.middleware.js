

function isOn (req,res,next) {

if (req.sessionuser === undefined) {

res.redirect("/")


} else{

    next()
}
}

function moderator(req,res,next ){


if(req.session.role === "moderator") {

 next()

}else {

    res.redirect("/")
}

}
module.exports ={

    isOn,
    moderator

}