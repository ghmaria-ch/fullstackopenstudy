import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = personObject => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }

const update = (personObject,id) =>{
  const request =axios.put(`${baseUrl}/${id}`, personObject)
  return request.then(response => response.data)
}

export default {getAll,create,remove,update}