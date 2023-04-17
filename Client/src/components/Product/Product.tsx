import { Game } from "../../types";
import { Card } from "../Card/Card";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Product.module.scss";
import { getFirstBestProducts } from "../../Controller/CarrouselController";
import { useLocalStorage } from "../../CustomHooks/useLocalStorage";
import { useCarrousel } from "../../CustomHooks/useCarrousel";

export const Product = ({ setProductsCarrousel }: any) => {
  const [topProductsData, setTopProductsData] = useLocalStorage(
    "productsHome",
    [],
    getFirstBestProducts,
    6
  );
  useCarrousel({ setProductsCarrousel, topProductsData });
  return (
    <div
      className={
        topProductsData.length > 6 ? styles["cards-products"] : styles.cards
      }
    >
      {topProductsData.length ? (
        topProductsData.map((product: any, index: number) => {
          return (
            <div key={index} className={styles.card}>
              <Card
                key={index}
                id={product.id}
                name={product.name}
                images={product.images}
                background_image={product.background_image}
                genres={product.genres}
                price={product.price}
                state={product.state}
              />
            </div>
          );
        })
      ) : (
        <p>...not found products</p>
      )}
    </div>
  );
};
