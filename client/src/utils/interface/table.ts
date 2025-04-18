export interface IHeader<T> {
  name: string;
  colName: keyof T;
}
