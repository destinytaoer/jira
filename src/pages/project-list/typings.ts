export interface IParam {
  name: string;
  personId: string;
}

export interface IProject {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created?: number;
}
