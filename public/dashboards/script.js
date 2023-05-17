const ctxGrafico1 = document.getElementById('grafico_1')

const dataGrafico1 = {
  labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
  datasets: [{
    axis: 'y',
    label: 'Clientes Dentro do estabelecimento por horário (Área 30m²)',
    data: [rgs[0], 10, 25, 26, 55, 70, 38, 22, 14, 40, 55, 25, 5],
    pointBackgroundColor: 'rgba(255, 69, 1, 0.5)',
    borderWidth: 2,
    borderColor: '#FF4301',
    tension: .1,
    fill: true
  }]
}

const optionsGrafico1 = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

new Chart(ctxGrafico1, {
  type: 'line',
  data: dataGrafico1,
  options: optionsGrafico1
})

const ctxGrafico2 = document.getElementById('grafico_2')

const dataGrafico2 = {
  labels: ['25/04', '26/04', '27/04', '28/04'],
  datasets: [{
    label: 'Total de entradas por dia',
    data: [414, 340, 358, 400],
    backgroundColor: 'rgba(255, 69, 1, 0.7)'
  }]
}

new Chart(ctxGrafico2, {
  type: 'bar',
  data: dataGrafico2
})

// Função para borrar o fundo do modal
function cadastrarFuncionario(){
  var cpf = document.querySelector('#input_cpf');
  const spanErroCpf = document.getElementById('mensagemErroCpf')
  
  // Mascara do cpf
  cpf.addEventListener('keypress', () => {
    let cpfLength = cpf.value.length;
    if (cpfLength == 3) {
      cpf.value += '.';
    } else if (cpfLength == 7){
      cpf.value += '.';
    } else if(cpfLength == 11){
      cpf.value += '-';
    }
  })


  // Validação de cpf
  spanErroCpf.style.display = 'none'
    var blur = document.getElementById('blur')
    blur.classList.toggle('active')
    var popup = document.getElementById('popup')
    popup.classList.toggle('active')
}

function validarCadastro() {
  var cpf = document.querySelector('#input_cpf');
  const spanErroCpf = document.getElementById('mensagemErroCpf')
  if (cpf.value.length = 14) {
    spanErroCpf.style.display = 'none'
    var blur = document.getElementById('blur')
    blur.classList.toggle('active')
    var popup = document.getElementById('popup')
    popup.classList.toggle('active')
    alert("foi")
  } else {
      spanErroCpf.style.display = 'block'
  }
}

async function select() {
  const qtd = await fetch('/medidas/select', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        idEstabelecimentoServer: 1
    })
  }).then(res => res.json()).then(data => data)

  return qtd
}

setInterval(async () => {
  var registros = await select().then(res => res)
  var rgs = registros.map(registro => registro.hora.split(':'))

  console.log(rgs)

}, 5000)