
export const handleDisplay = {
  nome: ({ data, meta }) => displayTableInformation(data, meta),
  matricula: (data) => displaySingleInformation(data),
}
/** Building a single Exhibition for "matricula" */
const displaySingleInformation = (data) => {
  return Object.keys(data).map(key => {
    const mapping = {
      "cpf": "CPF",
      "matricula": "Matrícula",
      "rg": "RG",
      "nomeServidor": "Nome Servidor",
      "dataNascimento": "Data de Nascimento",
      "dataAdmissao": "Data Admissão",
      "endereco_cidade": "Município",
      "endereco_bairro": "Bairro",
      "endereco_logradouro": "Logradouro",
      "celular": "Celular",
      "email": "Email",
      "sexo": "Sexo",
      "cargo": "Cargo",
      "unidade": "Unidade",
      "patente": "Patente"
    }

    return `<p><strong>${mapping[key].toUpperCase()}</strong>: <span>${typeof data[key] == 'string' ? data[key].toUpperCase() : data[key] ?? 'NÃO INFORMADO'}</span></p>`
  }).join("")
}

/** Building Table Based on Input Name */
const displayTableInformation = (data, meta) => {
  // console.log(data, meta)
  const tableRows = data
    .map(({ nomeServidor, matricula, cpf, rg }) => (`
      <tr onclick="clickRow(event)" id="${matricula}" data-bs-toggle="modal" data-bs-target="#custom-modal">
      <td>${nomeServidor ? nomeServidor : "Valor não definido"}</td>
        <td>${matricula ? matricula : "Valor não definido"}</td>
        <td >${cpf ? cpf : "Valor não definido"}</td>
        <td>${rg ? rg : "Valor não definido"}</td>
        </tr>`)
    )

  // console.log(tableRows)

  const tableContent = tableRows.join("")
  // console.log(tableContent)
  return `
  <div>
   
  <p> Foram encontrados ${window.meta.total_results} </p>
  </div>

      <table class="table">
        <thead class="thead-dark">
            <th>Nome</th>
            <th>Matricula</th>
            <th>CPF</th>
            <th>RG</th>
        </thead>
        <tbody id="tbody">
            ${tableContent}
        </tbody>
      </table>

      <div class=" bg-body-tertiary d-flex justify-content-between p-2">
      <button class="btn-group btn-group-toggle btn btn-primary" type="button" onclick="backPage()">Back</button>
      <p id="page">Página ${window.currentPage} de ${window.meta.total_pages}</p>
      <button class="btn-group btn-group-toggle btn btn-primary" type="button" onclick="nextPage()">Next</button>
      </div>
      `
}