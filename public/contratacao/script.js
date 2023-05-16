const form = document.getElementById("form-contrato");

const iptNomeFantasia = form[0];
const iptCNPJ = form[1];
const iptArea = form[2];
const iptCEP = form[3];
const iptBairro = form[4];
const iptLogradouro = form[5];
const iptNumero = form[6];

const iptNomeUsuario = form[7];
const iptSobrenomeUsuario = form[8];
const iptEmail = form[9];
const iptSenha = form[10];
const iptConfirmaSenha = form[11];

const modalPlans = document.getElementById("modal-plans");
document.getElementById("xmark").addEventListener("click", (e) => modalPlans.classList.toggle("hidden"));

document.getElementById("btn-contratar").addEventListener("click", (e) => {
  e.preventDefault();
  var nomeFantasiaValidado = validarNomeFantasia();
  var cnpjValidado = validarCNPJ();
  var areaValidada = validarArea();
  var cepValidado = validarCEP();
  var numeroValidado = validarNumero();

  var nomeUsuarioValidado = validarNomeUsuario();
  var sobrenomeusuarioValidado = validarSobrenomeUsuario();

  var senhaValidada = validarSenha();

  if (
    nomeFantasiaValidado &&
    cnpjValidado &&
    areaValidada &&
    cepValidado &&
    numeroValidado &&
    nomeUsuarioValidado &&
    sobrenomeusuarioValidado &&
    senhaValidada
  ) {
    cadastrarEstabelecimentoUsuario().then((res) => {
      if(res.ok) {
        alert('Cadastrou')
        modalPlans.classList.toggle("hidden");
      }
    })
  }
});

async function cadastrarEstabelecimentoUsuario() {
  const nomeFantasiaVar = iptNomeFantasia.value;
  const cnpjVar = iptCNPJ.value;
  const areaVar = iptArea.value;
  const cepVar = iptCEP.value;
  const bairroVar = iptBairro.value;
  const logradouroVar = iptLogradouro.value;
  const numeroVar = iptNumero.value;
  const nomeUsuarioVar = iptNomeUsuario.value;
  const sobrenomeUsuarioVar = iptSobrenomeUsuario.value;
  const emailVar = iptEmail.value;
  const senhaVar = iptSenha.value;


  const insertEstabelecimento = await fetch('/estabelecimentos/cadastrar', {
    method: 'POST', 
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify({
      nomeFantasiaServer: nomeFantasiaVar,
      cnpjServer: cnpjVar,
      areaServer: areaVar,
      cepServer: cepVar,
      bairroServer: bairroVar,
      logradouroServer: logradouroVar,
      numeroServer: numeroVar,
    })
  }).then(res => res.json()).catch(err => console.error(err))

  const idEstabelecimento = insertEstabelecimento.insertId

  const selectQtdUsuarios = await fetch('/estabelecimentos/qtdUsuarios', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idServer: idEstabelecimento
    })
  }).then(res => res.json()).catch(err => console.error(err))

  const proximoId = selectQtdUsuarios.lastId + 1

  return await fetch('/usuarios/cadastrar', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idUsuarioServer: proximoId,
      nomeUsuarioServer: nomeUsuarioVar,
      sobrenomeUsuarioServer: sobrenomeUsuarioVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      fkEstabelecimentoServer: idEstabelecimento 
    })
  }).catch(err => console.error(err))
}

function validarNomeFantasia() {
  const nome = iptNomeFantasia.value;
  const msgErro = document.getElementById("msg-erro-nome-fantasia");

  if (nome.length < 1) {
    msgErro.innerText = "Nome inválido";
    iptNomeFantasia.style.borderColor = "red";
    return false;
  }

  msgErro.innerText = "";
  iptNomeFantasia.style.borderColor = "#dc7424";
  return true;
}

function validarCNPJ() {
  const cnpj = iptCNPJ.value;
  const msgErro = document.getElementById("msg-erro-cnpj");

  if (cnpj.length < 18) {
    msgErro.innerText = "CNPJ inválido";
    iptCNPJ.style.borderColor = "red";
    return false;
  }

  msgErro.innerText = "";
  iptCNPJ.style.borderColor = "#dc7424";

  return true;
}

function validarArea() {
  const area = Number(iptArea.value);
  const msgErro = document.getElementById("msg-erro-area");

  if (area <= 0) {
    msgErro.innerText = "Área inválida";
    iptArea.style.borderColor = "red";
    return false;
  }

  msgErro.innerText = "";
  iptArea.style.borderColor = "#dc7424";
  return true;
}

function validarCEP() {
  const cep = iptCEP.value;
  const msgErro = document.getElementById("msg-erro-cep");

  if (cep.length != 9) {
    iptCEP.style.borderColor = "red";
    msgErro.innerText = "CEP inválido";
    return false;
  }

  msgErro.innerText = "";
  iptCEP.style.borderColor = "#dc7424";

  return true;
}

