const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const { createLogger, format, transports } = require("winston");

var port = process.env.PORT; // 2. Using process.env.PORT


app.use(express.static(path.join(__dirname, 'angular')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongodb atlas url
const url = "mongodb+srv://god:Xacdw2z2H8OGR9D9@mycinema-a1olt.mongodb.net/digitalShul?retryWrites=true";


//for local host url
//const url = "mongodb://localhost:27017/digitalShul";

//mongoose setting and connection
mongoose.set('useNewUrlParser', true); 
mongoose.set('useUnifiedTopology', true);

const mongoDB = mongoose.connect(url);
mongoDB.then(() => {
    console.log('Connected to DB');
    }).catch((err) => {
    console.log('err', err);
});

// allow CORS
//for us to be able to work with angular local envierment 
app.use(function (req, res, next) {
    //res.header("Access-Control-Allow-Origin", "http://mycinema.us.openode.io");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: 'digitalShul' },
    transports: [
      new transports.File({ filename: 'app-error.log', level: 'error' }),
      new transports.File({ filename: 'app-combined.log' })
    ]
  });
  
  logger.log({
    level: 'info',
    message: 'Pass an object and this works'
  });

//Routes
const synagoguesRouter = require('./routes/synagogues.js');
app.use('/api/synagogues', synagoguesRouter);

const usersRouter = require('./routes/users.js');
app.use('/api/users', usersRouter);

const membersRouter = require('./routes/members.js');
app.use('/api/members', membersRouter);

const  invoicesRouter = require('./routes/invoices.js');
app.use('/api/invoices', invoicesRouter);

//ANGULAR
app.use('/',(req,res,next) => {
    res.sendFile("index.html", { root: path.join(__dirname, 'angular') })
});
app.use('*',(req,res,next) => {
    res.redirect('/');
});


app.listen(port || 3000);