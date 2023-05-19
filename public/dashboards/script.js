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
  labels: ["25/04", "26/04", "27/04", "28/04"],
  datasets: [
    {
      label: "Total de entradas por dia",
      data: [414, 340, 358, 400],
      backgroundColor: "rgba(255, 69, 1, 0.7)",
    },
  ],
};

new Chart(ctxGrafico2, {
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

async function select(idEstabelecimento, horario1, horario2) {
  const qtd = await fetch("/medidas/select", {
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
    .then((res) => res.json())
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
    const qtdEntradas = await select(1, horario1, horario2).then(res => res[0].qtdEntradas);
    console.log(qtdEntradas)
    dadosDash1.push({
      qtdEntradas: qtdEntradas,
      horario: horario1,
    });

    // if (i % 2 == 0) minutos = "30";
    // else {
    //   minutos = "00";

    //   let horaInt = parseInt(hora);
    //   horaInt++;

    //   if (horaInt < 10) hora = `0${horaInt}`;
    //   else hora = `${horaInt}`;
    // }

    // let horario2 = `${hora}:${minutos}:00`;

    // const qtdEntradas = await select(1, horario1, horario2).then(res => res[0].qtdEntradas);

    // dadosDash1.push({
    //   qtdEntradas: qtdEntradas,
    //   horario: horario1,
    // });
  }

  dadosDash1.forEach((dados, i) => {
    chartDia.data.labels[i] = dados.horario
    chartDia.data.datasets[0].data.push(parseFloat(dados.qtdEntradas));
  })


  chartDia.update()
  // console.log(dadosDash1);
}
// setInterval(async () => {
//   var registros = await select().then(res => res)
//   var rgs = registros.map(registro => registro.hora.split(':'))

//   console.log(rgs)

// }, 5000)

listarDados()