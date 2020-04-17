let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
const passport = require('passport')
let logger = require('morgan');
let expressLayouts = require('express-ejs-layouts');
let session = require('express-session');
let MySQLStore = require('express-mysql-session')(session);
let AdminRouter = require('./routes/admin/index');
let ClientRouter = require('./routes/client/client.index');
let methodOverride = require('method-override');
let flash = require('connect-flash');

require('dotenv').config()

let app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//sessions
let options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};
let sessionStore = new MySQLStore(options);
app.use(session({
  key: process.env.SESSION_KEY,
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000 }}))
// 

app.use('/', AdminRouter);
app.use('/', ClientRouter);
app.set('layout', 'index');

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
