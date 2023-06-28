/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { decodeJWT } from "../../utils/shared/decodeJWT";
import { fetchData } from "../../utils/helpers/fetchingData";
import { useRecoilState } from "recoil";
import { storeStatusCompanies } from "../../core/recoil/atoms/storeCompanies";
import { storeStatusResponse } from "../../core/recoil/atoms/storeResponseStatus";
import { Loading } from "../Loading";
import { Alerts } from "../Alerts";
import { Cards } from "../Cards";
import "./listCompany.scss";
const ListCompany = () => {
  const user = decodeJWT();
  const [status, setStatus] = useRecoilState(storeStatusResponse);
  const [company, setCompany] = useRecoilState(storeStatusCompanies);
  const listData = async () => {
    setStatus({ loading: true });
    const result = await fetchData(
      "GET",
      `/company/${user?.userFound._id}`,
      null
    );
    if (result.error) {
      setStatus({ loading: false, error: result.message });
    }
    setCompany(result);
    setStatus({ loading: false });
  };

  useEffect(() => {
    listData();
  }, []);

  return (
    <section className="container-listCompany">
      {status.loading && <Loading />}
      {status.error && <Alerts message={status.error} type={"error"} />}
      {company &&
        company.map((item, index) => {
          return <Cards key={index} item={item} />;
        })}
    </section>
  );
};

export default ListCompany;
