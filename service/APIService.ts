import { IRequestApiService } from "@/types/APITypes"
import axios from "axios"
import { getSession } from 'next-auth/react';

const apiUrl = "http://localhost:3001"
const APIService = {
  request: async function({ method, route, body }: IRequestApiService) {
    if (method === 'get') {
      return axios[method](`${apiUrl}${route}`)
    }
    const userId = await this.getUserId();
    if (userId && body) {
      body = {...body, user_id: userId}
    }
    return axios[method](`${apiUrl}${route}`, body)
  },
  getUserId: async function () {
    const userData = await getSession()
    if (!userData) { 
      return null
    }
    return userData.user.id
  }
}

export default APIService