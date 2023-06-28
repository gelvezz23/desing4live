import { useState } from "react";
import { useRecoilState } from "recoil";
import { storeStatusResponse } from "../../core/recoil/atoms/storeResponseStatus";
import { fetchData } from "../../utils/helpers/fetchingData";
import { Alerts } from "../Alerts";
import { Loading } from "../Loading";
import { TypeCompany } from "./types";
import { decodeJWT } from "../../utils/shared/decodeJWT";
import { storeStatusCompanies } from "../../core/recoil/atoms/storeCompanies";

export const CreateCompany = () => {
  const user = decodeJWT();
  const [company, setCompany] = useRecoilState(storeStatusCompanies);

  const [status, setStatus] = useRecoilState(storeStatusResponse);
  const [values, setvalues] = useState<TypeCompany>({
    user: "",
    name: "",
    nit: "",
    address: "",
    phone: "",
  });

  const handleChange = (event: EventTarget & HTMLInputElement) => {
    const { name, value } = event;
    setvalues({ ...values, [name]: value });
  };

  const handleSubmit = async (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    event.preventDefault();
    event.stopPropagation();
    setStatus({ loading: true });
    const data = { ...values, user: user?.userFound._id };
    setCompany([...company, data]);
    try {
      const response = await fetchData("POST", "/company", data);
      if (response.error) {
        setStatus({ loading: false, error: response.message });
      } else {
        setStatus({ loading: false, success: response.message });
      }
    } catch (error) {
      setStatus({ loading: false, error: "An error occurred" });
    }

    setTimeout(() => {
      setStatus({ loading: false, success: "", error: "" });
    }, 3000);
  };

  return (
    <section className="container">
      <article className="container-login">
        <h2>registrar empresa</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre de empresa</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="nombre de empresa"
            onChange={(event) => handleChange(event.target)}
            required
          />

          <label htmlFor="nit">Nit</label>
          <input
            type="text"
            id="nit"
            name="nit"
            placeholder="Nit"
            onChange={(event) => handleChange(event.target)}
            required
          />
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="dirección"
            onChange={(event) => handleChange(event.target)}
            required
          />
          <label htmlFor="phone">Telefono</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="telefono"
            onChange={(event) => handleChange(event.target)}
            required
          />

          {status.loading && <Loading />}
          {status.error && <Alerts message={status.error} type={"error"} />}
          {status.success && (
            <Alerts message={status.success} type={"success"} />
          )}
          <button type="submit">Registrar</button>
        </form>
      </article>
    </section>
  );
};
