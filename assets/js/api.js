
const baseURL = "http://localhost:5000/rhba"

/** Functions for API Request */
export const getURI = ({ key, value }) => `${baseURL}?${key}=${value}`

export const getData = async (url) => {
  const response = await fetch(url)

  if (response.status !== 200) {
    console.error("Something wrong happened!")
  }

  const data = await response.json()
  console.log(data)
  return data
}


