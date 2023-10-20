import { IRequestApiService } from "@/types/APITypes"
import axios, { AxiosError } from "axios"
import { getSession } from 'next-auth/react';
import { toast } from "react-toastify";

const apiUrl = process.env.API_URL
const APIService = {
  async request({ method, route, body }: IRequestApiService) {
    if (method === 'get') {
      return axios[method](`${apiUrl}${route}`)
      .then((res) => res)
      .catch((err) => this.handleError(err))
    }
    const userId = await this.getUserId();
    if (userId && body) {
      body = {...body, user_id: userId}
    }
    return axios[method](`${apiUrl}${route}`, body)
    .then((res) => res)
    .catch((err) => this.handleError(err))
  },
  async getUserId () {
    const userData = await getSession()
    if (!userData) { 
      return undefined
    }
    return userData.user.id
  },
  handleError: function(error: any) {
    if (error.response && error.response?.data) {
      console.log(error.response)
      toast.error(error.response?.data?.message)
    }
    return error
  }
}

export default APIService