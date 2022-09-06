//importation app express 
const express = require ('express');

const app = express ();

app.use(express.json());

//Importation app Mongoose 
const mongoose = require('mongoose');

const Thing = require('./models/thing');

//On enregistre le routeur dans l'application on l'importe
const userRoutes = require ('./routes/user')

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

  app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing ({
      ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({message : 'objet enregistré !'}))
    .catch(error => res.status(400).json({error}));
  });

  app.get('/api/sauces', (req, res, next) => {
    const sauces = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(sauces);
  });


  app.use ('/api/sauces', stuffRoutes);
  app.use ('/api/auth', userRoutes);

module.exports = app;
