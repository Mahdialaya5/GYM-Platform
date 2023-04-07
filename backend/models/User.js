const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    specialty :{ type: String,default:"musculation"},
    imgsrc:{type:String},
    inscription:{ type: Date,default: Date.now },
    subscribe:{ type: Date,default: Date.now },
    subscribeDeadline:{ type: Date,default: function() {
        let deadline = new Date(this.subscribe);
        deadline.setDate(deadline.getDate() + 30);
        return deadline;}},
    role: { type: String, enum: ["guest", "user", "admin", "reception"] ,default:"user"}
})
const User = mongoose.model("user", userSchema)
module.exports = User