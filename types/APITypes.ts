
export type methods = 'get' | 'post' | 'put' | 'delete';

export type routes = '/users' | '/login'

export interface IRequestApiService {
  method: methods,
  route: routes | string,
  body?: Object,
}