const wrapper = document.querySelector('.wrapper-notificacao')
async function fetchAlertaRecente() {
  var spanMsg = document.getElementById('msg-alerta')

  var idEst = sessionStorage.getItem("fkEstabelecimento");
  var alerta = await fetch(`/medidas/ultimo-alerta/${idEst}`).then(res => res.json())
  
  var qtdPessoas = await fetch(`/medidas/qtd-pessoas/${idEst}`).then(res => res.json())

  if(alerta[0] == undefined) {
    await insertAlerta(idEst, qtdPessoas)
    return
  }
  
  // Caso o alerta esteja desatualizado
  if(alerta[0].qtdPessoas != qtdPessoas) {

    // Insert de um alerta atualizado
    await insertAlerta(idEst, qtdPessoas)

    // Select do alerta inserido
    var alerta = await fetch(`/medidas/ultimo-alerta/${idEst}`).then(res => res.json())

    var {lotacao, msg} = calcularLotacao(alerta[0].area, alerta[0].qtdPessoas)

    // Verifica se o alerta está atualizado
    if(alerta[0].qtdPessoas == qtdPessoas) {
      
      // Dispara do alerta
      if(msg) wrapper.classList.add('show')
      spanMsg.innerHTML = `
        <span>Lotação: ${lotacao.toFixed(2)}%</span></br>
        <span>${msg}</span>
      `
  
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

async function insertAlerta(idEst, qtdPessoas) {

  var response = await fetch(`/medidas/inserir-alerta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idEstabelecimento: idEst,
      qtdPessoas: qtdPessoas
    })
  }).catch(e => console.error(e))
}


document.getElementById('fechar-alerta').addEventListener('click', () => {
  wrapper.classList.remove('show')
})

setInterval(fetchAlertaRecente, 1000)