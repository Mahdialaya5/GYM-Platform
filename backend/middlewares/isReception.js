const isReception = (req, res, next) => {
    if (req.user.role == "reception") {
        next()
        return;
    }
    res.status(401).send({msg: "access denied"})
}

module.exports=isReception