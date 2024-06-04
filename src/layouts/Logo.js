import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link  style={{textDecoration:"none"}} to="/">
      <b style={{ fontSize:"1.6em", textDecoration:"none"}} >FLESK CAR SELL</b>
    </Link>
  );
};

export default Logo;
