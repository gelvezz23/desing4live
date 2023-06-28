import { useLocation } from "react-router-dom";
import { CreateProduct } from "../../components/CreateProduct";

export const CompanyDetails = () => {
  const location = useLocation();
  const idCompany = location.state;
  return (
    <div>
      <CreateProduct id={idCompany} />
    </div>
  );
};
