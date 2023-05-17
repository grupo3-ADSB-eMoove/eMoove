var medidaModel = require('../models/medidaModel')

function fazerSelect(req, res) {
    var idEstabelecimento = req.body.idEstabelecimentoServer

    medidaModel.fazerSelect(idEstabelecimento)
        .then(resultado => {
            res.json(resultado)
        })
}

module.exports = {
    fazerSelect
}