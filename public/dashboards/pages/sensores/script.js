var chartDia;
var chartEntradasPorDia;

async function fetchSensores() {
  var sensores = await fetch(`/sensores/${sessionStorage.getItem('fkEstabelecimento')}`, {cache: 'no-store'}).then((res) => res.json());
  return sensores
}

// Seleciona a quantidade de entradas dentro de um intervalo de tempo de um estabelecimento
async function getEntradasPorHorarioPorSensor(idEstabelecimento, horario1, horario2, idSensor) {
  // Requisição POST para selecionar a quantidade de entradas
  const qtd = await fetch("/medidas/selectEntradasPorHorarioPorSensor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idEstabelecimentoServer: idEstabelecimento,
      horario1Server: horario1,
      horario2Server: horario2,
      idSensor: idSensor
    }),
  })
    // Converte a resposta em json
    .then((res) => res.json())

    // Retorna o json da resposta para a variavel qtd
    .then((data) => data);

  return qtd;
}

async function getDadosDia(idSensor) {
  let hora = "08";
  let minutos = "00";
  let segundos = "00";
  var dados = [];

  for (let i = 0; i < 18; i++) {
    let horario1 = `${hora}:${minutos}:00`;
    
    if (i % 2 == 0) minutos = "30";
    else {
      minutos = "00";

      let horaInt = parseInt(hora);
      horaInt++;

      if (horaInt < 10) hora = `0${horaInt}`;
      else hora = `${horaInt}`;
    }

    let horario2 = `${hora}:${minutos}:00`;
    const qtdEntradas = await getEntradasPorHorarioPorSensor(sessionStorage.getItem('fkEstabelecimento'), horario1, horario2, idSensor).then(res => res[0].qtdEntradas);

    dados.push({
      qtdEntradas: qtdEntradas,
      horario: horario1,
    });
  }
  return dados
}

async function getTotalEntradasUltimosQuatroDiasPorSensor(idSensor) {
  const entradas = await fetch('/medidas/selectEntradasUltimosQuatroDiasPorSensor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idEstabelecimentoServer: sessionStorage.getItem('fkEstabelecimento'),
      idSensor: idSensor
    })
  })
  .then(res => res.json())
  .then(data => data)

  return entradas
}

function criarGraficoLinha() {
  const ctx = document.getElementById("grafico_1");

  const data = {
    labels: [],
    datasets: [
      {
        axis: "y",
        label: "Passagens registradas por horário",
        data: [],
        pointBackgroundColor: "rgba(255, 69, 1, 0.5)",
        borderWidth: 2,
        borderColor: "#FF4301",
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  chartDia = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}

function criarGraficoBarra() {
  const ctx = document.getElementById("grafico_2");

  const data = {
    labels: [],
    datasets: [
      {
        label: "Total de Passagens por dia",
        data: [],
        backgroundColor: "rgba(255, 69, 1, 0.7)",
      },
    ],
  };

  chartEntradasPorDia = new Chart(ctx, {
    type: "bar",
    data: data,
  });
}

function renderSensor(sensor) {
  const divCard = document.createElement('div')
  divCard.classList.add('card')

  divCard.addEventListener('click', async () => {
    wrapper_detalhes_sensor.style.display = 'block'

    // Sessão para criação e configuração do gráfico de linha
    if(chartDia) chartDia.destroy()
    criarGraficoLinha()

    var dadosSensorDia = await getDadosDia(sensor.idSensor).then(res => res)

    dadosSensorDia.forEach((dados, i) => {
      chartDia.data.labels[i] = dados.horario
      chartDia.data.datasets[0].data.push(parseFloat(dados.qtdEntradas));
    })
    chartDia.update()

    // Sessão para criação e configuração do gráfico de barra
    if(chartEntradasPorDia) chartEntradasPorDia.destroy()
    criarGraficoBarra()

    const entradas = await getTotalEntradasUltimosQuatroDiasPorSensor(sensor.idSensor).then(res => res)
    console.log(sensor.idSensor)
    console.log(entradas)
    var dias = []
    for (let i = 0; i < entradas.length; i++) {
      const entrada = entradas[i];
      if(!dias.includes(entrada.entrada)) {
        dias.push(entrada.entrada)
      }
    }

    chartEntradasPorDia.data.datasets[0].data = []
    chartEntradasPorDia.data.labels = []
    dias.forEach((dia, i) => {
      var qtdEntradasDia = entradas.filter(dt => {
        if(dt.entrada == dia) {
          return dt.entrada
        }
      })

      chartEntradasPorDia.data.labels.push(dia)
      chartEntradasPorDia.data.datasets[0].data.push(qtdEntradasDia.length)
    })

    chartEntradasPorDia.update()


    var fechar = () => {
      div_detalhes_sensor.style.opacity = '0'
      div_detalhes_sensor.style.transform = 'translate(-50%, -80%)'
      div_detalhes_sensor.style.zIndex = '-9999'
      setTimeout(() => {
        wrapper_detalhes_sensor.style.display = 'none'
      }, 100)
    }
  
    wrapper_detalhes_sensor.addEventListener('click', fechar)
    btn_fechar_detalhes_sensor.addEventListener('click', fechar)

    setTimeout(() => {
      div_detalhes_sensor.style.opacity = '1'
      div_detalhes_sensor.style.transform = 'translate(-50%, -50%)'
      div_detalhes_sensor.style.zIndex = '3'
    }, 100)
  })



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
    })
  })

  // document.querySelectorAll('.card').forEach((card) => {
  //   console.log(card)
  //   card.addEventListener('click', () => {
  //     alert('teste')
  //     var fechar = () => {
  //       div_detalhes_sensor.style.opacity = '0'
  //       div_detalhes_sensor.style.transform = 'translate(-50%, -80%)'
  //       setTimeout(() => {
  //         wrapper_detalhes_sensor.style.display = 'none'
  //       }, 100)
  //     }
    
  //     wrapper_detalhes_sensor.style.display = 'block'
  //     wrapper_detalhes_sensor.addEventListener('click', fechar)
  //     btn_fechar_sensor.addEventListener('click', fechar)
    
    
  //     setTimeout(() => {
  //       div_detalhes_sensor.style.opacity = '1'
  //       div_detalhes_sensor.style.transform = 'translate(-50%, -50%)'
  //     }, 100)
  //   })
  // })
}

renderSensores()
setInterval(() => renderSensores(), 5000)