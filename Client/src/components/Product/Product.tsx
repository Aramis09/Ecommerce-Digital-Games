import { Card } from "../Card/Card";
import styles from "./Product.module.scss";
import { Game } from "../../types";

export const Product = ({ products }: any) => {
  return (
    <div className={styles.cards}>
      {products.length ? (
        products.map((product: Game, index: number) => {
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
