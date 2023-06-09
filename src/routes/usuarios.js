var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/cadastrarFuncionario", function(req, res) {
    usuarioController.cadastrarFuncionario(req, res);
});

router.put('/atualizarCargo', function(req, res) {
  usuarioController.atualizarCargo(req, res)
})

router.get("/selecionarFuncionarios/:fkEstabelecimento", (req,res)=>{
    usuarioController.selecionarFuncionarios(req,res)
})

router.delete("/excluirFuncionarios/:idUsuario",(req,res)=>{
    usuarioController.excluirFuncionarios(req,res)
})
module.exports = router;