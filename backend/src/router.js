const express = require('express');

//
const { demoCall } = require('./controllers/demoController');
const { signin } = require('./controllers/accountController');

const router = express.Router();

// demo
router.route('/demoCall').post(demoCall);
router.route('/signin').post(signin);

module.exports = router;
