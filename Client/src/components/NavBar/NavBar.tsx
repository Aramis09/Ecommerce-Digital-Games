import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";
import { SearchBar } from "../SearchBar/SearchBar";
import iconHamburger from "./images/hamburger-menu-icon.png";
import { useState } from "react";
import icon from "./images/icon.png";
import SubNavbar from "../SubNavbar/SubNavbar";
import { Login } from "../LoginButton/LoginButton";

export const NavBar = () => {
  const [showSubNavBar, setShowSubNavBar] = useState(false);

  return (
    <nav className={style.mainContainer}>
      <div className={style.listContainer}>
        <Link to="/" className={style.home}>
          <img src={icon} alt="joystick_icon" />
        </Link>
        {/* <ShowDailyDiscount /> */}
        <div className={style.containerSearch}>
          <img
            src={iconHamburger}
            alt="hamburgerIcon"
            onClick={() => setShowSubNavBar(!showSubNavBar)}
          />
          <SearchBar />
        </div>
        <Login from="NavBar" />
      </div>
      <SubNavbar show={showSubNavBar} />
    </nav>
  );
};
