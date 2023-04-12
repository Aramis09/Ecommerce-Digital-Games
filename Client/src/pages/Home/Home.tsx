import { Carousel } from "../../components/Carousel/Carousel";
import { Product } from "../../components/Product/Product";
import { Footer } from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Carousel />
      <h2 className={styles.title}>TOP GAMES</h2>
      <Product />
      <Link to={"/products"}>
        <button
          className={styles["More-products-btn"]}
          value="0"
          // onClick={toTheSearchList} Este onClick es el que lleva a products
        >
          All Games...
        </button>
      </Link>
      <Footer />
    </div>
  );
};
