require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { login } = require('./controllers/loginController');

const app = express();

const corsOptions = {
  origin: 'https://deaf9d8a91ca.ngrok-free.app',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
};
app.use(cors(corsOptions));
app.use(express.json());

app.post('/login', login);

const PORT = 5030;
app.listen(PORT, () => {
  console.log(`auth-login running on port 5030`);
});
