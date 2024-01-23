import { getURI, getData, getNextUri, getPreviousUri } from "./api.js"
import { handleDisplay } from "./display.js"

export const search = async function search() {
  const field = getInputValue()
  if (!field) throw new Error("Nothing was selected")
  const previousUrl = getPreviousUri(field)
  const nextUrl = getNextUri(field)
  const url = getURI(field)

  console.log({ previousUrl, nextUrl, url })


  const data = await getData(url)
  console.log(field.key)

  showData(field.key, data)
  // showModal(field.key, data)
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
    return
  }

  formHtml = `
        <label for="matricula">Matrícula:</label>
        <input class="form-control" placeholder="Digite a matrícula" id="matricula" type="number"><br>
    `

  inputs.innerHTML = formHtml
}

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