const express = require('express')
const app = express()
const port = 3000
const sequelizeDB = require("./database.js");
const Utstyr = require("./models/Utstyr");
Utstyr.init(sequelizeDB);
Utstyr.sync({force: true});


app.use(express.static('public'))

app.get('/i', async (req, res) => {
  
  let kul = Math.floor(Math.random() * 2);
  if (kul == 1) {
    kul = true;
  } else {
    kul = false;
  }
  Utstyr.create({
    name: "Sykkel",
    kul: kul
  });
  res.send(await Utstyr.findOne({where: {name : "Sykkel"}, order: [ [ 'id', 'DESC' ]]}))
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
