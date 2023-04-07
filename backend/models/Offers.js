const mongoose = require('mongoose')
const offerSchema = new mongoose.Schema({
    specialty:{type:String,require:true},
    price:{type: Number,require:true},
    planing:{type:String,require:true},
    logo:{type:String},
     })
const Offer = mongoose.model("offer", offerSchema)
module.exports = Offer