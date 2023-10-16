import { TLabels } from "./Labels";
import { IProjects } from "./Projects";
import { IUsers } from "./User";

export interface IBoards {
    id?: string;
    title?: string;
    description?: string;
    reporter?: string;
    assignee?: string;
    status?: number;
    points?: number;
    issue_id?: string;
    issue_number?: string;
    issue_url?: string;
    label?: TLabels | string;
    project_id?: string;
    project?: IProjects;
    priority?: number;
    onBoardStatus?: 0 | 1 | 2| 3 | 4 | 5;
    reporter_info?: IUsers;
    assignee_info?: IUsers;
    createdAt?: Date;
    updatedAt?: Date;
}