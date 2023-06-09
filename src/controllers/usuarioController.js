var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  
      var id = req.body.idUsuarioServer
      var nome = req.body.nomeUsuarioServer     
      var sobrenome = req.body.sobrenomeUsuarioServer
      var email = req.body.emailServer           
      var senha = req.body.senhaServer
      var fkEstabelecimento = req.body.fkEstabelecimentoServer;

    // Faça as validações dos valores
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(id, nome,sobrenome, email, senha, fkEstabelecimento)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

    function cadastrarFuncionario(req, res) {
        
        var nome = req.body.nomeServer;
        var sobrenome = req.body.sobrenomeServer;
        var email = req.body.emailServer;
        var cpf = req.body.cpfServer;
        var fkEstabelecimento = req.body.fkEstabelecimentoServer;
        console.log(req.body);

    usuarioModel.cadastrarFuncionario(nome, sobrenome, email, cpf, fkEstabelecimento)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function(erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function atualizarCargo(req, res) {
  var fkEst = req.body.fkEstabelecimento
  var idUser = req.body.idUsuario
  var cargo = req.body.cargo

  usuarioModel.atualizarCargo(fkEst, idUser, cargo).then(result => res.json(result))
}

function selecionarFuncionarios(req,res) {
    var fkEstabelecimento = req.params.fkEstabelecimento

    usuarioModel.selecionarFuncionarios(fkEstabelecimento).then((resultado)=>{
        res.json(resultado)
    }).catch((erro)=>{
        console.log(erro)
        console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    })
}

function excluirFuncionarios(req,res){
    var idUsuario = req.params.idUsuario

    usuarioModel.excluirFuncionarios(idUsuario).then((resultado)=>{
        res.json(resultado)
    }).catch((erro)=>{
        console.log(erro)
        console.log(
            "\nHouve um erro ao realizar o cadastro! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    })

}

module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    cadastrarFuncionario,
    selecionarFuncionarios,
    excluirFuncionarios,
    atualizarCargo
}