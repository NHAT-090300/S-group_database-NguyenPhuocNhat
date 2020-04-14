var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
require('dotenv').config()
var options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  };
var sessionStore = new MySQLStore(options);
    app.use(session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000 }}));
const sessionModules = session(sessionConfig);
module.exports = {
    sessionModules,
};
  