function validarNumero() {
  const numero = Number(iptNumero.value);
  const msgErro = document.getElementById("msg-erro-numero");

  if (numero == null || numero <= 0) {
    msgErro.innerText = "Numero inválido";
    iptNumero.style.borderColor = "red";
    return false;
  }

  msgErro.innerText = "";
  iptNumero.style.borderColor = "#dc7424";
  return true;
}

function validarNomeUsuario() {
  const nome = iptNomeUsuario.value;
  const msgErro = document.getElementById("msg-erro-nome-usuario");

  if (nome.length < 3) {
    msgErro.innerText = "Nome inválido";
    iptNomeUsuario.style.borderColor = "red";
    return false;
  }
  msgErro.innerText = "";
  iptNomeUsuario.style.borderColor = "#dc7424";
  return true;
}

function validarSobrenomeUsuario() {
  const nome = iptSobrenomeUsuario.value;
  const msgErro = document.getElementById("msg-erro-sobrenome-usuario");

  if (nome.length < 3) {
    msgErro.innerText = "Nome inválido";
    iptSobrenomeUsuario.style.borderColor = "red";
    return false;
  }
  msgErro.innerText = "";
  iptSobrenomeUsuario.style.borderColor = "#dc7424";
  return true;
}

function validarEmail() {}

function validarSenha() {
  const msgErro = document.getElementById("msg-erro-senha");

  var numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var letrasMin = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  var letrasMai = letrasMin.map((letra) => letra.toUpperCase());
  var especiais = ["!", "@", "#", "$", "%", "&", "?", "-", "_"];

  const senha = iptSenha.value;
  const confirmaSenha = iptConfirmaSenha.value;

  var senhaTemNumero = numeros.some((n) => senha.includes(n));
  var senhaTemLetraMin = letrasMin.some((l) => senha.includes(l));
  var senhaTemLetraMai = letrasMai.some((l) => senha.includes(l));
  var senhaTemEspecial = especiais.some((e) => senha.includes(e));

  if (senha.length < 8 || senha.length > 16) {
    msgErro.innerText = "senha deve ter entre 8 e 16 caracteres";
    iptSenha.style.borderColor = "red";
    return false;
  }

  if (!senhaTemNumero) {
    msgErro.innerText = "senha deve conter pelo menos um numero";
    iptSenha.style.borderColor = "red";
    return false;
  }

  if (!senhaTemLetraMin) {
    msgErro.innerText = "senha deve conter pelo menos uma letra minúscula";
    iptSenha.style.borderColor = "red";
    return false;
  }

  if (!senhaTemLetraMai) {
    msgErro.innerText = "senha deve conter pelo menos uma letra maiúscula";
    iptSenha.style.borderColor = "red";
    return false;
  }

  if (!senhaTemEspecial) {
    msgErro.innerText = "senha deve conter pelo menos um caractér especial";
    iptSenha.style.borderColor = "red";
    return false;
  }

  if (senha != confirmaSenha) {
    msgErro.innerText = "senhas não são iguais";
    iptSenha.style.borderColor = "red";
    iptConfirmaSenha.style.borderColor = "red";
    return false;
  }

  return true;
}

// VALIDAÇÃO CEP ERRO E IMPLEMENTAÇÃO CEP
iptCEP.addEventListener("keyup", (e) => {
  const cep = iptCEP.value;

  var numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (!numeros.includes(e.key)) {
    e.preventDefault();
  }

  if (cep.length != 9) {
    iptLogradouro.value = "";
    iptBairro.value = "";
    return;
  }

  let url = `https://viacep.com.br/ws/${cep}/json/`;
  fetch(url).then((response) => {
    response.json().then((dados) => {
      if (dados.erro) {
        iptCEP.style.borderColor = "red";
        msgErro.innerText = "CEP inválido";
      } else {
        iptCEP.style.borderColor = "#dc7424";
        iptLogradouro.value = dados.logradouro;
        iptBairro.value = dados.bairro;
      }
    });
  });
});

iptCEP.addEventListener("keypress", (_e) => {
  const cepLength = iptCEP.value.length;
  if (cepLength == 5) iptCEP.value += "-";
});

iptCNPJ.addEventListener("keypress", (e) => {
  var value = iptCNPJ.value;

  var numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (!numeros.includes(e.key)) {
    e.preventDefault();
  }

  if (value.length == 2 || value.length == 6) {
    iptCNPJ.value += ".";
  } else if (value.length == 10) {
    iptCNPJ.value += "/";
  } else if (value.length == 15) {
    iptCNPJ.value += "-";
  }
});
