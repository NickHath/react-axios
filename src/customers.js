import axios from 'axios'
import apiURL from './api.js'

export const getCustomerList= function() {
    return axios.get(apiURL)
        .then((response) => {
            return response.data
        })
}

export const postCustomer =function(newUser) {
    return axios.post(apiURL, newUser).then((response) => { return response.data })
}

export const getCustomer = function(id) {
  return axios.get(apiURL + id)
       .then((response) => response.data)
}

export const updateCustomer = function(id, customer) {
  return axios.patch(apiURL+id, customer)
       .then((response) => response.data)
}

