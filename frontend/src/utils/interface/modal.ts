export interface IModalBody {
  showDialog: boolean;
  title: string;
}

export const defaultModal: IModalBody = {
  showDialog: false,
  title: '',
};
