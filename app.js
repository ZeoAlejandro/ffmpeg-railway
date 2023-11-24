// Modules
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const PORT = require('./config/serverConfig');

// .env
require('dotenv').config();

// Express app
const app = express();

// Cors
app.use(cors());

// Acces Control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

//Import Routes of API
const editRoutes = require('./src/routes/edit');

// Middlewares
app.use(express.json());
app.use(bodyParser.json())

// Log de las llamadas en el terminal
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes for API
app.use('/edit', editRoutes);

// Server ON
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
