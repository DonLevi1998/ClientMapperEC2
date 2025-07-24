require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { login } = require('./controllers/loginController');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', login);

const PORT = 5030;
app.listen(PORT, () => {
  console.log(`auth-login running on port 5030`);
});
