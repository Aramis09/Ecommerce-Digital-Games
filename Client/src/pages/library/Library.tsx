import { useEffect, useState } from "react";
import { getProductsOfLibraryById } from "../../Controller/LibraryController";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
import styles from "./Library.module.scss";
import CardLibrary from "../../components/LibraryCard/LibraryCard";
import { ProductsType } from "../../types";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks/hooks";

const Library = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );

  useEffect(() => {
    if (user?.email) {
      getProductsOfLibraryById(String(user.email)).then((products) =>
        setProducts(products)
      );
    }
  }, []);

  return (
    <div className={styles.fullContainer}>
      {products.length ? (
        <section className={styles.container}>
          {products.map((product: ProductsType) => {
            return (
              <CardLibrary
                key={product.id}
                id={product.ProductId}
                name={product.Product.name}
                background_image={product.Product.background_image}
                price={product.Product.price}
                released={product.Product.released}
              />
            );
          })}
        </section>
      ) : (
        <p>"Not found Games "</p>
      )}
    </div>
  );
};
export default Library;
