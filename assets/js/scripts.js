const baseURL = "http://10.91.116.38:5000/rhba"
const select = document.querySelector("select")

select.addEventListener("input", function (event) {
  event.preventDefault()
  const { target:{value} } = event
  const inputs = document.querySelector("#inputs")

  console.log(event)
  console.log(value)

  let formHtml = ""

  if (value == "name") {
    formHtml = `
        <label for="nome">Nome: </label>
        <input placeholder="Digite o nome" id="nome" type="text" ><br> 
      `
    inputs.innerHTML = formHtml
    return
  }

  formHtml = `
        <label for="matricula">Matrícula:</label>
        <input placeholder="Digite a matrícula" id="matricula" type="number"><br>
    `

  inputs.innerHTML = formHtml
})

const getData = async (url) => {
  const response = await fetch(url)

  if (response.status !== 200) {
    console.error("Something wrong happened!")
  }

  const data = await response.json()
  console.log(data)
  return data
}

const showData = (url, data) => {

  const div = document.querySelector("#information")

  if (url.includes("nome")) {
    console.log(data)
    return
  }

  if (url.includes("matricula")) {

  }

  const html = Object.keys(data).map(key => {
    return `<p><strong>${key.toUpperCase()}</strong>: <span>${data[key]}</span></p>`
  })

  console.log(html)

  div.innerHTML = html.join("")

}

const search = async () => {
  const nome = document.getElementById("nome");
  const matricula = document.getElementById("matricula");
  let url = ""


  if (nome) {
    url = `${baseURL}?nome=${nome.value}`
  }


  if (matricula) {
    url = `${baseURL}?matricula=${matricula.value}`

  }

  const data = await getData(url)
  console.log(url)

  showData(url, data)
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