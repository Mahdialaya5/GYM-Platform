const express = require('express')
const connectdb = require('./backend/config/connect')
const app = express()
const port = 5000
const __dirname = path.resolve();
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
app.use("/api/offer", require("./backend/routes/offerRoutes"))
app.use("/api/user", require("./backend/routes/userRoutes"))


app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, (err) => err ? console.log(err) : console.log(`app listening on port ${port}!`))