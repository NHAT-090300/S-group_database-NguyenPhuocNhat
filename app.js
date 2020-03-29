var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const passport = require('passport')
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var indexRouter = require('./routes/index');
var methodOverride = require('method-override')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
//sessions
var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'db'
};
var sessionStore = new MySQLStore(options);
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
app.use(session({ secret: 'session_cookie_secret', cookie: { maxAge: 60000 }}))
app.use('/', indexRouter);
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
