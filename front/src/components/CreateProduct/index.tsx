import { FC, useState } from "react";
import { useRecoilState } from "recoil";
import { storeStatusResponse } from "../../core/recoil/atoms/storeResponseStatus";
import { fetchData } from "../../utils/helpers/fetchingData";
import { Alerts } from "../Alerts";
import { Loading } from "../Loading";
import { TypeProduct } from "./types";
import UploadImage from "../UploadImage";

export const CreateProduct: FC<{ id: string }> = ({ id }) => {
  const [status, setStatus] = useRecoilState(storeStatusResponse);
  const [values, setvalues] = useState<TypeProduct>({
    name: "",
    quantity: "",
    price: "",
    image: "",
    description: "",
    idCompany: id,
  });

  const handleChange = (
    event: (EventTarget & HTMLInputElement) | HTMLTextAreaElement
  ) => {
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

    try {
      const response = await fetchData("POST", "/product", values);
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
        <h2>crear productos empresa</h2>
        <form onSubmit={handleSubmit}>
          <UploadImage />
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="nombre de empresa"
            onChange={(event) => handleChange(event.target)}
            required
          />

          <label htmlFor="price">Precio</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Precio"
            onChange={(event) => handleChange(event.target)}
            required
          />
          <label htmlFor="quantity">Cantidad</label>
          <input
            type="text"
            id="quantity"
            name="qunatity"
            placeholder="Cantidad"
            onChange={(event) => handleChange(event.target)}
            required
          />
          <label htmlFor="description">Descripción</label>
          <textarea
            name="description"
            onChange={(event) => handleChange(event.target)}
            id="message"
            cols={30}
            rows={5}
            placeholder="descripción"
          ></textarea>

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
