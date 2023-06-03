var nomeCadastro = document.querySelector("#input_nomeUsuario");
var sobrenomeCadastro = document.querySelector("#input_sobrenome");
var emailCadastro = document.querySelector("#input_email");
var cpfCadastro = document.querySelector("#input_cpf");
var fkEstabelecimentoCadastro = sessionStorage.getItem('fkEstabelecimento');
const spanErroCpf = document.getElementById("mensagemErroCpf");
var blur = document.getElementById("blur");
const divCards = document.getElementById("divCardSensores")

let funcionariosLista = []
function selecionarFuncionarios(fkEstabelecimento){
    fetch(`/usuarios/selecionarFuncionarios/${fkEstabelecimento}`,{
        cache: 'no-store'
    }).then((res)=>{
        if(res.ok){
            return res.json()
        }
    }).then((data)=>{
      
        for(var i = 0; i< data.length; i++){
          funcionariosLista.push(data[i])
        }
        listarFuncionarios()
    }).catch((erro)=>{
        console.log('Catch do fetch: \n '+ erro)
    })
}

selecionarFuncionarios(fkEstabelecimentoCadastro)



function listarFuncionarios(){
  const div_edicao = document.querySelector('#div-edicao')
  for(var i = 0; i<funcionariosLista.length; i++){


            let card = document.createElement('div')
            let idUsuarioLocal = funcionariosLista[i].idUsuario
           
            
            card.classList.add('card')
            
            card.classList.add(`${funcionariosLista[i].idUsuario}`)
            divCards.append(card)

            let spanTitulo = document.createElement('span')
            spanTitulo.classList.add('tituloCard')

            card.appendChild(spanTitulo)

            let nomeFuncionario = document.createElement('h3')
            let btnEditar = document.createElement('button')

            // BOTÃO DE EDITAR FUNCIONÁRIO, PRESENTE EM TODOS OS CARDS
            btnEditar.addEventListener('click',()=>{
                div_edicao.classList.add('div-edicaoAtiva')
                blur.style.filter = 'blur(4px)'
                // console.log(card.classList.contains(2))
                console.log(idCardAtual)
  


            // BOTÃO DE FECHAR A DIV DA EDIÇÃO
             let btnFecharEdicao = document.querySelector('#fechar-div-edicao')
             btnFecharEdicao.addEventListener('click',()=>{
              blur.style.filter = ''
                div_edicao.classList.remove('div-edicaoAtiva')

                
              })
              
            })
            
            let btnExcluirFuncionario = document.querySelector('#btn-excluir-funcionario')
            btnExcluirFuncionario.addEventListener('click',()=>{
              if(card.classList.contains(idUsuarioLocal)){
                console.log('Removi o funcionario de id: ' + idUsuarioLocal)
                // excluirFuncionarios(idUsuarioLocal)
                
              }
            })

            spanTitulo.appendChild(nomeFuncionario)
            spanTitulo.appendChild(btnEditar)

            nomeFuncionario.innerHTML = `${funcionariosLista[i].nome}`
            btnEditar.innerHTML = `Editar`

            let cargoTitulo = document.createElement('p')
        
            card.appendChild(cargoTitulo)
            cargoTitulo.innerHTML = `Cargo: `

            let cargo = document.createElement('span')
            cargoTitulo.appendChild(cargo)
            
            cargo.innerHTML = `Administrador #`
  }
            
}

async function excluirFuncionarios(idUsuario){
 
  let fetchExluir =  await fetch(`/usuarios/excluirFuncionarios/${idUsuario}`, {
    cache: 'no-store',
    method: 'DELETE'
  }).then((res)=>{
    if(res.ok){
      return res.json()
    }
  }).catch((error)=>{
    console.log(error)
  })
  console.log(fetchExluir)
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
  
    
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  
  }


  cpfCadastro.addEventListener('focus',()=>{
        spanErroCpf.style.display = 'none'
        spanErroCpf.style.displa = 'none'
  })