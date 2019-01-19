const http = require('http'),
      path = require('path'),
      express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      MongoClient = require('mongodb').MongoClient,
      mongoose = require('mongoose'),
      RUsuarios = require('./rutasUsuarios.js'),
      REvents = require('./rutasEventos.js');

const PORT = 8082;
const app = express();

const Server = http.createServer(app);

app.use(session({ secret: 'secret-pass', cookie: { maxAge: 3600000 }, resave: false, saveUninitialized: true }));

mongoose.connect('mongodb://localhost/calendario', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('client'));
app.use('/', RUsuarios);
app.use('/events', REvents);


Server.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
});
