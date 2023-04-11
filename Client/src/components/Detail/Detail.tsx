import { Rating } from "../Rating/Rating";
import { DetailCarousel } from "./DetailCarousel";
import { useParams } from "react-router-dom";
import { getProductByID } from "../../redux/actions/productAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useEffect, useState } from "react";
import { eraseItemById } from "../../redux/reducer/productReducer";
import styles from "./Detail.module.scss";
import Comments from "./Comments";
import { checkIfProductWasPurchased } from "../../Controller/cardController";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
import { RootState } from "../../redux/store";

export const Detail = () => {
  const [changeClass, setChangeClass] = useState({
    classButton: styles.buttonAdd,
    classCard: styles.cardContainer,
  });
  const { id }: any = useParams();
  const dispatch = useAppDispatch();
  const game: any = useAppSelector((state) => state.productReducer.details);
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );

  useEffect(() => {
    dispatch(getProductByID(parseInt(id)));
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
    return () => {
      dispatch(eraseItemById());
    };
  }, [user]);

  return (
    <>
      {/* {window.innerWidth > 959 ? <NavBar /> : <NavbarPhone />} */}
      <div>
        {game.name && (
          <div>
            <section className={styles["background-image"]}>
              <img src={game.background_image} alt={game.name} />
            </section>
            <section className={styles["info-container"]}>
              <div className={styles["left-section"]}>
                <div key={game.id}>
                  <h3>{game.name}</h3>
                  <p>${game.price}</p>
                  <Rating value={game.rating} size={24} />
                  <button
                    className={changeClass.classButton}
                    type="button"
                    // onClick={addingToShoppingCart}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
              <div className={styles["right-section"]}>
                <div>
                  <p className={styles.description}>{game.description}</p>
                  <div className={styles["right-section-info"]}>
                    <div className={styles["gender-section"]}>
                      <h4>Generos</h4>
                      <div className={styles["button-container"]}>
                        {game.genres.map((item: any, index: number) => (
                          <button key={index}>{item}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <DetailCarousel images={game.images} />
            <Comments />
          </div>
        )}
      </div>
    </>
  );
};
