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

module.exports = {
    selectEntradasPorHorario,
    selectUltimosQuatroDias
}