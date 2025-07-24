require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { hashPasswordEndpoint } = require('./controllers/hashController');

const app = express();

const corsOptions = {
  origin: 'http://54.166.75.139:5020',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
};
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());

app.post('/hash-password', hashPasswordEndpoint);

const PORT = 5031;

app.get('/', (req, res) => {
  res.send('Auth Hash Service is running');
});

app.listen(PORT, () => {
  console.log(`auth-hash running on port 5031`);
});
