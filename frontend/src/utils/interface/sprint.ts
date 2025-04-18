export interface ISprint {
  id: number | null;
  code: string;
  title: string;
}
export const defaultSendSprintValues: ISprintBody = {
  code: '',
  title: '',
};

export interface ISprintBody {
  code: string;
  title: string;
}
