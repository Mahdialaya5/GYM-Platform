const express = require('express');
const connectdb = require('./config/connect');
const path = require('path');
const app = express();
const port= process.env.PORT || 5000;

require('dotenv').config({ path: '../.env' }); 

connectdb();

const cors = require('cors');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://gym-platform.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
//app.use(cors(corsOptions));
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
