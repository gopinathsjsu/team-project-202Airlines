const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const router = require('./src/router');
const db = require('./src/utils/dbConnector');
const { CONFIG } = require('./configuration');

const app = express();
app.use(
  session({
    key: '202Airlines',
    secret: 'groupProject',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
    },
  })
);

app.use(
  cors({
    origin: CONFIG.FRONTEND, // add to constants file or configuration file.
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

if (!module.parent) {
  app.listen(CONFIG.BACKEND_PORT, () => {
    console.log('running server');
  });
}

module.exports = app;
