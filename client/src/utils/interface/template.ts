export interface ITemplates {
  id: string;
  text: string;
}
export interface ITemplateBody {
  text: string;
}
export const defaultTemplateBody: ITemplateBody = {
  text: '',
};

export interface ITemplateResult {
  total: number;
  items: ITemplates[];
}
