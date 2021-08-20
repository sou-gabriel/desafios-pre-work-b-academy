const inputUsername = document.querySelector('[data-js="username"]')

const paragraphFormattedUsername = document.createElement('output')

const getSplittedUsername = username => username.split(' ')

const getFormattedUsername = names => names
  .map(name => /^de$|^da$|^das$|^do$|^dos$/.test(name)
    ? name
    : [name[0].toUpperCase(), ...name.slice(1)].join(''))
  .join(' ')

const insertParagraphFormattedUsernameIntoDOM = formattedUsername => {
  paragraphFormattedUsername.textContent = formattedUsername
  paragraphFormattedUsername.style.display = 'block'
  inputUsername.insertAdjacentElement('afterend', paragraphFormattedUsername)
}

const showFormattedUsername = username => {
  if (username) {
    const splittedUsername = getSplittedUsername(username)
    const formattedUsername = getFormattedUsername(splittedUsername)

    insertParagraphFormattedUsernameIntoDOM(formattedUsername)
    return
  }

  insertParagraphFormattedUsernameIntoDOM('')
}

const handleChangeUsername = event => {
  const username = event.target.value.toLowerCase().trim()
  showFormattedUsername(username)
}

inputUsername.addEventListener('input', handleChangeUsername)

// Exercício 02
const form = document.querySelector('[data-js="form"]')

const colorsContainer = document.createElement('div')
const colorSelect = document.createElement('select')

form.insertAdjacentElement('afterend', colorsContainer)
inputUsername.insertAdjacentElement('afterend', colorSelect)

colorSelect.setAttribute('multiple', true)

const colors = ['#FF5733', '#D98880', '#2874A6', '#566573', '#FF3333']

colors.forEach(color => colorSelect.innerHTML +=
  `<option value="${color}">${color}</option>`)

const generateColorBox = colorOption => {
  const colorBox = document.createElement('div')

  colorBox.style.display = 'inline-block'
  colorBox.style.width = '100px'
  colorBox.style.height = '100px'
  colorBox.style.background = colorOption.value

  colorsContainer.append(colorBox)
}

const resetColorsContainer = () => colorsContainer.innerHTML = ''

const handleColorSelectChange = event => {
  resetColorsContainer()

  Array.from(event.target.selectedOptions)
    .forEach(generateColorBox)
}

colorSelect.addEventListener('change', handleColorSelectChange)
