var express = require("express");
var router = express.Router();

var estabelecimentoController = require("../controllers/estabelecimentoController");

router.get("/", function (req, res) {
    estabelecimentoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    estabelecimentoController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de estabelecimentoController.js
router.post("/cadastrar", function (req, res) {
    estabelecimentoController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    estabelecimentoController.entrar(req, res);
});

router.post('/qtdUsuarios', function (req, res) {
  estabelecimentoController.qtdUsuarios(req, res);
})

module.exports = router;