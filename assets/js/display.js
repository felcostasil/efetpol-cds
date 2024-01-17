
export const handleDisplay = {
  nome: data => displayTableInformation(data),
  matricula: data => displaySingleInformation(data),
}

/** Building a single Exhibition for "matricula" */
const displaySingleInformation = (data) => {
  return Object.keys(data).map(key => {
    return `<p><strong>${key.toUpperCase()}</strong>: <span>${data[key]}</span></p>`
  }).join()
}

/** Building Table Based on Input Name */
const displayTableInformation = ({ meta, data }) => {

  const tableRows = data
    .map(({ nomeServidor, matricula, cpf, rg }) => (`
      <tr onclick="clickRow(event)" id="${matricula}">
        <td>${nomeServidor ? nomeServidor : "Valor não definido"}</td>
        <td>${matricula ? matricula : "Valor não definido"}</td>
        <td>${cpf ? cpf : "Valor não definido"}</td>
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