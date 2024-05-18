const express = require("express")
const isAdmin = require("../middlewares/isAdmin")
const router = express.Router()
const Offer = require("../models/Offers")
const upload=require('../utils/multer')
const isAuth = require('../middlewares/isAuth')

//get all offers
router.get("/", async (req, res) => {
    try {
     
   const offers = await Offer.find()
        res.send(offers)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

//add new Offer
router.post("/",upload("offers").single("file"),isAuth(),isAdmin, async (req, res) => {
    try {
        const url = `${req.protocol}://${req.get("host")}/${req.file.path}`
        const newOffer = new Offer(req.body)
        newOffer.logo=url
        await newOffer.save()
        res.send({ msg: "Offer  add succes", offer: newOffer })
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

//get one offer
router.get("/:id",isAuth(),isAdmin, async (req, res) => {
    try {
     
   const oneOffer = await Offer.findById(req.params.id)
        res.send({offer:oneOffer})
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }})

//edit offer
router.put("/:id",upload("offers").single("file"),isAuth(),isAdmin, async (req, res) => {
    try {
         const result = await Offer.updateOne({ _id: req.params.id }, { ...req.body })
              offerUpdated = await  Offer.findOne({ _id: req.params.id })
             if(req.file)
             { const url = `${req.protocol}://${req.get("host")}/${req.file.path}`
               offerUpdated.logo =url
              await offerUpdated.save()
             }
         
         if (result.modifiedCount || req.file) {
            return res.send({ msg: "update suuccess", offer: offerUpdated });
          }
         res.status(400).send({ msg: " aleardy update " })
    }
     catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

//delete offer
router.delete("/:id", isAuth(),isAdmin,async (req, res) => {
    try {

        const result = await Offer.deleteOne({ _id: req.params.id })
        if (result.deletedCount) {
            return res.send({ msg: "delete  success" })
        } res.status(400).send({ msg: "aleardy delete" })
    } catch (error) {
        console.log(error)
       res.status(400).send(error.message)
    }})
module.exports = router