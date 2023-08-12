import APIService from "./APIService"

interface IHandleLoginService {
  email: string, 
  password: string
}

export default async function HandleLoginService(data: IHandleLoginService) {
  const res = await APIService.request({
    method: "post",
    route: "/login",
    body: data
  })
  return res.data
}