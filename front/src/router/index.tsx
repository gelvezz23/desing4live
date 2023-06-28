import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "../container/Login";
import { Register } from "../container/Register";
import Dashboard from "../container/Dashboard";
import { ProtectedRouter } from "./ProtectedRouter";
import { CompanyDetails } from "../container/CompanyDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/company",
    element: <CompanyDetails />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRouter>
        <Dashboard />
      </ProtectedRouter>
    ),
  },
]);

const Router = () => {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<p>Loading ...</p>} />
    </>
  );
};

export default Router;
