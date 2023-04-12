import react, { useEffect } from "react";
import { getAllProductInWishList } from "../../redux/actions/wishActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { RootState } from "../../redux/store";
import styles from "./WishList.module.scss";
import WishCard from "../../components/WhishCard/WishCard";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";

const WishList = () => {
  const wishListStore = useAppSelector(
    (state: RootState) => state.wishReducer.wishList
  );
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const email: string = String(user?.email);
    if (user?.email) {
      dispatch(getAllProductInWishList(email));
    }
  }, [user]);

  return (
    <>
      {wishListStore.length ? (
        <section className={styles.container}>
          <p className={styles.top}>WhisList</p>
          <div className={styles.tittles}>
            <p className={styles.tittle}>Name</p>
            <p className={styles.tittle}>Price</p>
            <p className={styles.tittle}>Released</p>
          </div>
          <br />
          <section className={styles.containerCardsList}>
            {wishListStore.map((wishProduct: any) => {
              return (
                <WishCard
                  key={Number(wishProduct.id)}
                  id={Number(wishProduct.id)}
                  email={String(user?.email)}
                  name={wishProduct.name}
                  background_image={wishProduct.background_image}
                  price={wishProduct.price}
                  released={wishProduct.released}
                />
              );
            })}
          </section>
        </section>
      ) : (
        <p>Not found Products</p>
      )}
    </>
  );
};
export default WishList;
