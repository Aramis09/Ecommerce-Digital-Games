import { useState, useEffect } from "react";
import { PriceSlider } from "../PriceSlider/PriceSlider";
import styles from "./Filters.module.scss";
import { genreType, getListGenres } from "../../Controller/GenresController";
import { inititalStateFilters } from "./until";
interface filterPropertyType {
  genres: number[];
  platform: [];
  priceRange: number[];
}
interface orderTypes {
  alphabetic: string;
  price: string;
}
export interface filtersGeneralType {
  name: string;
  filters: filterPropertyType;
  order: orderTypes;
}
const optionOrder = ["ASC", "DESC"];

export const Filters = ({ flag, updateListProducts, setPageNumber }: any) => {
  //Aramis: Esto tiene que ser un solo estado global que sea un objeto que contenga todo (menos la clase).
  const [genresOpen, setGenresOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [changeClass, setChangeClass] = useState({
    classContainer: styles.containerHide,
  });
  //Aramis:Esto modifica el atributo de la etiqueta select, para mobile o desktop.
  const [selectAttribute, setSelectAttribute] = useState(true);
  const [genresList, setGenresList] = useState<genreType[]>([]);
  const [filters, setFilters] =
    useState<filtersGeneralType>(inititalStateFilters);
  useEffect(() => {
    flag
      ? setChangeClass({ classContainer: styles.containerShow })
      : setChangeClass({ classContainer: styles.containerHide });
  }, [flag]);

  //Tengo que establecer la comunicacion entre el componenete padre, hijo y el hijo con priceSlider
  useEffect(() => {
    getListGenres().then(
      (genresList) => genresList && setGenresList(genresList)
    );
    function handleResize() {
      setSelectAttribute(window.innerWidth > 767);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlerAddGenreToFilters = (dato: any) => {
    //Capaz que seria bueno modularizarlo y llevar todo el armado del objeto a un controller, el componente es muy grande.
    const genreId = Number(dato.target.value);
    setFilters({
      ...filters,
      filters: {
        genres: [genreId],
        platform: [],
        priceRange: filters.filters.priceRange,
      },
    });
  };

  const handlerAddOrderToFilters = (evt: any) => {
    setFilters({
      ...filters,
      order: {
        alphabetic: evt.target.value,
        price: "",
      },
    });
  };
  // console.log(filters);

  const handlerAddPriceRangeToFilters = (priceRange: number[]): void => {
    setFilters({
      ...filters,
      filters: {
        genres: filters.filters.genres,
        platform: [],
        priceRange: priceRange,
      },
    });
  };
  return (
    <div className={changeClass.classContainer}>
      <aside className={styles["filters-container"]}>
        <div className={styles["options-container"]}>
          <label
            className={styles["label-tittle"]}
            onClick={() => {
              if (orderOpen) {
                setOrderOpen(false);
                setGenresOpen(!genresOpen);
              } else {
                setGenresOpen(!genresOpen);
              }
            }}
          >
            Genres
          </label>
          <select
            multiple={selectAttribute}
            className={genresOpen ? styles.open : ""}
          >
            {genresList.map((item: any, index: number) => (
              <option
                key={index}
                value={item.id}
                onClick={handlerAddGenreToFilters}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["options-container"]}>
          <label className={styles["label-tittle"]}>Price</label>
          {/* Aramis:Tengo que  establecer una comunicacion de abajo hacia arriba con el PriceSlicer */}
          <PriceSlider sendUpPriceRange={handlerAddPriceRangeToFilters} />
        </div>
        <div className={styles["options-container"]}>
          <label
            className={styles["label-tittle"]}
            onClick={() => {
              if (genresOpen) {
                setGenresOpen(false);
                setOrderOpen(!orderOpen);
              } else {
                setOrderOpen(!orderOpen);
              }
            }}
          >
            Order
          </label>
          <select
            multiple={selectAttribute}
            className={orderOpen ? styles.open : ""}
          >
            {optionOrder.map((option) => (
              <option
                key={option}
                value={option}
                onClick={handlerAddOrderToFilters}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          className={styles.buttonFilter}
          onClick={() => updateListProducts(filters)}
        >
          Apply Filter
        </button>
        <button
          className={styles.buttonFilter}
          onClick={() => {
            updateListProducts(inititalStateFilters);
          }}
        >
          Reset
        </button>
      </aside>
    </div>
  );
};
