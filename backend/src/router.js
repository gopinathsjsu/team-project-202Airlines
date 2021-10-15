const express = require('express');

//
const { demoCall } = require('./controllers/demoController');

const router = express.Router();

// demo
router.route('/demoCall').post(demoCall);

module.exports = router;
