import { IUsers } from "@/types/User";
import APIService from "./APIService";

interface IHandleUserId {
  name: string,
  email: string,
  image: string,
}

export default async function HandleUserIdService(data: IHandleUserId) {
  let returnedData: IUsers | undefined;
  await APIService.request({
    method: 'get',
    route: `/users/${data.email}`,
  })
  .then(async (res) => {
    if (res && res.data) {
      returnedData = res.data
      return returnedData
    }
    returnedData = (await createUser(data))?.data
  })
  .catch((err) => console.log(err))
  return returnedData
}

const createUser = async (data: IHandleUserId) => {
  return await APIService.request({
    method: 'post',
    route: '/users',
    body: {
      ...data
    }
  })
}