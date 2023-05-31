var express = require("express")
var router = express.Router()

var medidaController = require('../controllers/medidaController');

router.post('/selectEntradasPorHorario', function (req, res) {
    medidaController.selectEntradasPorHorario(req, res)
})
router.post('/selectEntradasUltimosQuatroDias', function (req, res) {
    medidaController.selectUltimosQuatroDias(req, res)
})

router.get('/selectKpis', function(req, res) {
    medidaController.selectKpis(req, res)
})

router.get('/alertas/:idEstabelecimento', function(req, res) {
  medidaController.alertas(req, res)
})

router.get('/ultimo-alerta/:idEstabelecimento', function(req, res) {
  medidaController.ultimoAlerta(req, res)
})

router.post('/inserir-alerta', function(req, res) {
  medidaController.inserirAlerta(req, res)
})

module.exports = router