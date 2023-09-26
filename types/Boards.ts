

export interface IBoards {
    id?: string;
    title: string;
    description: string | null;
    reporter: string;
    assignee: string;
    status: string;
    points: number | null;
    issue: number | null;
    label: string | null;
    project_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}