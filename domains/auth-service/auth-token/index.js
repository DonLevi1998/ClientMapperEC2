require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { me } = require('./controllers/tokenController');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/me', me);

const PORT = process.env.PORT || 5033;
app.listen(PORT, () => {
  console.log(`auth-token running on port ${PORT}`);
});
