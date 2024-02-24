const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const isReception = require('../middlewares/isReception')
const { registerCheck, loginCheck, validator } = require('../middlewares/validator')
const upload=require('../utils/multer')

//register new user
router.post("/register",upload("user").single("file"), registerCheck(), validator ,async (req, res) => {
    const { name,email, password, role } = req.body
    try {
        if (role) {
            return res.status(401).send({ msg: "not auth !!" })
        }
        
        const existName = await User.findOne({ email})
           if (existName) {
            return res.status(400).send({ msg:"email exist,please change email"})
        }
        const url = `${req.protocol}://${req.get("host")}/${req.file.path}`
        const newUser = new User(req.body)
           newUser.imgsrc=url
        const hashedPassword = await bcrypt.hash(password, 10)
          newUser.password = hashedPassword
            await newUser.save()
         
          const payload = { _id: newUser._id }
        const token = jwt.sign(payload, process.env.secretKey)
        res.send({ user: newUser, token })
    } catch (error) {
        console.log(error);
    }})

//login user 
router.post('/login', loginCheck(), validator, async (req, res) => {
    const { email, password } = req.body
    try {
        const existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(400).send({ msg: "bad credential !!" })
        }
        const isMatched = await bcrypt.compare(password, existUser.password)

        if (!isMatched) {
            return res.status(400).send({ msg: "bad credential !!" })
        }
        existUser.password = undefined
        const payload = { _id: existUser._id }
        const token = jwt.sign(payload, process.env.secretKey)
        res.send({ user: existUser, token })
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: error.message })
    }})

// get current user ==>private
router.get("/current", isAuth(), (req, res) => {
    res.send({ user: req.user });
})

//edituser
router.put("/:id",upload("user").single("file"),isAuth(), async (req, res) => {
    const {name} = req.body
    try {
        const existName = await User.findOne({ name })
           if (existName &&existName._id==!req.params.id) {
            return res.status(400).send({ msg:"name exist,please change user name"})
        }
           const result = await User.updateOne({ _id: req.params.id }, { ...req.body })
        const UserUpdated = await  User.findOne({ _id: req.params.id })
       
         if(req.file)
             { const url = `${req.protocol}://${req.get("host")}/${req.file.path}`
             UserUpdated.logo =url
              await UserUpdated.save()
                }
             console.log((result.modifiedCount) || (req.file));
         if ((result.modifiedCount) || (req.file)) {
            
            return res.send({ msg: "update suuccess", user: UserUpdated });
          }
        return res.status(400).send({ msg: " aleardy update " })
       
    }
     catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})
//pay online
router.put("/current/:id",  async(req, res) => {
    try{
       
    const result = await User.updateOne({ _id: req.params.id },{ ...req.body })
    const updatedUser = await User.findOne({ _id: req.params.id })

    if (result.modifiedCount) {
        let myDate = new Date(req.body.subscribe.slice(0,10));
        myDate.setDate(myDate.getDate() + 30);
        updatedUser.subscribeDeadline=myDate
        await updatedUser.save()
        return res.send({ msg: "update success", user: updatedUser });
      }
      else {
        return res.status(400).send("already updated")
      }
    }
  catch(error){
    console.log(error)
    res.status(400).send(error.message)
}})

//get All User  ==>protected
router.get("/admin", async (req, res) => {
    try {
        const users = await User.find().sort({name:1})
        res.send( users )
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: error.message });
    }})
   
router.get("/reception",isAuth(),isReception, async (req, res) => {
    try {
        const users = await User.find().sort({name:1})
        res.send( users )
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: error.message });
    }})
  
    //pay 
router.put("/reception/:id", isAuth(),isReception, async(req, res) => {
    try{
        console.log(req.body);
    const result = await User.updateOne({ _id: req.params.id },{ ...req.body })
    const updatedUser = await User.findOne({ _id: req.params.id })

    if (result.modifiedCount) {
        let myDate = new Date(req.body.subscribe.slice(0,10));
            myDate.setDate(myDate.getDate() + 30);
            updatedUser.subscribeDeadline=myDate
            await updatedUser.save()
        return res.send({ msg: "update success", user: updatedUser });
      }
      else {
        return res.status(400).send("already updated")
      }
    }
      catch(error){
        console.log(error)
        res.status(400).send(error.message)
    }})

    //delete user
router.delete("/reception/:id",isAuth(),isReception, async (req, res) => {
        try {
            const result = await User.deleteOne({ _id: req.params.id })
            if (result.deletedCount) {
                return res.send({ msg: "delete  success" })
            } res.status(400).send({ msg: "aleardy delete" })
        } catch (error) {
            console.log(error)
           res.status(400).send(error.message)
        }})

module.exports = router