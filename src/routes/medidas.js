var express = require("express")
var router = express.Router()

var medidaController = require('../controllers/medidaController');

router.post('/select', function (req, res) {
    medidaController.fazerSelect(req, res)
})

module.exports = router