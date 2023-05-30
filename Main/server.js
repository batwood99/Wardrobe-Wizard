const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const apiRoutes = require('./controllers/apiRoutes');
const homeRoutes = require('./controllers/homeRoutes');
const userRoutes = require('./controllers/api/userRoutes');
const wardrobeRoutes = require('./controllers/wardrobeRoutes');
const helpers = require('./utils/helpers');
const { Clothing } = require('./models');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  helpers,
  extname: '.handlebars', // Set the file extension for Handlebars templates
  layoutsDir: path.join(__dirname, 'views'), // Set the layouts directory to 'Main/views'
  partialsDir: path.join(__dirname, 'views', 'partials'), // Set the partials directory to 'Main/views/partials'
  defaultLayout: 'index' // Specify the default layout file as 'index.handlebars'
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

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoutes); // Use the routes defined in the 'homeRoutes' module
app.use('/api', apiRoutes); // Use the routes defined in the 'apiRoutes' module
app.use('/api/users', userRoutes); // Use the routes defined in the 'userRoutes' module
app.use('/wardrobe', wardrobeRoutes); // Use the wardrobe routes defined in the 'wardrobeRoutes' module
app.use(routes); // Use the routes defined in the 'controllers' module

// Set the default route to render index.handlebars
app.get('/', (req, res) => {
  res.render('index', { title: 'Wardrobe Wizard' }); // Pass the 'title' value to index.handlebars
});

// Handle the '/reset-timer' endpoint
app.post('/reset-timer', async (req, res) => {
  try {
    // Reset the 'last_worn' field to the current date/time for all clothing items
    await Clothing.update({ last_worn: new Date() }, { where: {} });

    // Redirect the user back to the landing page
    res.redirect('/landing');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port', PORT));
});
