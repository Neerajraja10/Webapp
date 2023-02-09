var express = require('express');
var router = express.Router();
var user = require('../services/user');
var helper = require('../config/helper');
router.post('/', user.newUser);
router.get('/:id', helper.uAuthCheck, user.getUser);
router.put('/:id', helper.uAuthCheck, user.updateUser);
module.exports = router;