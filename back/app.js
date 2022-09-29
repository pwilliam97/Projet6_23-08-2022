ACCESS_TOKEN_SECRET = 'S9DqM=bSA6u%YWNy'

//importation app express 
const express = require ('express');
const path = require('path');
const app = express ();

app.use(express.json());

//Importation app Mongoose 
const mongoose = require('mongoose');

const Sauce = require('./models/sauces');

//On enregistre le routeur dans l'application on l'importe
const userRoutes = require ('./routes/user')
const sauceRoutes = require ('./routes/sauce')

// Lien avec la Database MongoDB
mongoose.connect(
  'mongodb+srv://Piquante_p6:Piquante152468379@cluster0.kubrrgq.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Création des headers pour les CORS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/api/sauces', sauceRoutes);
  app.use ('/api/auth', userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
