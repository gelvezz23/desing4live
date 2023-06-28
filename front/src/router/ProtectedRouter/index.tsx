/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, Suspense } from "react";
import { Navigate } from "react-router";
import { getLocalStorage } from "../../utils/shared/localStorage";
import { Loading } from "../../components/Loading";

export const ProtectedRouter: FC<any> = ({ children }) => {
  const token = getLocalStorage();
  if (!token) return <Navigate to={"/"} />;

  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};
