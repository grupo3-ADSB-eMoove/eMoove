var nomeCadastro = document.querySelector("#input_nomeUsuario");
var sobrenomeCadastro = document.querySelector("#input_sobrenome");
var emailCadastro = document.querySelector("#input_email");
var cpfCadastro = document.querySelector("#input_cpf");
var fkEstabelecimentoCadastro = sessionStorage.getItem('fkEstabelecimento');
const spanErroCpf = document.getElementById("mensagemErroCpf");

const divCards = document.getElementById("divCardSensores")

function selecionarFuncionarios(fkEstabelecimento){
    fetch(`/usuarios/selecionarFuncionarios/${fkEstabelecimento}`,{
        cache: 'no-store'
    }).then((res)=>{
        if(res.ok){
            return res.json()
        }
    }).then((data)=>{
        for(var i = 0; i< data.length; i++){
            console.log(data[i])
            let card = document.createElement('div')
            card.classList.add('card')
            divCards.append(card)

            let spanTitulo = document.createElement('span')
            spanTitulo.classList.add('tituloCard')

            card.appendChild(spanTitulo)

            let nomeFuncionario = document.createElement('h3')
            let btnEditar = document.createElement('button')

            btnEditar.addEventListener('click',()=>{
                
            })

            spanTitulo.appendChild(nomeFuncionario)
            spanTitulo.appendChild(btnEditar)

            nomeFuncionario.innerHTML = `${data[i].nome}`
            btnEditar.innerHTML = `Editar`

            let cargoTitulo = document.createElement('p')
        
            card.appendChild(cargoTitulo)
            cargoTitulo.innerHTML = `Cargo: `

            let cargo = document.createElement('span')
            cargoTitulo.appendChild(cargo)
            
            cargo.innerHTML = `Administrador #`

        }
    }).catch((erro)=>{
        console.log('Catch do fetch: \n '+ erro)
    })
}

selecionarFuncionarios(fkEstabelecimentoCadastro)


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