const email = document.querySelector("#ipt_loginEmail");
const senha = document.querySelector("#ipt_loginSenha");

function efetuarLogin() {

    var usuario = email.value.substr(0, email.value.indexOf('@'))     
var dominio = email.value.substr(email.value.indexOf('@') + 1, email.value.length)           
var validacaoEmail =  
 (usuario.length >=1) && 
 (dominio.length >=3) && 
 (usuario.search("@")==-1) && 
 (dominio.search("@")==-1) && 
 (usuario.search(" ")==-1) && 
 (dominio.search(" ")==-1) && 
 (dominio.search(".")!=-1) && 
 (dominio.indexOf(".")>=1)&& 
 (dominio.lastIndexOf(".") < dominio.length - 1);

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
 (senha.value.indexOf('+') == -1) &&
 (senha.value.indexOf('0') == -1) &&
 (senha.value.indexOf('1') == -1) &&
 (senha.value.indexOf('2') == -1) &&
 (senha.value.indexOf('3') == -1) &&
 (senha.value.indexOf('4') == -1) &&
 (senha.value.indexOf('5') == -1) &&
 (senha.value.indexOf('6') == -1) &&
 (senha.value.indexOf('7') == -1) &&
 (senha.value.indexOf('8') == -1) &&
 (senha.value.indexOf('9') == -1);

    var erro = document.querySelector("#mensagemErro");

    if (email.value == "" && senha.value == "") {
        erro.innerHTML = `<p style="color:#EE0000">Os campos não foram preenchidos!</p>`;
    } else if (!validacaoEmail) {
        erro.innerHTML = `<p style="color:#EE0000">Email inválido!</p>`;
    } else if (validacaoSenha) {
        erro.innerHTML = `<p style="color:#EE0000">Senha inválida!</p>`;
    } else if (email.value == 'admin@gmail.com' && senha.value == "Admin@123") {
        setTimeout(() => {
            window.location.href = "./dashboards/index.html"
        }, 1000)
    } else {
        erro.innerHTML = '';
    }
}
const password = document.getElementById("ipt_loginSenha")
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