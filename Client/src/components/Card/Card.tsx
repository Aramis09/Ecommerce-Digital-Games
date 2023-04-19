import styles from "./Card.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  addProductToWishList,
  checkIfProductWasPurchased,
} from "../../Controller/cardController";
import { setwishList } from "../../redux/reducer/wishReducer";
import { CardPropsType } from "../../types";
import { addProductInShoppingCart } from "../../redux/actions/shoppingCartAction";
import { RootState } from "../../redux/store";
import ImageLazyLoad from "../ImageLazyLoad/ImageLazyLoad";

export const Card = ({
  id,
  name,
  background_image,
  price,
  genres,
  images,
  state,
}: CardPropsType) => {
  const dispatch = useAppDispatch();
  const [changeClass, setChangeClass] = useState({
    classButton: styles.buttonAdd,
    classCard: styles.cardContainer,
  });
  const { user, isAuthenticated } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );
  //AramisNote: Este useEffect lo unico que hace las clases de css dinamicas.

  useEffect(() => {
    if (user) {
      checkIfProductWasPurchased(user.email, id).then((check) =>
        check
          ? setChangeClass({
              classButton: styles.buttonHide,
              classCard: styles.cardContainerBuy,
            })
          : setChangeClass({
              classButton: styles.buttonAdd,
              classCard: styles.cardContainer,
            })
      );
    }
  }, []);

  const hanldeAddProductToWishList = async () => {
    const newWishList = user && (await addProductToWishList(user.email, id));
    dispatch(setwishList(newWishList));
  };

  const handlerAddProductShoppingCart = () => {
    dispatch(
      user
        ? addProductInShoppingCart(user.email, id, null)
        : addProductInShoppingCart("noLoginUser", id, {
            id,
            name,
            background_image,
            price,
            images,
            genres,
            state,
          })
    );
  };
  return (
    <>
      <div className={changeClass.classCard}>
        <div className={styles.card}>
          {state ? (
            <Link to={`/${id}`}>
              <ImageLazyLoad url={images[0]} />
            </Link>
          ) : (
            <>
              <Link to={"/products"}>
                <ImageLazyLoad url={images[0]} />
              </Link>
            </>
          )}
          <div className={styles.containerTittleAndPrice}>
            <h3>{name}</h3>
            <p>{price}$</p>
          </div>
          <div className={styles.addShoppingCart}>
            <div className={styles.containerButton}>
              {state ? (
                <>
                  <button
                    className={changeClass.classButton}
                    type="button"
                    onClick={handlerAddProductShoppingCart}
                  >
                    Add To Cart
                  </button>
                  {/* Esto se podria hacer un componente */}
                  {isAuthenticated === true && (
                    <button
                      className={changeClass.classButton}
                      onClick={hanldeAddProductToWishList}
                    >
                      Add Favourite
                    </button>
                  )}
                </>
              ) : (
                <p>Not avivable Game</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
