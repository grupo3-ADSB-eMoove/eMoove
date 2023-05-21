async function fetchSensores() {
  var sensores = await fetch(`/sensores/${1}`, {cache: 'no-store'}).then((res) => res.json());
  return sensores
}

function renderSensor(sensor) {
  const divCard = document.createElement('div')
  divCard.classList.add('card')

  const spanTitulo = document.createElement('span')
  spanTitulo.classList.add('tituloCard')

  const h3Number = document.createElement('h3')
  h3Number.innerText = `Sensor ${sensor.number}`
  spanTitulo.appendChild(h3Number)

  const h5Status = document.createElement('h5')
  h5Status.innerText = `${sensor.statusSensor}`
  spanTitulo.appendChild(h5Status)
  divCard.appendChild(spanTitulo)

  divCard.appendChild(document.createElement('br'))

  const pLocal = document.createElement('p')
  pLocal.innerText = 'Local: '

  const spanLocal = document.createElement('span')
  spanLocal.innerText = sensor.localInstalado
  pLocal.appendChild(spanLocal)

  divCard.appendChild(pLocal)

  const pUltima = document.createElement('p')
  pUltima.innerText = 'Ultima Captura: '

  const spanUltima = document.createElement('span')
  spanUltima.innerText = sensor.ultimaCaptura != null ? sensor.ultimaCaptura : 'Sem Capturas'
  pUltima.appendChild(spanUltima)

  divCard.appendChild(pUltima)

  const pTotal = document.createElement('p')
  pTotal.innerText = 'Total de Capturas no dia: '

  const spanTotal = document.createElement('span')
  spanTotal.innerText = sensor.qtdEntradas
  pTotal.appendChild(spanTotal)

  divCard.appendChild(pTotal)

  return divCard
  // return `
  //   <div class="card">
  //     <span class="tituloCard">
  //       <h3>Sensor ${sensor.number}</h3>
  //       <h5>${sensor.statusSensor}</h5>
  //     </span> <br>
  //     <p>Local: <span>${sensor.localInstalado}</span></p>
  //     <p>Última captura: <span>${sensor.ultimaCaptura != null ? sensor.ultimaCaptura : 'Sem Capturas'}</span></p>
  //     <p>Total de capturas no dia: <span>${}</span></p>
  //   </div>
  // `;
}

function renderSensores() {
  const divSensores = document.querySelector('.cardsSensores')
  fetchSensores().then(sensores => {

    divSensores.innerHTML = ''
    sensores.forEach((sensor, i) => {
      sensor.number = i + 1
      divSensores.appendChild(renderSensor(sensor))
      // divSensores.innerHTML += renderSensor(sensor)
    })
  })

}

renderSensores()
setInterval(() => renderSensores(), 5000)