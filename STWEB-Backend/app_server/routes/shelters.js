var express = require('express');
var shelterController = require('../controllers/shelterController');
var router = express.Router();

router.get('/', shelterController.getShelters);
router.get('/get/:id', shelterController.getShelter);
router.get('/search', shelterController.searchShelters);
router.post('/add', shelterController.addShelter);

module.exports = router;