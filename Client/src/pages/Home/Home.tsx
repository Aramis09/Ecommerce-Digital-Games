import { Carousel } from "../../components/Carousel/Carousel";
import { Product } from "../../components/Product/Product";
import { Footer } from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import { paramstoRenderHome } from "../../utils/constants";
import { useNavigatePaginate } from "../../CustomHooks/useNavigatePaginate";

export const Home = () => {
  const [topProductsData, setTopProductsData] =
    useNavigatePaginate(paramstoRenderHome);
  return (
    <div className={styles.container}>
      <Carousel bestThreeProducts={topProductsData} />
      <h2 className={styles.title}>TOP GAMES</h2>
      <Product products={topProductsData} />
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
