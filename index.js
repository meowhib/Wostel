const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

const port = 3001;

//Connect to mongodb
mongoose.connect("mongodb://localhost:27017/wostel", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Models
const Client = require('./models/Client');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Create uploads folder if it doesn't exist
if (!fs.existsSync('./public/uploads/')) {
  fs.mkdirSync('./public/uploads/');
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/', async (req, res) => {
  const clients = await Client.find({});

  res.render("index.ejs", { clients })
});

app.get('/add-client', (req, res) => {
  res.render('form.ejs');
});

app.get('/edit-client/:id', async (req, res) => {
  const client = await Client.findById(req.params.id);

  console.log(client);

  res.render('form-edit.ejs', { client });
});

app.post('/add-client', upload.single('passportPhoto'), async (req, res) => {
  const arrivalDate = new Date(req.body.arrivalDate);
  const departureDate = new Date(req.body.departureDate);
  const duration = (departureDate - arrivalDate) / (1000 * 3600 * 24);
  let passport = "";

  if (req.file){
    passport = req.file.passportPhoto;
    console.log("File uploaded successfully.")
  } else {
    console.log("No file uploaded.")
  }

  const newClient = new Client({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    country: req.body.country,
    reservation: req.body.reservation,
    arrival: req.body.arrivalDate,
    departure: req.body.departureDate,
    price: req.body.price,
    accommodation: req.body.accommodation,
    breakfast: req.body.breakfast,
    activities: req.body.activities,
    passport: passport,
    duration: duration,
    passportNumber: req.body.passportNumber,
    dateOfBirth: req.body.dateOfBirth,
    activities: req.body.activities.trim(),
  });

  await newClient.save()
  .then(() => {
    console.log("Client added");
  })
  .catch(err => {
    console.log(err);
  });

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});