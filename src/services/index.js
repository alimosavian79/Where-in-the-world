
import { Api } from '../config';

const getCountries = new Promise((resolve, reject) => {
    Api.get("all")
        .then(res => {
            resolve(res.data)
        })
        .catch(error => {
            reject(error.response)
        })
})
const getCountryDetail = (name, code) => {
    return new Promise((resolve, reject) => {
        Api.get(`${name ? `name/${name}?fullText=true` : `alpha/${code}`} `)
            .then(res => {
                resolve(res.data[0] ? res.data[0] : res.data)
            })
            .catch(error => {
                reject(error.response)
            })
    })
}



export { getCountries, getCountryDetail }
