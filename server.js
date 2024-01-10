const express = require('express')
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express()
const port = 3000
const sequelizeDB = require("./database.js");
const { json } = require('sequelize');

const Utstyr = require("./models/Utstyr");
Utstyr.init(sequelizeDB);
Utstyr.sync();

const Users = require("./models/Users");
Users.init(sequelizeDB);
Users.sync();

const Elever = require("./models/Elever");
Elever.init(sequelizeDB);
Elever.sync();

const Lærere = require("./models/Lærere");
Lærere.init(sequelizeDB);
Lærere.sync();
//{force: true} hvis jeg trenger det

app.use(express.json());
app.use(express.static('public'))
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'min hemmelige kode',
  cookie: {maxAge: 1000 * 60 * 5},
  rolling: true
}));

app.get('/login/:username/:password', async (req, res) => {
  if (await Users.findOne({where: {name : req.params.username}}) != null) {
    let user = await Users.findOne({where: {name : req.params.username}})
    if (await bcrypt.compare(req.params.password, user.password)) {
      req.session.user = user;
      res.send({user: user, login: true});
    } else {
      res.send({user: user, login: false});
    }
  } else {
    res.send({user: null, login: false});
  }
})

app.get('/session', (req, res) => {
  res.send(req.session);
})

app.get('/addUser/:username/:password', async (req, res) => {
  if (req.session.hasOwnProperty("user")) {
    if (await Users.findOne({where: {name : req.params.username}}) == null) {
      Users.create({
        name: req.params.username,
        password: await bcrypt.hash(req.params.password, 10)
      });
      res.send({login: true});
    } else {
      res.send({login: true, exists: true});
    }
  } else {
    res.send({login: false});
  }
})

app.get('/addStudent/:username', async (req, res) => {
  if (req.session.hasOwnProperty("user")) {
    Elever.create({
      name: req.params.username,
    });
    res.send({login: true});
  } else {
    res.send({login: false});
  }
})

app.get('/addTeacher/:username', async (req, res) => {
  if (req.session.hasOwnProperty("user")) {
    Lærere.create({
      name: req.params.username
    });
    res.send({login: true});
  } else {
    res.send({login: false});
  }
})

app.get('/allStudents', async (req, res) => {
  res.send(await Elever.findAll());
})

app.get('/allTeachers', async (req, res) => {
  res.send(await Lærere.findAll());
})

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

app.get('/modify/:id/:field/:value', async (req, res) => {
  await Utstyr.update({[req.params.field]: req.params.value}, {where: {id : req.params.id}})
  res.send("OK")
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
