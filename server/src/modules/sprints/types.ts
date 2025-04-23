export interface ISprintBody {
  code: string;
  title: string;
}
export interface ISprintParams {
  id?: string;
  limit?: string;
  offset?: string;
}

export interface ISprint {
  id: number;
  code: string;
  title: string;
}
export interface ISprintResult {
  total: number;
  items: ISprint[];
}
