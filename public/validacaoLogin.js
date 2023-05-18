const email = document.querySelector("#ipt_loginEmail");
const senha = document.querySelector("#ipt_loginSenha");
var erro = document.querySelector("#mensagemErro");
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

  

    if (email.value == "" || senha.value == "") {
        erro.innerHTML = `<p style="color:#EE0000">Os campos não foram preenchidos!</p>`;
    } else if (!validacaoEmail) {
        erro.innerHTML = `<p style="color:#EE0000">Email inválido!</p>`;
    } else {
        doLogin()
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

function doLogin(){
    var emailVar = email.value
    var senhaVar = senha.value

    

    fetch('/usuarios/autenticar',{
        method:'POST', 
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then((resposta) => {
        console.log(resposta)

        if(resposta.ok){
            return resposta.json()
        }else{
            
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                erro.innerHTML = `<p style="color:#EE0000">${texto}</p>`;
            });
        
        }
    }).then((dados)=>{
        sessionStorage.setItem('idUsuario', dados.idUsuario)
        sessionStorage.setItem('nome', dados.nome)
        sessionStorage.setItem('sobrenome', dados.sobrenome)
        sessionStorage.setItem('email', dados.email)
        sessionStorage.setItem('fkEstabelecimento', dados.fkEstabelecimento)

        setTimeout(()=>{
            window.location.href = '../dashboards/index.html'
        },1000)
    })
    
}




email.addEventListener('keypress',()=>{
 erro.innerHTML = ''
})
senha.addEventListener('keypress',()=>{
    erro.innerHTML = ''
   })