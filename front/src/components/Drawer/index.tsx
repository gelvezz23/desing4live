import React, { FC, KeyboardEvent, MouseEvent, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import "./drawer.scss";
import { storeStatusResponse } from "../../core/recoil/atoms/storeResponseStatus";
import { useRecoilState } from "recoil";
import { TypeCompany } from "../CreateCompany/types";
import { fetchData } from "../../utils/helpers/fetchingData";
import { decodeJWT } from "../../utils/shared/decodeJWT";
import {
  TypeStoreCompany,
  storeStatusCompanies,
} from "../../core/recoil/atoms/storeCompanies";
import { Loading } from "../Loading";
import { Alerts } from "../Alerts";
export const Drawers: FC<{ data: TypeStoreCompany }> = (item) => {
  const user = decodeJWT();
  const [status, setStatus] = useRecoilState(storeStatusResponse);
  const [company, setCompany] = useRecoilState(storeStatusCompanies);
  const [state, setState] = useState({ bottom: false });

  const [values, setvalues] = useState<TypeCompany>({
    user: item.data.user,
    name: item.data.name,
    nit: item.data.nit,
    address: item.data.address,
    phone: item.data.phone,
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
    try {
      const response = await fetchData(
        "PATCH",
        `/company/${item.data._id}`,
        data
      );
      if (response.error) {
        setStatus({ loading: false, error: response.message });
      } else {
        const index = company.findIndex((compa) => compa._id === item.data._id);
        if (index !== -1) {
          const updatedCompany = [...company];
          const newCompany = updatedCompany[index];
          const upCompany = {
            ...newCompany,
            address: values.address,
            name: values.name,
            nit: values.nit,
            phone: values.phone,
          };
          updatedCompany[index] = upCompany;
          setCompany(updatedCompany);
        }
        setStatus({ loading: false, success: response.message });
      }
    } catch (error) {
      setStatus({ loading: false, error: "An error occurred" });
    }

    setTimeout(() => {
      setStatus({ loading: false, success: "", error: "" });
    }, 3000);
  };

  const toggleDrawer =
    (anchor: string, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <React.Fragment key={"bottom"}>
      <Button onClick={toggleDrawer("bottom", true)}>editar</Button>
      <Drawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        <section className="container-drawer">
          <section className="container">
            <article className="container-login">
              <h2>Actualizar datos de la empresa</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre de empresa</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="nombre de empresa"
                  value={values.name}
                  onChange={(event) => handleChange(event.target)}
                  required
                />

                <label htmlFor="nit">Nit</label>
                <input
                  type="text"
                  id="nit"
                  name="nit"
                  placeholder="Nit"
                  value={values.nit}
                  onChange={(event) => handleChange(event.target)}
                  required
                />
                <label htmlFor="address">Dirección</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="dirección"
                  value={values.address}
                  onChange={(event) => handleChange(event.target)}
                  required
                />
                <label htmlFor="phone">Telefono</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="telefono"
                  value={values.phone}
                  onChange={(event) => handleChange(event.target)}
                  required
                />

                {status.loading && <Loading />}
                {status.error && (
                  <Alerts message={status.error} type={"error"} />
                )}
                {status.success && (
                  <Alerts message={status.success} type={"success"} />
                )}
                <button type="submit">Actualizar</button>
              </form>
            </article>
          </section>
        </section>
      </Drawer>
    </React.Fragment>
  );
};
