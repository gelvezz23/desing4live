export type TypeRegister = {
  _id?: string;
  name?: string;
  email: string;
  password?: string;
  roles?: Object[];
  date?: Date;
};
export type TokenInterface = {
  userFound: TypeRegister;
};
