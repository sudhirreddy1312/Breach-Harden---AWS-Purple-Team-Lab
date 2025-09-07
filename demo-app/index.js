const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', (req, res) => res.send('hello from supplychain sentinel'));

app.listen(3000, () => console.log('listening on port 3000'));
