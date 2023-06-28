import jwt_decode from "jwt-decode";
import { getLocalStorage } from "./localStorage";
export interface decodeJWTtype {
  _id?: string;
  name?: string;
  email: string;
  password?: string;
  roles?: object[];
  date?: Date;
}
export interface TokenInterface {
  userFound: decodeJWTtype;
}
export const decodeJWT = () => {
  const token = getLocalStorage();
  const userFound: TokenInterface = token && jwt_decode(token);
  if (!userFound) {
    return undefined;
  }
  return userFound;
};
