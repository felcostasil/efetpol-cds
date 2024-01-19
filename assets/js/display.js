
export const handleDisplay = {
  nome: (data, meta) => displayTableInformation(data, meta),
  matricula: (data, meta) => displaySingleInformation(data, meta),
}

/** Building a single Exhibition for "matricula" */
const displaySingleInformation = (data, meta) => {
  return Object.keys(data).map(key => {
    return `<p><strong>${key.toUpperCase()}</strong>: <span>${data[key]}</span></p>`
  }).join()
}

/** Building Table Based on Input Name */
const displayTableInformation = (data, meta) => {
console.log (data, meta)
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
  <div>
   
  <p> Foram encontrados ${meta?.total_results} </p>
  </div>

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

      <div class="justify navbar navbar-expand-lg bg-body-tertiary d-flex p-2">
      <button class="btn-group btn-group-toggle btn btn-primary" type="button" onclick="backPage()">Back</button>
      <p id="page">Página ${window.currentPage} de ${meta?.total_pages}</p>
      <button class="btn-group btn-group-toggle btn btn-primary" type="button" onclick="nextPage()">Next</button>
      </div>
      `
}