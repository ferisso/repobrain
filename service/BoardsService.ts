import { IBoards } from "@/types/Boards";
import APIService from "./APIService";

const BoardService = {
  async getBoardsById(boardId: string): Promise<IBoards[]> {
    const boards = await APIService.request({
      method: 'get',
      route: '/boards/' + boardId,
    })
    return boards.data
  },

  async getBoards(query: string): Promise<IBoards[]> {
    const boards = await APIService.request({
      method: 'get',
      route: '/boards?' + query,
    })
    return boards.data
  },

  async createBoard(board: IBoards) {
    return await APIService.request({
      method: 'post',
      route: '/boards',
      body: board
    })
  },

  async updateBoard(board: IBoards) {
    return await APIService.request({
      method: 'put',
      route: '/boards',
      body: board
    })
  },

  async deleteBoard(boardId: string) {
    return await APIService.request({
      method: 'delete',
      route: '/boards/' + boardId
    })
  }
}

export default BoardService