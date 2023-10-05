import { IUsers } from "./User";

export interface IBoards {
    id?: string;
    title?: string;
    description?: string;
    reporter?: string;
    assignee?: string;
    status?: number;
    points?: number;
    issue?: number;
    label?: string;
    project_id?: string;
    onBoardStatus?: number;
    reporter_info?: IUsers,
    assignee_info?: IUsers,
    createdAt?: Date;
    updatedAt?: Date;
}