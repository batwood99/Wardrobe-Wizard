const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const { Clothing } = require('./models');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  extname: '.handlebars',
});

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('login', { title: 'Wardrobe Wizard' });
});

// Include wardrobeRoutes
const wardrobeRoutes = require('./controllers/wardrobeRoutes');
app.use('/wardrobe', wardrobeRoutes);

// Include landingRoutes
const landingRoutes = require('./controllers/landingRoutes');
app.use('/landing', landingRoutes);

// Add route to handle adding a clothing item
app.post('/api/clothing', (req, res) => {
  Clothing.create({
    type: req.body.type,
    color: req.body.color,
    description: req.body.description,
    user_id: req.session.user_id // Assuming you have the user ID stored in the session
  })
    .then((newClothing) => {
      res.status(200).json(newClothing);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port', PORT));
});
