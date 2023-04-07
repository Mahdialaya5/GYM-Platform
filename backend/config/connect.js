const mongoose = require('mongoose')
const connectdb=async()=>{
   try { mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.Uri)
    console.log("db connect");
   } catch (error) {
    console.log(error)
    
   }
}
module.exports=connectdb