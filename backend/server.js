const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
