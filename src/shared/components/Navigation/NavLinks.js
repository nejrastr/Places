import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-contex";
import { useContext } from "react";
import "./NavLinks.css";
import Button from "../FormElements/Button";
const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          {" "}
          Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places"> My places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new"> Add place</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth"> Sign up/Log in</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button onClick={auth.logout}>Log out</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
