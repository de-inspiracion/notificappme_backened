export interface ActivityDataBaseI {
  getActivity: (id, user) => any;
  postActivity: (data: any) => any;
  changeState: (state: any, serviceActivity: string) => any;
  deteleActiviry: (activity: string) => any;
}
