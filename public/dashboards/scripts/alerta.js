const wrapper = document.querySelector('.wrapper-notificacao')
async function fetchAlertaRecente() {
  var spanMsg = document.getElementById('msg-alerta')

  var alertaPassado = JSON.parse(sessionStorage.getItem('ultimoAlerta'))

  var idEst = sessionStorage.getItem("fkEstabelecimento");
  var alerta = await fetch(`/medidas/ultimo-alerta/${idEst}`).then(res => res.json())

  console.log(alerta[0])
  console.log(alertaPassado)

  var {lotacao, msg} = calcularLotacao(alerta[0].area, alerta[0].qtdPessoas)
  
  if(JSON.stringify(alerta[0]) != JSON.stringify(alertaPassado) || alertaPassado == undefined) {
    sessionStorage.setItem('ultimoAlerta', JSON.stringify(alerta[0]))

    console.log(lotacao, msg)

    spanMsg.innerHTML = `
      <span>Lotação: ${lotacao.toFixed(2)}%</span></br>
      <span>${msg}</span>
    `
    if(msg) wrapper.classList.add('show')

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

document.getElementById('fechar-alerta').addEventListener('click', () => {
  wrapper.classList.remove('show')
})

setInterval(fetchAlertaRecente, 1000)