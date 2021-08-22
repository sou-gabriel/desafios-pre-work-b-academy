import './style.css'

const carForm = document.querySelector('[data-js="car-form"]')
const tableContents = document.querySelector('[data-js="table-contents"]')
const divFeedbackMessage = document.querySelector('[data-js="feedback"]')

const createTableRow = data => {
  const tableRow = document.createElement('tr')
  const deleteButtonCell = document.createElement('th')
  const button = document.createElement('button')

  Object.values(data).forEach(cellValue => {
    const tableData = document.createElement('td')

    tableData.textContent = cellValue
    tableRow.appendChild(tableData)
  })

  button.textContent = 'Excluir'

  button.dataset.plate = data.plate
  tableRow.dataset.plate = data.plate

  button.addEventListener('click', async event => {
    const plate = event.target.dataset.plate

    const response = await fetch('http://localhost:3333/cars', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ plate })
    })

    if (!response.ok) {
      console.log('Um erro ocorreu')
      return
    }

    const tableRow = document.querySelector(`tr[data-plate="${plate}"]`)
    tableRow.remove()
  })
  
  deleteButtonCell.append(button)
  tableRow.appendChild(deleteButtonCell)

  tableContents.appendChild(tableRow)
}

const init = async () => {
  try {
    const response = await fetch('http://localhost:3333/cars')
    const carData = await response.json()

    if (!carData.length) {
      console.log('opa')
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

    carData.forEach(createTableRow)
  } catch (error) {
    divFeedbackMessage.textContent = error.message    
    divFeedbackMessage.classList.remove('success')
    divFeedbackMessage.classList.add('error')
  }
}

carForm.addEventListener('submit', async event => {
  event.preventDefault()

  try {
    const data = await (await fetch('http://localhost:3333/cars', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        image: event.target.image.value,
        brandModel: event.target.brandModel.value,
        year: event.target.year.valueAsNumber,
        plate: event.target.plate.value,
        color: event.target.color.value
      })
    })).json()

    if (data.error) {
      throw new Error(data.message)
    }

    divFeedbackMessage.textContent = data.message
    divFeedbackMessage.classList.remove('error')
    divFeedbackMessage.classList.add('success')

    const warningLineExists = document.querySelector('[data-js="warning-line"]')

    if (warningLineExists) {
      warningLineExists.remove()
    }

    const carData = {
      image: event.target.image.value,
      brandModel: event.target.brandModel.value,
      year: event.target.year.valueAsNumber,
      plate: event.target.plate.value,
      color: event.target.color.value
    }

    createTableRow(carData)
  } catch (error) {
    divFeedbackMessage.textContent = error.message
    divFeedbackMessage.classList.remove('success')
    divFeedbackMessage.classList.add('error')

    setTimeout(() => {
      divFeedbackMessage.textContent = ''
    }, 3000)
  }

  event.target.reset()
  event.target.image.focus()
})

init()