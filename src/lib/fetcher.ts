import axios from "./axios"

const fetcherGET = (url: string) => axios.get(url).then(res => res.data)
const fetcherPOST = (url: string) => axios.post(url).then(res => res.data)
const fetcherPUT = (url: string) => axios.put(url).then(res => res.data)
const fetcherDELETE = (url: string) => axios.delete(url).then(res => res.data)

export {
    fetcherGET,
    fetcherPOST,
    fetcherPUT,
    fetcherDELETE
}