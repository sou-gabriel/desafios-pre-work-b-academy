const carForm = document.querySelector('[data-js="car-form"]')
const tableContents = document.querySelector('[data-js="table-contents"]')

const getCarFeatures = () => ([
  carForm.image.value,
  carForm.brand.value,
  carForm.model.value,
  carForm.year.value,
  carForm.plate.value,
  carForm.color.value
])

const addNewLineIntoTable = carFeatures => {
  const tableRow = document.createElement('tr')

  carFeatures.forEach(carFeature => {
    const tableCell = document.createElement('td')

    tableCell.textContent = carFeature

    tableRow.append(tableCell)
  })

  tableContents.append(tableRow)
}

const resetForm = () => {
  carForm.reset()
  carForm.image.focus()
}

const handleCarFormSubmit = event => {
  event.preventDefault()

  const carFeatures = getCarFeatures()

  addNewLineIntoTable(carFeatures)
  resetForm()
}

carForm.addEventListener('submit', handleCarFormSubmit)
