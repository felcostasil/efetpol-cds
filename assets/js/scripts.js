
const baseURL = "http://localhost:5000/rhba"
const select = document.querySelector("select")

/** Event Listener for <select> */
  select.addEventListener("input", function (event) {
  //event.preventDefault()
  const { target:{value} } = event
  const inputs = document.querySelector("#inputs")
  let formHtml = ""

  console.log(event)
  console.log(value)

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
})

/** Functions for API Request */
const getURI = ({key, value}) => `${baseURL}?${key}=${value}`
const getData = async (url) => {
  const response = await fetch(url)

  if (response.status !== 200) {
    console.error("Something wrong happened!")
  }
  
  const data = await response.json()
  console.log(data)
  return data
}

/** Display Handling */
const handleDisplay = {
  nome: data => displayTableInformation(data),
  matricula: data => displaySingleInformation(data),
}

/** Search Function */
const search = async () => {
  const field = getInputValue()
  if (!field) throw new Error("Nothing was selected")
  
  const url = getURI(field)
  const data = await getData(url)
  console.log(url)

  showData(field.key, data)
}


/** Display Data */
const showData = (inputKey, data) => {
  const div = document.querySelector("#information")
  const html = handleDisplay[inputKey](data)
  div.innerHTML = html
}

/** Buildin a single Exhibition for "matricula" */
const displaySingleInformation = (data) => {
  return Object.keys(data).map(key => {
    return `<p><strong>${key.toUpperCase()}</strong>: <span>${data[key]}</span></p>`
  }).join()
}

/** Click Event for Table Rows */
async function clickRow(event) {
  const matricula = event.target.closest("tr").id
  const url = getURI({key: "matricula", value: matricula})
  const data = await getData(url)
  showData("matricula", data)
  console.log(url)
}

/** Building Table Based on Input Name */
const displayTableInformation = ({meta, data}) =>  {

  const tableRows = data
    .map(({nomeServidor, matricula, cpf, rg}) => (`
      <tr onclick="clickRow(event)" id="${matricula}">
        <td>${nomeServidor ? nomeServidor : "Valor não definido"}</td>
        <td>${matricula ? matricula : "Valor não definido"}</td>
        <td>${cpf ?  cpf : "Valor não definido"}</td>
        <td>${rg ? rg : "Valor não definido"}</td>
        </tr>`)
    )

    console.log(tableRows)

  const tableContent = tableRows.join("")
  return `
      <table class="table">
        <thead class="thead-dark">
            <th>Nome</th>
            <th>Matricula</th>
            <th>CPF</th>
            <th>RG</th>
        </thead>
        <tbody>
            ${tableContent}
        </tbody>
      </table>
  `
}

/** Getting Input Value */
const getInputValue = () => {
  const inputs = ["nome", "matricula"]
  let field

  for (input of inputs) {
    const elem = document.querySelector(`#${input}`)
    if (!elem) continue
    field = {key: input , value: elem.value}
    break;
  }
  return field
}




  // fetch(url)
  // .then(function(response){
  //   return response.json()
  // }).then(function(data){
  //   const div = document.querySelector("#information")

  //   if (url.includes("nome")) {
  //     console.log(data)
  //     return
  //   } 

  //   if (url.includes("matricula")) {

  //   }

  //   const html = Object.keys(data).map(key => {
  //     return `<p><strong>${key.toUpperCase()}</strong>: <span>${data[key]}</span></p>`
  //   })
  //   console.log(html)

  //   div.innerHTML = html.join("")
  // })
  // document.querySelector(#information).insertAdjacent("beforeend", markup)



// const url = "http://pool-api.ssp.ba.intranet/rhba?cpf=" + matricula;
    // // let request = new XMLHttpRequest();

    // // request.open("GET", url);
    // // request.onerror = function (e) {
    // //   document.getElementById("return").innerHTML="API OFFLINE OU CEP INVALIDO"
    // // }
    // // request.onload = () => {
    // //   let response = JSON.parse(request.responseText)
    // }
  


  // async function buscar() {
    // document.querySelector("#information").innerHTML
    // const nome = document.querySelector('#nome').value
    // const matricula = document.querySelector('#matricula').value
    // let urln = "http://pool-api.ssp.ba.intranet/rhba?" + $nome + "/json/"
    // let urlm = "http://pool-api.ssp.ba.intranet/rhba?" + $matricula + "/json/"

    // console.log({ nome, matricula})
    // try {
    //   const retorno = await fetch(`http://pool-api.ssp.ba.intranet/rhba?${nome}`, { method: "GET", mode: 'no-cors', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' } })
    // const dados = await retorno.json()

    // console.log(dados)
    // } catch (error) {
    //   console.log(error)
    // }