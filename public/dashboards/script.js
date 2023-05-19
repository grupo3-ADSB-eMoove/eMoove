const ctxGrafico1 = document.getElementById("grafico_1");

const dataGrafico1 = {
  labels: [],
  datasets: [
    {
      axis: "y",
      label: "Clientes Dentro do estabelecimento por horário (Área 30m²)",
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
      label: "Total de entradas por dia",
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
function cadastrarFuncionario() {
  var cpf = document.querySelector("#input_cpf");
  const spanErroCpf = document.getElementById("mensagemErroCpf");

  // Mascara do cpf
  cpf.addEventListener("keypress", () => {
    let cpfLength = cpf.value.length;
    if (cpfLength == 3) {
      cpf.value += ".";
    } else if (cpfLength == 7) {
      cpf.value += ".";
    } else if (cpfLength == 11) {
      cpf.value += "-";
    }
  });

  // Validação de cpf
  spanErroCpf.style.display = "none";
  var blur = document.getElementById("blur");
  blur.classList.toggle("active");
  var popup = document.getElementById("popup");
  popup.classList.toggle("active");
}

function validarCadastro() {
  var cpf = document.querySelector("#input_cpf");
  const spanErroCpf = document.getElementById("mensagemErroCpf");
  if ((cpf.value.length = 14)) {
    spanErroCpf.style.display = "none";
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
    alert("foi");
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

  for (let i = 0; i < 8; i++) {
    let horario1 = `11:${minutos}:${segundos}`;

    var segundosInt = parseInt(segundos)
    var minutosInt = parseInt(minutos)
    segundosInt += 15

    segundosInt == 60 ? minutosInt += 1 : ''

    segundosInt == 60 ? segundosInt = 0 : ''

    segundosInt < 10 ? segundos = `0${segundosInt}` : segundos = `${segundosInt}`
    minutosInt < 10 ? minutos = `0${minutosInt}` : minutos = `${minutosInt}`

    var horario2 = `11:${minutos}:${segundos}`
    const qtdEntradas = await getEntradasPorHorario(1, horario1, horario2).then(res => res[0].qtdEntradas);
    dadosDash1.push({
      qtdEntradas: qtdEntradas,
      horario: horario1,
    });
  }

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
      idEstabelecimentoServer: 1
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


listarDados()
renderChartBarra()
setInterval(() => {
  listarDados()
  renderChartBarra()
}, 5000)

listarDados()