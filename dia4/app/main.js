import './style.css'

const tableContents = document.querySelector('[data-js="table-contents"]')

const init = async () => {
  try {
    const response = await fetch('http://localhost:3333/cars')
    const data = await response.json()

    if (!data.length) {
      const warningLine = document.createElement('tr')
      const warningLineCell = document.createElement('td')

      warningLine.setAttribute('data-js', 'warning-line')

      warningLineCell.colSpan = 5
      warningLineCell.textContent = 'Nenhum carro encontrado'
      warningLineCell.style.textAlign = 'center'

      warningLine.prepend(warningLineCell)
      tableContents.prepend(warningLine)
      return
    }
  } catch (error) {
    console.log(error)
  }
}

init()