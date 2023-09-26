import { IBoards } from "@/types/Boards";
import APIService from "./APIService";

export async function getBoards(boardId: string) {
  return await APIService.request({
    method: 'get',
    route: '/boards/' + boardId,
  })
}

export async function createBoard(board: IBoards) {
  return await APIService.request({
    method: 'post',
    route: '/boards',
    body: board
  })
}

