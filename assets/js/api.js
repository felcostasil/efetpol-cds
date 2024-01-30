
const baseURL = "http://localhost:5000/rhba"

/** Functions for API Request */
export const getURI = ({ key, value }) => `${baseURL}?${key}=${value}&pagina=${window.currentPage}`
export const getNextUri = ({ key, value }) => `${baseURL}?${key}=${value}&pagina=${window.currentPage}`
export const getPreviousUri = ({ key, value }) => `${baseURL}?${key}=${value}&pagina=${window.currentPage}`



export const getData = async (url) => {
  console.log(url)
  const response = await fetch(url)


  if (response.status !== 200) {
    console.error("Something wrong happened!")
  }

  const data = await response.json()

  if (url.includes("nome")) {
    window.meta = data.meta
  }
  return data
}

// const {data, meta} = await response.json()
// console.log (meta.actual_page)


