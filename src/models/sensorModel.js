var database = require('../database/config')

function getSensoresEstabelecimento(idEstabelecimento) {
  var instrucao = `
    select 
      idSensor,
      statusSensor,
      localInstalado,
      (SELECT COUNT(c.valor) FROM sensor JOIN capturaDados AS c ON idSensor = fkSensor WHERE idSensor = s.idSensor) AS qtdEntradas,
      (SELECT DATE_FORMAT(MAX(dtHora), '%d/%c - %H:%i') FROM capturaDados JOIN sensor ON idSensor = fkSensor WHERE idSensor = s.idSensor) as ultimaCaptura
        FROM sensor AS s 
          JOIN localInstalado ON idLocal = fkLocalInstalado WHERE fkEstabelecimento = ${idEstabelecimento};`
  return database.executar(instrucao)
}

module.exports = {
  getSensoresEstabelecimento
}