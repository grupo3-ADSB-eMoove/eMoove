const menuButton = document.getElementById('menu-toggle')

menuButton.addEventListener('click', () => {
  const navBar = document.getElementById('navbar')
  const navBarTexts = document.querySelectorAll('.nav-row-text')

  navBar.classList.toggle('open')
  navBarTexts.forEach(element => {
    element.classList.toggle('hidden')
  })
})