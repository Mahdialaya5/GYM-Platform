const express = require('express');
const connectdb = require('./config/connect');
const path = require('path');
const app = express();
const port =  10000 ;

require('dotenv').config({ path: '../.env' }); 

connectdb();

const cors = require('cors');
const corsOptions = {
  origin: "https://gym-platform.onrender.com",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/offer', require('./routes/offerRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

app.use(express.static(path.join(__dirname, 'client'))); 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client','index.html')); 
});
   


app.listen(port, (err) => {
  if (err) {
    console.error(`Error: ${err}`);
  } else {
    console.log(`App listening on port ${port}!`);
  }
});
