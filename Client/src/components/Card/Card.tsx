import styles from "./Card.module.scss";
import { useAppSelector } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkIfProductWasPurchased } from "../../Controller/cardController";
import { CardPropsType } from "../../types";
import { RootState } from "../../redux/store";
import ImageLazyLoad from "../ImageLazyLoad/ImageLazyLoad";
import ButtonAddFavourites from "../ButtonAddFavourites/ButtonAddFavourites";
import ButtonAddShoopingCart from "../ButtonAddShoppingCart/ButtonAddShoopingCart";
import ErrorNotFound from "../ErrorNotFound/ErrorNotFound";

export const Card = ({
  id,
  name,
  background_image,
  price,
  genres,
  images,
  state,
}: CardPropsType) => {
  const productData = {
    id,
    name,
    background_image,
    price,
    genres,
    images,
    state,
  };
  const [changeClass, setChangeClass] = useState({
    classButton: styles.buttonAdd,
    classCard: styles.cardContainer,
  });
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );
  //AramisNote: Este useEffect lo unico que hace las clases de css dinamicas.
  //Esto me gustaria que sea un solo customHook que se encargue de todos los cambios de clase
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

  return (
    <>
      <div className={changeClass.classCard}>
        <div className={styles.card}>
          <Link to={`${state ? "/" + id : window.location.pathname}`}>
            <ImageLazyLoad url={images[0]} />
          </Link>
          <div className={styles.containerTittleAndPrice}>
            <h3>{name}</h3>
            <p>{price}$</p>
          </div>
          {state ? (
            <div className={styles.addShoppingCart}>
              <ButtonAddShoopingCart id={id} productData={productData} />
              <ButtonAddFavourites id={id} />
            </div>
          ) : (
            <ErrorNotFound from="card" />
          )}
        </div>
      </div>
    </>
  );
};
