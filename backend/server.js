const express = require('express')
const connectdb = require('./config/connect')
const app = express()
const port = 5000
require("dotenv").config()
connectdb()
const cors = require("cors");
const corsOptions = {
   origin: '*',
   credentials: true,
   optionSuccessStatus: 200,
}
app.use("/uploads",express.static(__dirname+"/uploads"))
app.use(cors(corsOptions))
app.use(express.json())

//routes
app.use("/api/offer", require("./routes/offerRoutes"))
app.use("/api/user", require("./routes/userRoutes"))


app.listen(port, (err) => err ? console.log(err) : console.log(`app listening on port ${port}!`))