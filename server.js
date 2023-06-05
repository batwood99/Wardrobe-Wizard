const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const { Clothing } = require('./models');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

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
    db: sequelize,
  }),
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

const userRoutes = require('./controllers/api/userRoutes');
app.use('/api/users', userRoutes);

// Include wardrobeRoutes
const wardrobeRoutes = require('./controllers/wardrobeRoutes');
app.use('/wardrobe', wardrobeRoutes);

// Include landingRoutes
const landingRoutes = require('./controllers/landingRoutes');
app.use('/landing', landingRoutes);

// Include clothingRoutes
const clothingRoutes = require('./controllers/api/clothingRoutes');
app.use('/api/clothing', clothingRoutes);

// Import the seed functions
const seedUsers = require('./seeds/userSeed');
const createClothing = require('./seeds/clothingSeed');

// Move the server startup code to a separate function
const startServer = async () => {
  try {
    // Sync the models with the database
    await sequelize.sync({ force: false });

    // Seed the user data
    await seedUsers();

    // Seed the clothing data
    await createClothing();

    // Start the server
    app.listen(PORT, () => console.log('Now listening on port', PORT));
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

// Call the startServer function to start the server and seed the data
startServer();
