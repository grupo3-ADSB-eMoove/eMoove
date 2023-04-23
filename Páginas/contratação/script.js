const cep = document.querySelector('#input_CEP');
const email = document.querySelector('#input_email');
const nomeEst = document.querySelector('#input_nome');
const numero = document.querySelector('#input_numero');
const bairro = document.querySelector('#input_bairro');
const endereco = document.querySelector('#input_endereco');
const nome = document.querySelector('#input_nomeUsuario')
const sobrenome = document.querySelector('#input_sobrenome')
const senha = document.querySelector('#input_senha')
cep.addEventListener('keydown', () => {
  let cepLength = cep.value.length;
 
  if (cepLength === 5) {
    cep.value += '-';
  }
})


function validarEmail(email) {
  let padraoEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return padraoEmail.test(email);
}

function validarContrato() {
  if (cep.value.length != 9 && cep.value != '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Seu CEP não foi preenchido corretamente, tente novamente!'
    })
  } else if (validarEmail(email.value) !== true && email.value != '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Seu email é invalido, por favor, tente novamente!'
    })
  } else if (cep.value == ''  || email.value == '' || nomeEst.value == '' || numero.value == '' || bairro.value == '' || endereco.value == '' || senha.value == '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, preencha todos os campos!'
    })
  }else{
    alert('contratado')
  }
}

document.getElementById('input_CEP').addEventListener('keyup', exibirEndereco)
function exibirEndereco() {
  let cep = document.querySelector(`#input_CEP`).value;
  if (cep.length != 9) { 
    document.getElementById('input_endereco').value = ''
    document.getElementById('input_bairro').value = ''
    return;
  }
  let url = `https://viacep.com.br/ws/${cep}/json/`;
  fetch(url).then(function (response) {
    response.json().then(mostrarEndereco);
  });
}

function mostrarEndereco(dados) {
  let cep = document.querySelector(`#input_CEP`).value;
  const spanErro = document.getElementById('mensagemErroCEP')
  if (dados.erro) {
    // alert('Não foi possível localizar endereço!');

      spanErro.style.display = 'block'

  } else {
    document.getElementById('input_endereco').value = dados.logradouro
    document.getElementById('input_bairro').value = dados.bairro
    spanErro.style.display = 'none'
  }
}
const password = document.getElementById("input_senha")
const icone = document.getElementById("icone")

function showHide(){
    if(password.type === 'password'){
        password.setAttribute('type', 'text');
        icone.classList.add("hide")

    }else{
    password.setAttribute('type', 'password');
    icone.classList.remove('hide')
    }

}