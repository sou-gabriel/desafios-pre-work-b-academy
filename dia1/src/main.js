import './style.css'

const divApp = document.querySelector('[data-js="app"]')
const link = document.querySelector('[data-js="link"]')

divApp.innerHTML = `
  <h1>B. Academy</h1>
  <p>Boas vindas à semana de pré-work para o Bootcamp em React.js 😁</p>
`

const handleToggleVisibilityDivApp = event => {
  const divAppIsHidden = divApp.classList.toggle('is-hidden')

  event.currentTarget.textContent = divAppIsHidden ?
    'Exibir a div#app 🧐' :
    'Ocultar a div#app 🤓'
}

link.addEventListener('click', handleToggleVisibilityDivApp)
