async function fetchAlertaRecente() {
  var wrapper = document.querySelector('.wrapper-notificacao')

  var alertaPassado = JSON.parse(sessionStorage.getItem('ultimoAlerta'))

  var idEst = sessionStorage.getItem("fkEstabelecimento");
  var alerta = await fetch(`/medidas/ultimo-alerta/${idEst}`).then(res => res.json())

  console.log(alerta[0])
  console.log(alertaPassado)

  if(JSON.stringify(alerta[0]) != JSON.stringify(alertaPassado) || alertaPassado == undefined) {
    sessionStorage.setItem('ultimoAlerta', JSON.stringify(alerta[0]))
    wrapper.classList.add('show')

    setTimeout(() => wrapper.classList.remove('show'), 3000)
  }
}
