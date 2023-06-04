var nomeCadastro = document.querySelector("#input_nomeUsuario");
var sobrenomeCadastro = document.querySelector("#input_sobrenome");
var emailCadastro = document.querySelector("#input_email");
var cpfCadastro = document.querySelector("#input_cpf");
var fkEstabelecimentoCadastro = sessionStorage.getItem("fkEstabelecimento");
var cargoUsuarioAtual = sessionStorage.getItem("cargo");
const spanErroCpf = document.getElementById("mensagemErroCpf");
var blur = document.getElementById("blur");
const divCards = document.getElementById("divCardSensores");
var cargoUsuarioSelecionado;
document.getElementById("fechar-div-edicao").addEventListener("click", () => {
  blur.style.filter = "";
  div_edicao.classList.remove("div-edicaoAtiva");
});

document
  .getElementById("btn-excluir-funcionario")
  .addEventListener("click", () => {
    excluirFuncionario().then((result) => {
      console.log(result);
      if (result.affectedRows == 1) {
        alert("Usuario deletado com sucesso");
        selecionarFuncionarios(fkEstabelecimentoCadastro);
      }
    });
  });

var listaFuncionarios = [];

function selecionarFuncionarios(fkEstabelecimento) {
  fetch(`/usuarios/selecionarFuncionarios/${fkEstabelecimento}`, {
    cache: "no-store",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      listaFuncionarios = data;
      listarFuncionarios(listaFuncionarios);
    })
    .catch((erro) => {
      console.log("Catch do fetch: \n " + erro);
    });
}

selecionarFuncionarios(fkEstabelecimentoCadastro);
var idUsuarioSelecionado;
const divBtnCadastro = document.querySelector('#divBtnCadastrar')
function listarFuncionarios(lista = []) {
  document.getElementById("divCardSensores").innerHTML = "";
  lista.forEach((item, i) => {
    console.log(item);
    if (cargoUsuarioAtual == "funcionario") {
      divBtnCadastro.style.display = 'none'
      var html = `
           <div class="card">
              <span class="tituloCard">
              <h3>${item.nome}</h3>
              </span> <br>
            <p>Cargo: <span>${item.cargo}</span></p>
          </div>
        `;
    }else{
      var html = `
      <div class="card">
        <span class="tituloCard">
          <h3>${item.nome}</h3>
          <button id="btn${item.idUsuario}">Editar</button>
        </span> <br>
        <p>Cargo: <span>${item.cargo}</span></p>
      </div>
      `;
    }
    
    document.getElementById("divCardSensores").innerHTML += html;
  });

  addEventListeners();
}

function addEventListeners() {
  var buttons = document.querySelectorAll(".tituloCard > button");

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      div_edicao.classList.add("div-edicaoAtiva");
      blur.style.filter = "blur(4px)";
      console.log(listaFuncionarios[i]);
      idUsuarioSelecionado = listaFuncionarios[i].idUsuario;
      cargoUsuarioSelecionado = listaFuncionarios[i].cargo
      selectCargo.value = listaFuncionarios[i].cargo;
    });
  });
}

async function atualizarCargo() {
  if(cargoUsuarioAtual != 'administrador'){return alert('Apenas administradores podem gerenciar cargos.')}
  if(sessionStorage.getItem("idUsuario") == idUsuarioSelecionado){return alert('Você não pode atualizar seu cargo.')}
  var resultUpdate = await fetch("/usuarios/atualizarCargo", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkEstabelecimento: fkEstabelecimentoCadastro,
      idUsuario: idUsuarioSelecionado,
      cargo: selectCargo.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        selecionarFuncionarios(fkEstabelecimentoCadastro);
        return res.json;
      }
    })
    .catch((e) => console.error(e));
}

async function excluirFuncionario() {
  if (idUsuarioSelecionado == sessionStorage.getItem("idUsuario")) {
    alert("Você não pode se apagar");
    return;
  }else if (cargoUsuarioAtual == 'gerente' && cargoUsuarioSelecionado != 'funcionario' ){
    alert('Você como gerente pode excluir apenas funcionários')
  } else {
    let fetchExluir = await fetch(
      `/usuarios/excluirFuncionarios/${idUsuarioSelecionado}`,
      {
        cache: "no-store",
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return fetchExluir;
  }
}

function validarCadastro() {
  console.log("clicou");

  if (cpfCadastro.value.length == 11) {
    fetch("/usuarios/cadastrarFuncionario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeCadastro.value,
        sobrenomeServer: sobrenomeCadastro.value,
        emailServer: emailCadastro.value,
        cpfServer: cpfCadastro.value,
        fkEstabelecimentoServer: fkEstabelecimentoCadastro,
      }),
    })
      .then((resposta) => {
        if (resposta.ok) {
          alert("Funcionário cadastrado, lembre-se, CPF entra como senha.");
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
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

cpfCadastro.addEventListener("focus", () => {
  spanErroCpf.style.display = "none";
  spanErroCpf.style.displa = "none";
});
