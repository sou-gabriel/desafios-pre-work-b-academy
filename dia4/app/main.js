import './style.css'

const carForm = document.querySelector('[data-js="car-form"]')
const tableContents = document.querySelector('[data-js="table-contents"]')
const divFeedbackMessage = document.querySelector('[data-js="feedback"]')

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

    data
      .map(car => {
        const tableRow = document.createElement('tr')

        Object.values(car).forEach(feature => {
          const tableData = document.createElement('td')

          tableData.textContent = feature
          tableRow.append(tableData)
        })

        return tableRow
      })
      .forEach(tableRow => {
        tableContents.append(tableRow)
      })
  } catch (error) {
    divFeedbackMessage.textContent = error.message    
    divFeedbackMessage.classList.remove('success')
    divFeedbackMessage.classList.add('error')
  }
}

carForm.addEventListener('submit', async event => {
  event.preventDefault()

  const carFeatures = [
    event.target.image.value,
    event.target.brandModel.value,
    event.target.year.valueAsNumber,
    event.target.plate.value,
    event.target.color.value
  ]

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

    const tableRow = document.createElement('tr')
    
    carFeatures
      .map(feature => {
        const tableData = document.createElement('td')

        tableData.textContent = feature
        return tableData
      })
      .forEach(cell => {
        tableRow.append(cell)
      })

    tableContents.append(tableRow)
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