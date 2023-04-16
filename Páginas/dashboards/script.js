const ctxGrafico1 = document.getElementById('grafico_1')

const dataGrafico1 = {
  labels: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
  datasets: [{
    axis: 'y',
    label: 'Clientes Dentro do estabelecimento por horário',
    data: [20, 15, 12, 30, 31, 41, 16, 19, 25, 15, 12, 30, 31],
    pointBackgroundColor: 'rgba(255, 69, 1, 0.5)',
    borderWidth: 2,
    borderColor: '#FF4301',
    tension: .1
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
  labels: ['12/04', '13/04', '14/04', '15/04'],
  datasets: [{
    label: 'Total de entradas por dia',
    data: [254, 321, 218, 416],
    backgroundColor: 'rgba(255, 69, 1, 0.7)'
  }]
}

new Chart(ctxGrafico2, {
  type: 'bar',
  data: dataGrafico2
})