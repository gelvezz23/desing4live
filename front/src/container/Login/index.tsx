import { FC, useState } from "react";
import "./login.scss";
import { LoginTypes } from "./types";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { storeStatusResponse } from "../../core/recoil/atoms/storeResponseStatus";
import { Loading } from "../../components/Loading";
import { Alerts } from "../../components/Alerts";
import { fetchData } from "../../utils/helpers/fetchingData";
import { setLocalStorage } from "../../utils/shared/localStorage";
export const Login: FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useRecoilState(storeStatusResponse);
  const [values, setvalues] = useState<LoginTypes>({
    email: "",
    password: "",
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

    try {
      const response = await fetchData("POST", "/login", values);
      if (response.error) {
        setStatus({ loading: false, error: response.message });
      } else {
        setStatus({ loading: false, success: response.message });
        setLocalStorage(response);
        navigate("/dashboard");
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
        <h1>Iniciar sesion</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            onChange={(event) => handleChange(event.target)}
            required
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            onChange={(event) => handleChange(event.target)}
            required
          />
          {status.loading && <Loading />}
          {status.error && <Alerts message={status.error} type={"error"} />}
          {status.success && (
            <Alerts message={status.success} type={"success"} />
          )}
          <button type="submit">Iniciar sesion</button>
          <Link to="/register">registrate</Link>
        </form>
      </article>
    </section>
  );
};
