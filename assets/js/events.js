import { getURI, getData } from "./api.js"
import { handleDisplay } from "./display.js"


export const search = async function search() {
  const field = getInputValue()
  if (!field) throw new Error("Nothing was selected")

  const url = getURI(field)
  const data = await getData(url)


  showData(field.key, data)
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

export const clickRow = async function (event) {
  const matricula = event.target.closest("tr").id
  const url = getURI({ key: "matricula", value: matricula })
  const data = await getData(url)
  showData("matricula", data)
}

const getInputValue = function () {
  const inputs = ["nome", "matricula"]
  let field

  for (const input of inputs) {
    const elem = document.querySelector(`#${input}`)
    if (!elem) continue
    field = { key: input, value: elem.value }
    break;
  }
  return field
}