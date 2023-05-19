var database = require('../database/config')

function fazerSelect(idEstabelecimento, horario1, horario2) {
    
    var instrucao = `
      SELECT COUNT(c.valor) AS qtdEntradas FROM estabelecimento e 
          JOIN localInstalado l ON e.idEstabelecimento = l.fkEstabelecimento
          JOIN sensor s ON l.idLocal = s.fkLocalInstalado
          JOIN capturaDados c ON s.idSensor = c.fkSensor
            WHERE e.idEstabelecimento = ${idEstabelecimento} AND (SELECT TIMESTAMPDIFF(DAY, c.dtHora, now())) = 0 AND c.dtHora >= (select concat(curdate(), ' ${horario1}')) AND c.dtHora < (select concat(curdate(), ' ${horario2}'));
    `
    return database.executar(instrucao)
}


module.exports = {
    fazerSelect
}