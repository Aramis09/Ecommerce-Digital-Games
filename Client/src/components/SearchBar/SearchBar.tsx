import style from "./SearchBar.module.scss";
import iconSearch from "./images/icon_search.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setPorductSearchName } from "../../redux/reducer/productReducer";

export const SearchBar = () => {
  //temgo que hacer las actions para mandar la busqueda.
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };
  const hanlderSendValue = () => {
    dispatch(setPorductSearchName(searchValue)); // tengo que preparar y mandar la action
  };
  return (
    <div className={style.containerSearch}>
      <input
        className={style.Input}
        type="text"
        placeholder="Search Video Games"
        onChange={(event) => handleInputChange(event)}
      />

      <button className={style.But} onClick={() => hanlderSendValue()}>
        <Link to="/products">
          <img className={style.iconSearch} src={iconSearch} alt="iconSearch" />
        </Link>
      </button>
    </div>
  );
};
