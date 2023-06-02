var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(id, nome,sobrenome, email, senha, fkEstabelecimento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO usuario (idUsuario, nome,sobrenome, email, senha, fkEstabelecimento) VALUES (${id}, '${nome}', '${sobrenome}', '${email}', '${senha}', ${fkEstabelecimento});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarFuncionario(nome, sobrenome, email, cpf, fkEstabelecimento) {
    var subInstrucao = `SELECT (MAX(idUsuario) + 1)`
    var instrucao = `INSERT INTO usuario (idUsuario, nome, sobrenome, email, senha, fkEstabelecimento) ${subInstrucao}, '${nome}', '${sobrenome}', '${email}', '${cpf}', '${fkEstabelecimento}' FROM usuario;`

    return database.executar(instrucao);
}

function selecionarFuncionarios(fkEstabelecimento){
    var instrucao = `select * from usuario where fkEstabelecimento = ${fkEstabelecimento};`
    return database.executar(instrucao)
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    cadastrarFuncionario,
    selecionarFuncionarios
};