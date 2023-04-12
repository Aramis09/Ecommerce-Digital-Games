import { Filters, filtersGeneralType } from "../../components/Filters/Filters";
// import { NavBar } from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import styles from "./Products.module.scss";
import iconFilters from "./images/filter.png";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
import { getProductsFiltered } from "../../Controller/FiltersController";
import { Game } from "../../types";
import { inititalStateFilters } from "../../components/Filters/until";
import { PaginateProducts } from "../../components/PaginateProducts/PaginateProducts";

export const Products = () => {
  const [changeClass, setChangeClass] = useState(false);
  const [productList, setProductList] = useState<Game[]>([]);
  const [filters, setFilters] =
    useState<filtersGeneralType>(inititalStateFilters);

  useEffect(() => {
    getProductsFiltered(inititalStateFilters, 1).then(
      (productList) => productList && setProductList(productList)
    );
  }, []);

  const getProductsWithConditions = (
    filters: filtersGeneralType,
    currentPage: number | undefined
  ) => {
    setFilters(filters);
    currentPage
      ? getProductsFiltered(filters, currentPage).then(
          (productList) => productList && setProductList(productList)
        )
      : getProductsFiltered(filters, 1).then(
          (productList) => productList && setProductList(productList)
        );
  };

  const changePageHanlder = (ev: any) => {
    const currentPageNumber: number = Number(ev.target.value);
    getProductsWithConditions(filters, currentPageNumber);
  };

  return (
    <div className={styles.containerAll}>
      <div className={styles["page-container"]}>
        <img
          className={styles.iconCarrito}
          src={iconFilters}
          alt="soppingCart"
          onClick={() => setChangeClass(!changeClass)}
        />
        <Filters
          flag={changeClass}
          updateListProducts={getProductsWithConditions}
        />
        {productList.length ? (
          productList.map((item: any, index: number) => {
            return (
              <div key={index} className={styles.productList}>
                <Card
                  id={item.id}
                  key={index}
                  name={item.name}
                  background_image={item.background_image}
                  price={item.price}
                  genres={item.genres}
                  state={item.state}
                />
              </div>
            );
          })
        ) : (
          <p>Cargando</p>
        )}
      </div>
      <PaginateProducts
        changePageHanlder={changePageHanlder}
        setProductList={setProductList}
      />
    </div>
  );
};
