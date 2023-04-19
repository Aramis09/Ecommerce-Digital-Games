import { Filters, filtersGeneralType } from "../../components/Filters/Filters";
import { useState } from "react";
import styles from "./Products.module.scss";
import iconFilters from "./images/filter.png";
import { PaginateProducts } from "../../components/PaginateProducts/PaginateProducts";
import { useNavigatePaginate } from "../../CustomHooks/useNavigatePaginate";
import {
  inititalStateFilters,
  paramsToRenderListProducts,
} from "../../utils/constants";
import { Product } from "../../components/Product/Product";

export const Products = () => {
  const [changeClass, setChangeClass] = useState(false);
  const [filters, setFilters] =
    useState<filtersGeneralType>(inititalStateFilters);

  const [productList, setProductList, nextPaginate, modifyParams] =
    useNavigatePaginate(paramsToRenderListProducts);

  const getProductsWithConditions = (
    // Capaz que pueda mejorar este parametro currentPage poniendo un valor por defecto
    filters: filtersGeneralType,
    currentPage: number = 1
  ) => {
    setFilters(filters);
    modifyParams({ filters });
  };

  const changePageHanlder = (ev: any) => {
    const currentPageNumber: number = Number(ev.target.value);
    nextPaginate(currentPageNumber);
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
        <Product products={productList} />
      </div>
      <PaginateProducts
        changePageHanlder={changePageHanlder}
        setProductList={setProductList}
      />
    </div>
  );
};
