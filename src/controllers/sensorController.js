var sensorModel = require('../models/sensorModel')

function getSensoresEstabelecimento(req, res) {
  const fk = req.params.fkEstabelecimento

  sensorModel.getSensoresEstabelecimento(fk).then(resposta => res.json(resposta))
}

module.exports = {
  getSensoresEstabelecimento
}