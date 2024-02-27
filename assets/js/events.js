import { getURI, getData, getNextUri, getPreviousUri } from "./api.js"
import { handleDisplay } from "./display.js"

/* Identify key in selection */
const validKey = (value, key) => {
  if (key == 'nome') {
    return value.data.length ? false : true
  }
  return value ? false : true
}


export const search = async function search() {
  const field = getInputValue()
  if (!field) {
    document.querySelector('.selectOption').textContent = alert('Selecione o tipo de busca.')
  }
  // throw new Error("Nothing was selected")
  const previousUrl = getPreviousUri(field)
  const nextUrl = getNextUri(field)
  if (!field.value) {
    const noValue = field.key == 'nome' ? 'o' : 'a'
    return alert(`Informe ${noValue} ${field.key}`)
  }
  if (field.value.length < 3) {
    return alert('A busca deve conter ao menos 3 caracteres')
  }
  const url = getURI(field)

  console.log({ previousUrl, nextUrl, url })


  const data = await getData(url)
  let valid = validKey(data, field.key)
  // console.log(data)
  if (valid) {
    return document.querySelector('#information').textContent = 'Dado não encontrado'
    // return alert(`Dado não encontrado`)
  }

  showData(field.key, data)
  // showModal(field.key, data)
}

// Use of "Enter" to access search function
const inputField = document.getElementById('inputs')

inputField.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default form submission behavior
    search(); // Call the search function when Enter is pressed
  }
});

// Function to permit just number to type.
export const formNum = function (e) {
  // console.log(e)
  if (e.keyCode < 48 || e.keyCode > 57) {
    return false;
  }
}

export const selectChangeHandler = function (event) {
  const { target: { value } } = event
  const inputs = document.querySelector("#inputs")
  let formHtml = ""

  /** Selection of Input mode */
  if (value == "name") {

    formHtml = `
    <label for="nome">Nome: </label>
    <input  placeholder="Digite o nome" id="nome" type="text" class="form-control" ><br> 
    `
    inputs.innerHTML = formHtml
    document.querySelector('#information').textContent = ''
    return
  }
  formHtml = `
  <label for="matricula">Matrícula:</label>
  <input maxlength="8" class="form-control" placeholder="Digite a matrícula" id="matricula" pattern="[0-9]{8,8}" inputmode="numeric" onkeypress="return formNum(event)" type="text"><br>
  `

  inputs.innerHTML = formHtml
  document.querySelector('#information').textContent = ''

}



// formNumber.addEventListener('keypress', function (e) {
//   console.log(e)
//   if (e.keyCode < 48 || e.keyCode > 57) {
//     return false;
//     // return formNumber.reportValidity()
//   }
// })


/* Display Data in Screen */
const showData = (inputKey, data) => {
  const div = document.querySelector("#information")
  const html = handleDisplay[inputKey](data)
  div.innerHTML = html
}

const showModal = (inputKey, data) => {
  const modal = document.querySelector('#modalSingleInformation')
  const exhibModal = handleDisplay[inputKey](data)
  modal.innerHTML = exhibModal
}
export const clickRow = async function (event) {
  console.log(event.target.closest("tr"))
  const matricula = event.target.closest("tr").id
  const url = getURI({ key: "matricula", value: matricula })
  const data = await getData(url)
  // showData("matricula", data)
  showModal('matricula', data)
  console.log(matricula)
}

export const nextPage = async function nextPage() {

  window.currentPage++
  if (window.currentPage > window.meta.total_pages) {
    window.currentPage = window.meta.total_pages
    return
  }
  const url = getURI({ key: "nome", value: window.searchName })
  const data = await getData(url)
  console.log(data)
  showData("nome", data)
}

export const backPage = async function backPage() {
  window.currentPage--
  if (window.currentPage < 1) {
    window.currentPage = 1
    return
  }
  const url = getURI({ key: "nome", value: window.searchName })
  const data = await getData(url)
  console.log(data)

  showData("nome", data)
}

const getInputValue = function () {
  const inputs = ["nome", "matricula"]
  let field

  for (const input of inputs) {
    const elem = document.querySelector(`#${input}`)
    if (!elem) continue

    window.searchName = elem.value
    field = { key: input, value: elem.value }
    console.log(field)
    break;
  }
  console.log(field)
  return field
}