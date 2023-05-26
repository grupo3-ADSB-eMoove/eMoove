var database = require('../database/config')

function selectEntradasPorHorario(idEstabelecimento, horario1, horario2) {
    
    var instrucao = `
      SELECT COUNT(c.valor) AS qtdEntradas FROM estabelecimento e 
          JOIN localInstalado l ON e.idEstabelecimento = l.fkEstabelecimento
          JOIN sensor s ON l.idLocal = s.fkLocalInstalado
          JOIN capturaDados c ON s.idSensor = c.fkSensor
            WHERE e.idEstabelecimento = ${idEstabelecimento} AND (SELECT TIMESTAMPDIFF(DAY, c.dtHora, now())) = 0 AND c.dtHora >= (select concat(curdate(), ' ${horario1}')) AND c.dtHora < (select concat(curdate(), ' ${horario2}'));
    `
    return database.executar(instrucao)
}

function selectUltimosQuatroDias(idEstabelecimento) {
    var instrucao = `
    SELECT DATE_FORMAT(c.dtHora, '%d/%c') AS entrada FROM estabelecimento e 
    JOIN localInstalado l ON e.idEstabelecimento = l.fkEstabelecimento
    JOIN sensor s ON l.idLocal = s.fkLocalInstalado
    JOIN capturaDados c ON s.idSensor = c.fkSensor
      WHERE e.idEstabelecimento = ${idEstabelecimento} AND (SELECT TIMESTAMPDIFF(DAY, c.dtHora, now())) < 4;
    `

    return database.executar(instrucao)
}

function alertas(id) {
  var instrucao = `SELECT e.area, DATE_FORMAT(a.dtAlerta, '%H:%i') as hora, a.qtdPessoas FROM estabelecimento e JOIN alerta a ON e.idEstabelecimento = a.fkEstabelecimento WHERE e.idEstabelecimento = ${id}`
  return database.executar(instrucao)
}

module.exports = {
    selectEntradasPorHorario,
    selectUltimosQuatroDias,
    alertas
}