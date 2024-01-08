const express = require('express')
const app = express()
const port = 3000
const sequelizeDB = require("./database.js");
const Utstyr = require("./models/Utstyr");
Utstyr.init(sequelizeDB);
Utstyr.sync();
//{force: true} hvis jeg trenger det

app.use(express.json());
app.use(express.static('public'))

app.post('/add', async (req, res) => {
  Utstyr.create({
    name: req.body.name,
    hylle: req.body.hylle,
    rad: req.body.rad
  });
  res.send(await Utstyr.findOne({where: {name : req.body.name}, order: [ [ 'id', 'DESC' ]]}))
})

app.get('/get/:id', async (req, res) => {
  res.send(await Utstyr.findOne({where: {id : req.params.id}}))
})

app.get('/delete/:id', async (req, res) => {
  await Utstyr.destroy({where: {id : req.params.id}})
  res.send("OK")
})
 
app.get('/all', async (req, res) => {
  let all = await Utstyr.findAll();
  res.send(all)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
