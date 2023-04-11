import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
import { NavBarDesktop } from "../NavBar/NavBarDesktop";

export const NavbarResponsive = () => {
  return <>{window.innerWidth > 959 ? <NavBarDesktop /> : <NavbarPhone />}</>;
};
