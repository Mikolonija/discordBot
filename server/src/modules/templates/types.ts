export interface ITemplateBody {
  text: string;
}

export interface ITemplateParams {
  id?: string;
  limit?: string;
  offset?: string;
}

export interface ITemplate {
  id: number;
  text: string;
}

export interface ITemplateResult {
  total: number;
  items: ITemplate[];
}
