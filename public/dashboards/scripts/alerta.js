const wrapper = document.querySelector('.wrapper-notificacao')
async function fetchAlertaRecente() {
  var spanMsg = document.getElementById('msg-alerta')

  var alertaPassado = JSON.parse(sessionStorage.getItem('ultimoAlerta'))

  var idEst = sessionStorage.getItem("fkEstabelecimento");
  var alerta = await fetch(`/medidas/ultimo-alerta/${idEst}`).then(res => res.json())

  console.log(alerta[0])
  console.log(alertaPassado)

  if(alerta[0] == undefined) {
    await insertAlerta(idEst)
    return
  }

  if(alertaPassado == undefined) {
    sessionStorage.setItem('ultimoAlerta', JSON.stringify(alerta[0]))
    return
  }

  var {lotacao, msg} = calcularLotacao(alerta[0].area, alerta[0].qtdPessoas)

  if(alerta[0].tempo > 30) {
    var qtdPessoas = 100
    await insertAlerta(idEst)
  }
  if((alerta[0].hora != alertaPassado.hora || alerta[0].qtdPessoas != alertaPassado.qtdPessoas) || alertaPassado == undefined) {
    
    sessionStorage.setItem('ultimoAlerta', JSON.stringify(alerta[0]))

    if(msg) wrapper.classList.add('show')
    spanMsg.innerHTML = `
      <span>Lotação: ${lotacao.toFixed(2)}%</span></br>
      <span>${msg}</span>
    `

    setTimeout(() => wrapper.classList.remove('show'), 3000)
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

async function insertAlerta(idEst) {

  var response = await fetch(`/medidas/inserir-alerta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idEstabelecimento: idEst
    })
  }).catch(e => console.error(e))
}


document.getElementById('fechar-alerta').addEventListener('click', () => {
  wrapper.classList.remove('show')
})

setInterval(fetchAlertaRecente, 1000)