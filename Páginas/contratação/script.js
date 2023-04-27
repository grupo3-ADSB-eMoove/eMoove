const nomeEst = document.querySelector('#input_nome');
const cnpj = document.querySelector('#ipt_cnpj');
const area = document.querySelector('#input_area')
const cep = document.querySelector('#input_CEP');
const bairro = document.querySelector('#input_bairro');
const endereco = document.querySelector('#input_endereco');
const numero = document.querySelector('#input_numero');
const nome = document.querySelector('#input_nomeUsuario')
const sobrenome = document.querySelector('#input_sobrenome')
const email = document.querySelector('#input_email');
const senha = document.querySelector('#input_senha')




function validarContrato() {
  const spanErroCep = document.getElementById('mensagemErroCEP')
  const spanErroEmail = document.getElementById('mensagemErroEmail')
  const spanErroSenha = document.getElementById('mensagemErroSenha')
 
    var usuario = email.value.substr(0, email.value.indexOf('@'))
    var dominio = email.value.substr(email.value.indexOf('@') + 1, email.value.length) 
  
  

  var validacaoEmail = 
(usuario.length >=1) &&
(dominio.length >=3) &&
(usuario.search("@")==-1) &&
(dominio.search("@")==-1) &&
(usuario.search(" ")==-1) &&
(dominio.search(" ")==-1) &&
(dominio.search(".")!= -1) &&
(dominio.indexOf(".") >=1)&&
(dominio.lastIndexOf(".") < dominio.length - 1) 

 var validacaoSenha =
 (senha.value.length < 6) ||
 (senha.value.toUpperCase() == senha.value) ||
 (senha.value.toLowerCase() == senha.value) ||
 (senha.value.indexOf('!') == -1) &&
 (senha.value.indexOf('@') == -1) &&
 (senha.value.indexOf('#') == -1) &&
 (senha.value.indexOf('$') == -1) &&
 (senha.value.indexOf('%') == -1) &&
 (senha.value.indexOf('&') == -1) &&
 (senha.value.indexOf('?') == -1) &&
 (senha.value.indexOf('-') == -1) &&
 (senha.value.indexOf('_') == -1) &&
 (senha.value.indexOf('0') == -1) &&
 (senha.value.indexOf('1') == -1) &&
 (senha.value.indexOf('2') == -1) &&
 (senha.value.indexOf('3') == -1) &&
 (senha.value.indexOf('4') == -1) &&
 (senha.value.indexOf('5') == -1) &&
 (senha.value.indexOf('6') == -1) &&
 (senha.value.indexOf('7') == -1) &&
 (senha.value.indexOf('8') == -1) &&
 (senha.value.indexOf('9') == -1) 



  if (cep.value.length != 9 && cep.value != '') {
   spanErroCep.style.display = 'block'
  } 
  else if (cep.value == ''  || email.value == '' || cnpj.value == '' || nomeEst.value == '' || numero.value == '' || bairro.value == '' || endereco.value == '' || senha.value == '' || area.value <= 0) {
   alert("Os campos não podem ser vazios")}
  else if (!validacaoEmail) {
    spanErroEmail.style.display = 'block'
    }else if(validacaoSenha){
      spanErroSenha.style.display = 'block'
    }
      else{
    var blur = document.getElementById('blur')
    blur.classList.toggle('active')
    var popup = document.getElementById('popup')
    popup.classList.toggle('active')
  }
}








// VALIDAÇÃO CEP ERRO E IMPLEMENTAÇÃO CEP

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
  const spanErroCep = document.getElementById('mensagemErroCEP')
  if (dados.erro) {
    // alert('Não foi possível localizar endereço!');

      spanErroCep.style.display = 'block'

  } else {
    document.getElementById('input_endereco').value = dados.logradouro
    document.getElementById('input_bairro').value = dados.bairro
    spanErroCep.style.display = 'none'
  }
}



cnpj.addEventListener('keypress', (e) => {
  var value = cnpj.value;

  var numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  if(!numeros.includes(e.key)) {
    e.preventDefault()
  }

  if(value.length == 2 || value.length == 6) {
    cnpj.value += '.'
  } else if (value.length == 10) {
    cnpj.value += '/'
  } else if(value.length == 15) {
    cnpj.value += '-'
  }
})


cep.addEventListener('keypress', () => {
  let cepLength = cep.value.length;
if (cepLength == 5) {
    cep.value += '-';
  }
})





  email.addEventListener ('keypress' ,()=>{

  const spanErroEmail = document.getElementById('mensagemErroEmail')
  const spanErroSenha = document.getElementById('mensagemErroSenha')
 
    var usuario = email.value.substr(0, email.value.indexOf('@'))
    var dominio = email.value.substr(email.value.indexOf('@') + 1, email.value.length) 

            var validacaoEmail = 
          (usuario.length >=1) &&
          (dominio.length >=3) &&
          (usuario.search("@")==-1) &&
          (dominio.search("@")==-1) &&
          (usuario.search(" ")==-1) &&
          (dominio.search(" ")==-1) &&
          (dominio.search(".")!= -1) &&
          (dominio.indexOf(".") >=1)&&
          (dominio.lastIndexOf(".") < dominio.length - 1) 

          if (validacaoEmail) {
            spanErroEmail.style.display = 'none'
          }
  })


  senha.addEventListener ('keypress' ,()=>{

    const spanErroSenha = document.getElementById('mensagemErroSenha')
   
    var validacaoSenha =
 (senha.value.length < 6) ||
 (senha.value.toUpperCase() == senha.value) ||
 (senha.value.toLowerCase() == senha.value) ||
 (senha.value.indexOf('!') == -1) &&
 (senha.value.indexOf('@') == -1) &&
 (senha.value.indexOf('#') == -1) &&
 (senha.value.indexOf('$') == -1) &&
 (senha.value.indexOf('%') == -1) &&
 (senha.value.indexOf('&') == -1) &&
 (senha.value.indexOf('?') == -1) &&
 (senha.value.indexOf('-') == -1) &&
 (senha.value.indexOf('_') == -1) &&
 (senha.value.indexOf('0') == -1) &&
 (senha.value.indexOf('1') == -1) &&
 (senha.value.indexOf('2') == -1) &&
 (senha.value.indexOf('3') == -1) &&
 (senha.value.indexOf('4') == -1) &&
 (senha.value.indexOf('5') == -1) &&
 (senha.value.indexOf('6') == -1) &&
 (senha.value.indexOf('7') == -1) &&
 (senha.value.indexOf('8') == -1) &&
 (senha.value.indexOf('9') == -1) 
  
            if (validacaoSenha) {
              spanErroSenha.style.display = 'none'
            }
    })









// ICONE MOSTRAR SENHA 
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



