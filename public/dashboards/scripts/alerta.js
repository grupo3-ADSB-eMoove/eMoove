const wrapper = document.querySelector('.wrapper-notificacao')
async function fetchAlertaRecente() {
  var spanMsg = document.getElementById('msg-alerta')

  var alertaPassado = JSON.parse(localStorage.ultimoAlerta)

  var idEst = sessionStorage.getItem("fkEstabelecimento");
  var alerta = await fetch(`/medidas/ultimo-alerta/${idEst}`).then(res => res.json())

  console.log(alerta[0], alertaPassado)

  if(alerta.length > 0) {
    var {lotacao, msg} = calcularLotacao(alerta[0].area, alerta[0].qtdPessoas)
    
    if(alertaPassado == null) {
      localStorage.ultimoAlerta = JSON.stringify(alerta[0])
    }else if(alerta[0].tempo - alertaPassado.tempo > 0) {
      localStorage.ultimoAlerta = JSON.stringify(alerta[0])
      spanMsg.innerHTML = `
        <span>Lotação: ${lotacao.toFixed(2)}%</span></br>
        <span>${msg}</span>
      `
      if(msg) wrapper.classList.add('show')
  
      setTimeout(() => wrapper.classList.remove('show'), 3000)
    }
  }
}

function calcularLotacao(area, qtdPessoas) {
  var capMax = area * 3
  var lotacao = (qtdPessoas * 100) / capMax

  var msg

  if(lotacao < 10) {
    msg = 'Estabelecimento muito vazio'
  } else if(lotacao < 26) {
    msg = 'Lotação abaixo do ideal'
  } else if(lotacao < 76 && lotacao > 50) {
    msg = 'Lotação acima do idel'
  } else if(lotacao > 75) {
    msg = 'Estabelecimento lotado'
  }

  return {
    lotacao,
    msg
  }

}

async function insertAlerta() {
  var alerta = JSON.parse(localStorage.getItem('ultimoAlerta'))

  if(alerta.tempo > 30) {
    var response = await fetch(`/medidas/inserir-alerta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idEstabelecimento: sessionStorage.getItem('fkEstabelecimento')
      })
    })
  }
}


document.getElementById('fechar-alerta').addEventListener('click', () => {
  wrapper.classList.remove('show')
})

setInterval(fetchAlertaRecente, 1000)
setInterval(insertAlerta, 30000)