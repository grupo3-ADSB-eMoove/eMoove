var nomeCadastro = document.querySelector("#input_nomeUsuario");
var sobrenomeCadastro = document.querySelector("#input_sobrenome");
var emailCadastro = document.querySelector("#input_email");
var cpfCadastro = document.querySelector("#input_cpf");
var fkEstabelecimentoCadastro = sessionStorage.getItem('fkEstabelecimento');
const spanErroCpf = document.getElementById("mensagemErroCpf");


function selecionarFuncionarios(fkEstabelecimento){
    fetch(`/usuarios/selecionarFuncionarios?fkEstabelecimento${fkEstabelecimento}`,{})
}



function validarCadastro() {
    console.log("clicou")
    
    if (cpfCadastro.value.length == 11) {
       fetch("/usuarios/cadastrarFuncionario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nomeServer: nomeCadastro.value,
          sobrenomeServer: sobrenomeCadastro.value,
          emailServer: emailCadastro.value,
          cpfServer: cpfCadastro.value,
          fkEstabelecimentoServer: fkEstabelecimentoCadastro
        })
      }).then((resposta)=>{
            if(resposta.ok){
                alert("Funcionário cadastrado, lembre-se, CPF entra como senha.")
                window.location.reload()
            }
      }).catch(err => console.error(err))
    } else {
      spanErroCpf.style.display = "block";
    }
   }





   // Função para borrar o fundo do modal
function abrirCadastrarFuncionario() {
  
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  
  }


  cpfCadastro.addEventListener('focus',()=>{
        spanErroCpf.style.display = 'none'
        spanErroCpf.style.displa = 'none'
  })