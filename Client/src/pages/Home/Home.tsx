import { Carousel } from "../../components/Carousel/Carousel";
import { NavBar } from "../../components/NavBar/NavBar";
import { Product } from "../../components/Product/Product";
import { Footer } from "../../components/Footer/Footer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getProductsByFilters } from "../../redux/actions/productAction";
//import { getShoppingCartUserFromDB } from "../../redux/actions/shoppingCartAction";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
import { Login } from "../../components/LoginButton/LoginButton";

export const Home = () => {
  const dispatch = useAppDispatch();

  const toTheSearchList = (e: any) => {
    dispatch(
      getProductsByFilters(
        {
          name: "",
          filters: {
            genres: [],
            platform: [],
            priceRange: [0, 100],
          },
          order: {
            alphabetic: "",
            price: "",
          },
        },
        1
      )
    );
  };

  return (
    <div className={styles.container}>
      {window.innerWidth > 959 ? <NavBar /> : <NavbarPhone />}
      <Carousel />
      <h2 className={styles.title}>TOP GAMES</h2>
      <Product />
      <Link to={"/products"}>
        <button
          className={styles["More-products-btn"]}
          value="0"
          onClick={toTheSearchList}
        >
          All Games...
        </button>
      </Link>
      <Footer />
    </div>
  );
};
