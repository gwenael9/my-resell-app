const express = require('express');
const cors = require('cors');

const initializeDatabase = require('./myDB');
const setupRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:8080'
}));

const db = initializeDatabase();
setupRoutes(app, db);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
