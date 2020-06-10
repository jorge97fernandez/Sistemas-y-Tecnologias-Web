var express = require('express');
var userController = require('../controllers/userController');
var passport = require('passport');
var jwtinterface = require('../jsonwebtoken')
var router = express.Router();

router.get('/', userController.getUsers);
router.get('/count', userController.countUsers);
router.get('/get', userController.getUser);
router.get('/login', passport.authenticate('json'), (req,res) =>{
    var token = jwtinterface.signtoken(req.user);
    var responss = "Bearer " + token;
    res.json({"token": responss});
});
router.get('/search', userController.searchUsers);
router.post('/add', userController.addUser);
router.put('/update', userController.updateUser);

module.exports = router;
