var database = require('../database/config')

function fazerSelect(idEstabelecimento) {
    var instrucao = `
    SELECT DATE_FORMAT(c.dtHora, '%H %i') as hora FROM estabelecimento AS e 
        JOIN localInstalado l ON e.idEstabelecimento = l.fkEstabelecimento
        JOIN sensor s ON l.idLocal = s.fkLocalInstalado
        JOIN capturaDados c ON s.idSensor = c.fkSensor
            WHERE e.idEstabelecimento = ${idEstabelecimento} AND (SELECT TIMESTAMPDIFF(DAY, c.dtHora, now())) = 0;
    `
    return database.executar(instrucao)
}


module.exports = {
    fazerSelect
}