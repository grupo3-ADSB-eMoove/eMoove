var medidaModel = require('../models/medidaModel')

function selectEntradasPorHorario(req, res) {
    var idEstabelecimento = req.body.idEstabelecimentoServer
    var horario1 = req.body.horario1Server
    var horario2 = req.body.horario2Server

    medidaModel.selectEntradasPorHorario(idEstabelecimento, horario1, horario2)
        .then(resultado => {
            res.json(resultado)
        })
}

function selectUltimosQuatroDias(req, res) {
    var idEstabelecimento = req.body.idEstabelecimentoServer

    medidaModel.selectUltimosQuatroDias(idEstabelecimento).then(resultado => res.json(resultado))
}

function selectKpis(req, res) {
    var idEstabelecimento = req.params.idEstabelecimentoServer

    medidaModel.selectKpis()
}

function alertas(req, res) {
  var id = req.params.idEstabelecimento

  medidaModel.alertas(id).then(result => {
    res.json(result)
  })
}

function ultimoAlerta(req, res) {
  var id = req.params.idEstabelecimento
  medidaModel.ultimoAlerta(id).then(result => {
    res.json(result)
  })
}

function qtdPessoasUltimos30Min(req, res) {
  var id = req.params.idEst
  medidaModel.qtdPessoasUltimos30Min(id).then(result => res.json(result[0].qtdPessoas))
}

function inserirAlerta(req, res) {
  var id = req.body.idEstabelecimento
  var qtdPessoas = req.body.qtdPessoas

  medidaModel.inserirAlerta(id, qtdPessoas).then(result => {
    res.json(result)
  })
}

module.exports = {
    selectEntradasPorHorario,
    selectUltimosQuatroDias,
    alertas,
    ultimoAlerta,
    inserirAlerta,
    qtdPessoasUltimos30Min
}