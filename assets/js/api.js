
const baseURL = "http://localhost:5000/rhba"

/** Functions for API Request */
export const getURI = ({ key, value }) => `${baseURL}?${key}=${value}&pagina=${window.currentPage}`
export const getNextUri =  ({ key, value }) => `${baseURL}?${key}=${value}&pagina=${window.currentPage +1}`
export const getPreviousUri =  ({ key, value }) => `${baseURL}?${key}=${value}&pagina=${window.currentPage -1}`



export const getData = async (url) => {
  console.log(url)
  const response = await fetch(url)
  
  
  if (response.status !== 200) {
    console.error("Something wrong happened!")
  }
  
  const data = await response.json()
  // console.log (data.meta.actual_page)
  console.log(data)
  return data
}


