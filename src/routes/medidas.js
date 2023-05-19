var express = require("express")
var router = express.Router()

var medidaController = require('../controllers/medidaController');

router.post('/selectEntradasPorHorario', function (req, res) {
    medidaController.selectEntradasPorHorario(req, res)
})
router.post('/selectEntradasUltimosQuatroDias', function (req, res) {
    medidaController.selectUltimosQuatroDias(req, res)
})

module.exports = router