require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());
//remove API key later
const apiKey = process.env['API_KEY'];
const baseUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25`
app.get('/', async (req, res) => {
  try {
    let response
    if (req.query.chart) {
      response = await axios.get(`${baseUrl}&chart=${req.query.chart}&regionCode=${req.query.regionCode}&key=${apiKey}`);
    } else if (req.query.q) {
      response = await axios.get(`${baseUrl}&q=${req.query.q}&key=${apiKey}`);
    }
    res.status(200).send(response.data)
  } catch (e) {
    console.log(e.message)
  }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
