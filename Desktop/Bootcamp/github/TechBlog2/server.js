const express = require('express');
const app = express();
const router = require('./routes');
const sequelize = require('./db/connection.js');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(express.static(path.join(__dirname + '/public')));

const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    })
  };

app.use(session(sess));
  
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(router);

sequelize.sync({ force: false }).then(app.listen(PORT, () => {
    console.log('listening on: ', PORT);
}));