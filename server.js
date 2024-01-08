const express = require('express')
const app = express()
const port = 3000
const sequelizeDB = require("./database.js");
const Utstyr = require("./models/Utstyr");
Utstyr.init(sequelizeDB);
Utstyr.sync({force: true});

app.use(express.json());
app.use(express.static('public'))

app.post('/i', async (req, res) => {
  console.log(req);
  Utstyr.create({
    name: req.body.name,
    hylle: req.body.hylle,
    rad: req.body.rad
  });
  res.send(await Utstyr.findOne({where: {name : req.body.name}, order: [ [ 'id', 'DESC' ]]}))
})
 
app.get('/test', async (req, res) => {
  let slettet = await Utstyr.findAll({where: {name : "Sykkel"}});
  await Utstyr.destroy({
    where: {
      name: "Sykkel"
    },
  });
  
  res.send(slettet)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
