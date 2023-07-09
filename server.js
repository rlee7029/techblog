const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const moment = require('moment');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
const port = 9000;

app.set('port', port);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: 'user_sid',
    secret: 'somesecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.engine(
  'hbs',
  hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: path.join(__dirname, '/views/layouts'),
  helpers: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    },
  },
})
);
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

const sessionChecker = require('./middlewares/sessionChecker');

app.get('/', sessionChecker, (req, res) => {
  res.redirect('/home');
});

const signupController = require('./controllers/signupController');
const loginController = require('./controllers/loginController');
const homeController = require('./controllers/homeController');
const logoutController = require('./controllers/logoutController');
const dashboardController = require('./controllers/dashboardController');
const articleRoutes = require('./routes/articles');
const commentRoutes = require('./routes/comments');

app.use((req, res, next) => {
  if (req.path !== '/login' && req.path !== '/logout') {
    console.log('req.path', req.path);
    console.log('req.originalUrl', req.originalUrl);
    //req.session.previousUrl = req.originalUrl; // Store the previous URL in session
    req.session.previousUrl=req.path;
  }
  next();
});

app.use('/signup', signupController);
app.use('/login', loginController);
app.use('/home', homeController);
app.use('/logout', logoutController);
app.use('/dashboard', dashboardController);
app.use('/articles', articleRoutes);
app.use('/comments', commentRoutes);

app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

app.listen(port, () => console.log(`App started on port ${port}`));
