const express = require('express')
const app = express()
const port = 3000


app.use(express.static('public'))

app.get('/i', (req, res) => {
  Utstyr.create({
    navn: "Sykkel"
  });
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const sequelizeDB = require("./database.js");
const Utstyr = require("./models/Utstyr");
Utstyr.init(sequelizeDB);
Utstyr.sync(true);