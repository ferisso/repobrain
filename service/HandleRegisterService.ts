import APIService from "./APIService"

interface IRegisterService {
  name: string,
  lastName: string,
  email: string,
  password: string
}

const createUser = async (data: IRegisterService) => {
  return await APIService.request({
    method: 'post',
    route: '/users',
    body: {
      ...data
    }
  })
}

export default createUser