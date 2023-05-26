const menuButton = document.getElementById('menu-toggle')

menuButton.addEventListener('click', () => {
  const navBar = document.getElementById('navbar')
  const navBarTexts = document.querySelectorAll('.nav-row-text')

  navBar.classList.toggle('open')
  navBarTexts.forEach(element => {
    element.classList.toggle('hidden')
  })
})



const imgSair = document.querySelector('#btn-sair-nav')

const div_confirmacao_sair = document.querySelector('.wrapper-confirmacao')
const btn_sair = document.querySelector('#btn-sair')
const btn_cancelar = document.querySelector('#btn-cancelar')

imgSair.addEventListener('click',()=>{

  div_confirmacao_sair.style.opacity = '1'
  div_confirmacao_sair.style.display = 'block'

})


btn_sair.addEventListener('click',()=>{

  div_confirmacao_sair.style.display = 'none'
  

  sessionStorage.clear()
 
      window.location.href = '../index.html'
  
})

btn_cancelar.addEventListener('click',()=>{
  div_confirmacao_sair.style.display = 'none'
  
})