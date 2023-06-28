import { useNavigate } from "react-router-dom";
import { decodeJWT } from "../../utils/shared/decodeJWT";
import { cleanLocalStorage } from "../../utils/shared/localStorage";
import "./navbar.scss";
const Navbar = () => {
  const navigate = useNavigate();
  const user = decodeJWT();
  const logout = () => {
    cleanLocalStorage();
    navigate("/");
  };
  return (
    <nav>
      <div>
        {user ? <p>{user.userFound.name}</p> : null}
        <button onClick={() => logout()}>salir</button>
      </div>
    </nav>
  );
};
export default Navbar;
