const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// const routes = require('./controllers');
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

// Import routes
// const apiRoutes = require('./controllers/apiRoutes');
// const userRoutes = require('./controllers/api/userRoutes');
// const homeRoutes = require('./controllers/homeRoutes');
// const wardrobeRoutes = require('./controllers/wardrobeRoutes');

// // Use routes
// app.use(routes);


app.get('/', (req, res) => {
  res.render('login', { title: 'Wardrobe Wizard' });
});

// Reset timer route
app.post('/reset-timer', async (req, res) => {
  try {
    await Clothing.update({ last_worn: new Date() }, { where: {} });
    res.redirect('/landing');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get('/wardrobe/add', (req, res) => {
  res.render('add-clothing');
});

app.post('/wardrobe/create', async (req, res) => {
  try {
    const { name, last_worn } = req.body;
    await Clothing.create({ name, last_worn });
    res.redirect('/wardrobe');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port', PORT));
});
