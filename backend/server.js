const express = require('express');
const connectdb = require('./config/connect');
const path = require('path');
const app = express();
const port= process.env.PORT || 5000;

require('dotenv').config(); 
connectdb();

//const cors = require('cors');


app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
//app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
// Routes
app.use('/api/offer', require('./routes/offerRoutes'));
app.use('/api/user', require('./routes/userRoutes'));


// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.listen(port, (err) => {
  if (err) {
    console.error(`Error: ${err}`);
  } else {
    console.log(`App listening on port ${port}!`);
  }
});
