var estabelecimentoModel = require("../models/estabelecimentoModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA estabelcimentoController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    estabelecimentoModel.listar()
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
        
        estabelecimentoModel.entrar(email, senha)
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
   
var nomeFantasia  = req.body.nomeFantasiaServer    
var cnpj =req.body.cnpjServer            
var area =req.body.areaServer            
var cep =req.body.cepServer             
var bairro =req.body.bairroServer          
var logradouro =req.body.logradouroServer      
var numero =req.body.numeroServer        
   

  
  
        // Passe os valores como parâmetro e vá para o arquivo estabelecimentoModel.js
        estabelecimentoModel.cadastrar(nomeFantasia,cnpj,area,cep,bairro,logradouro,numero)
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


module.exports = {
    entrar,
    cadastrar,
    listar,
    testar
}

















