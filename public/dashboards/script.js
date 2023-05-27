const ctxGrafico1 = document.getElementById("grafico_1");

const dataGrafico1 = {
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

const optionsGrafico1 = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

var chartDia = new Chart(ctxGrafico1, {
  type: "line",
  data: dataGrafico1,
  options: optionsGrafico1,
});

const ctxGrafico2 = document.getElementById("grafico_2");

const dataGrafico2 = {
  labels: [],
  datasets: [
    {
      label: "Total de Passagens por dia",
      data: [],
      backgroundColor: "rgba(255, 69, 1, 0.7)",
    },
  ],
};

var chartBarra = new Chart(ctxGrafico2, {
  type: "bar",
  data: dataGrafico2,
});

// Função para borrar o fundo do modal
function abrirCadastrarFuncionario() {
  
  var blur = document.getElementById("blur");
  blur.classList.toggle("active");
  var popup = document.getElementById("popup");
  popup.classList.toggle("active");

}

 function validarCadastro() {
  var nomeCadastro = document.querySelector("#input_nomeUsuario");
  var sobrenomeCadastro = document.querySelector("#input_sobrenome");
  var emailCadastro = document.querySelector("#input_email");
  var cpfCadastro = document.querySelector("#input_cpf");
  var fkEstabelecimentoCadastro = sessionStorage.getItem('fkEstabelecimento');
  const spanErroCpf = document.getElementById("mensagemErroCpf");
  
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
    }).catch(err => console.error(err))
  } else {
    spanErroCpf.style.display = "block";
  }
 }


// Seleciona a quantidade de entradas dentro de um intervalo de tempo de um estabelecimento
async function getEntradasPorHorario(idEstabelecimento, horario1, horario2) {
  // Requisição POST para selecionar a quantidade de entradas
  const qtd = await fetch("/medidas/selectEntradasPorHorario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idEstabelecimentoServer: idEstabelecimento,
      horario1Server: horario1,
      horario2Server: horario2,
    }),
  })
    // Converte a resposta em json
    .then((res) => res.json())

    // Retorna o json da resposta para a variavel qtd
    .then((data) => data);

  return qtd;
}

async function listarDados() {
  let hora = "08";
  let minutos = "00";
  let segundos = "00";
  var dadosDash1 = [];

  var totalEntradas = 0
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
    const qtdEntradas = await getEntradasPorHorario(sessionStorage.getItem('fkEstabelecimento'), horario1, horario2).then(res => res[0].qtdEntradas);

    totalEntradas += qtdEntradas

    dadosDash1.push({
      qtdEntradas: qtdEntradas,
      horario: horario1,
    });
  }

  var maxEntradas = Math.max(... dadosDash1.map(dado => dado.qtdEntradas))
  var minEntradas = Math.min(... dadosDash1.map(dado => dado.qtdEntradas))
  
  document.getElementById('kpi-total').innerText = totalEntradas
  document.getElementById('kpi-max').innerText = maxEntradas
  document.getElementById('kpi-min').innerText = minEntradas

  chartDia.data.datasets[0].data = []
  dadosDash1.forEach((dados, i) => {
    chartDia.data.labels[i] = dados.horario
    chartDia.data.datasets[0].data.push(parseFloat(dados.qtdEntradas));
  })
  chartDia.update()
}

async function getTotalEntradasUltimosQuatroDias() {
  const entradas = await fetch('/medidas/selectEntradasUltimosQuatroDias', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idEstabelecimentoServer: sessionStorage.getItem('fkEstabelecimento')
    })
  })
  .then(res => res.json())
  .then(data => data)

  return entradas
}

async function renderChartBarra() {
  const entradas = await getTotalEntradasUltimosQuatroDias().then(res => res)
  var dias = []
  for (let i = 0; i < entradas.length; i++) {
    const entrada = entradas[i];
    if(!dias.includes(entrada.entrada)) {
      dias.push(entrada.entrada)
    }
  }

  chartBarra.data.datasets[0].data = []
  chartBarra.data.labels = []
  dias.forEach((dia, i) => {
    var qtdEntradasDia = entradas.filter(dt => {
      if(dt.entrada == dia) {
        return dt.entrada
      }
    })

    chartBarra.data.labels.push(dia)
    chartBarra.data.datasets[0].data.push(qtdEntradasDia.length)
  })

  chartBarra.update()
}

async function getAlertas() {
  var alertas = await fetch(`/medidas/alertas/${sessionStorage.getItem('fkEstabelecimento')}`)
  .then(res => res.json())
  .then(data => data)

  if(alertas.length == 0) lotacao_atual.innerText = 'Sem Alertas'

  if(alertas.length > 0) {
    h3Situacao.innerText = 'Situação Atual'
    if(alertas.length > 1) div_historico.innerHTML = '<h3>Alertas passados:</h3>'
    alertas.forEach((alerta, i) => {
      var capMax = alerta.area * 3
      var lotacao = (alerta.qtdPessoas * 100) / capMax
  
      const divAlerta = document.createElement('div')
      divAlerta.classList.add('cardAlerta')
  
      var cor
      var faixa

      if(lotacao < 10 || lotacao > 75) {
        img_alerta.style.display = 'block'
      }

      if(lotacao < 10) {
        // Muito Baixa
        cor = 'vermelho'
        faixa = 'Muito Baixa'
        classFaixa = 'faixa-mb'
      } else if(lotacao < 26) {
        // Baixa
        cor = 'amarelo'
        faixa = 'Baixa'
        classFaixa = 'faixa-b'
      } else if(lotacao < 51) {
        // Ideal
        cor = 'verde'
        faixa = 'Ideal'
        classFaixa = 'faixa-id'
      } else if(lotacao < 76) {
        // Alta
        cor = 'amarelo'
        faixa = 'Alta'
        classFaixa = 'faixa-a'
      } else {
        // Muito Alta
        cor = 'vermelho'
        faixa = 'Muito Alta'
        classFaixa = 'faixa-ma'
      }
  
      if(i == 0) {
        lotacao_atual.innerText = `Lotação: ${lotacao.toFixed(2)}%`
        faixa_atual.innerText = `${faixa.toUpperCase()}`
        faixa_atual.classList.add(classFaixa)
      } else if(alertas.length >= 1 && i > 0) {
        seta_alerta.style.display = 'block'
        divAlerta.classList.add(cor)
  
        const spanAlerta = document.createElement('span')
        const h2Alerta = document.createElement('h2')
        h2Alerta.innerText = `Lotação: ${lotacao.toFixed(2)}%`
        spanAlerta.appendChild(h2Alerta)
    
        const bAlerta = document.createElement('b')
        bAlerta.innerText = `Pessoas na loja: ${alerta.qtdPessoas}`
        spanAlerta.appendChild(bAlerta)
        divAlerta.appendChild(spanAlerta)
    
        const divConteudo = document.createElement('div')
        divConteudo.classList.add('conteudoCard')
    
        const h1Alerta = document.createElement('h1')
        h1Alerta.innerText = `${faixa}`
        divConteudo.appendChild(h1Alerta)
    
        const pAlerta = document.createElement('p')
        pAlerta.innerText = `Hora: ${alerta.hora}`
        divConteudo.appendChild(pAlerta)
        divAlerta.appendChild(divConteudo)
    
        div_historico.appendChild(divAlerta)
      }
    })
  }
}

listarDados()
renderChartBarra()
getAlertas()
setInterval(() => {
  listarDados()
  renderChartBarra()
  getAlertas()
  // fetchAlertaRecente()
}, 2000)

listarDados()