import { IRequestApiService } from "@/types/APITypes"
import axios from "axios"

const apiUrl = "http://localhost:3001"
const APIService = {
  request: async function({ method, route, body }: IRequestApiService) {
    if (method === 'get') {
      return axios[method](`${apiUrl}${route}`)
    }
    return axios[method](`${apiUrl}${route}`, body)
  },
}

export default APIService