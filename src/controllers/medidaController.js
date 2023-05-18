var medidaModel = require('../models/medidaModel')

function fazerSelect(req, res) {
    var idEstabelecimento = req.body.idEstabelecimentoServer
    var horario1 = req.body.horario1Server
    var horario2 = req.body.horario2Server

    medidaModel.fazerSelect(idEstabelecimento, horario1, horario2)
        .then(resultado => {
            res.json(resultado)
        })
}

module.exports = {
    fazerSelect
}