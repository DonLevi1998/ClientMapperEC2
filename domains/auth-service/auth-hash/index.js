require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { hashPasswordEndpoint } = require('./controllers/hashController');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/hash-password', hashPasswordEndpoint);

const PORT = process.env.PORT || 5031;

app.get('/', (req, res) => {
  res.send('Auth Hash Service is running');
});

app.listen(PORT, () => {
  console.log(`auth-hash running on port ${PORT}`);
});
