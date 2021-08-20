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
