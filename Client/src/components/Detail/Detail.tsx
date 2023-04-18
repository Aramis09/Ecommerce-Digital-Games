import { Rating } from "../Rating/Rating";
import { DetailCarousel } from "./DetailCarousel";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { useEffect, useState } from "react";
import styles from "./Detail.module.scss";
import Comments from "./Comments";
import { checkIfProductWasPurchased } from "../../Controller/cardController";
import { RootState } from "../../redux/store";
import { Game } from "../../types";
import { getProductByID } from "../../Controller/DetailController";

export const Detail = () => {
  const [porductDetail, setProductDetail] = useState<Game | false>(false);
  const [changeClass, setChangeClass] = useState({
    classButton: styles.buttonAdd,
    classCard: styles.cardContainer,
  });
  const { id }: any = useParams();
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );

  //Aramis: este useEffect debe de ser un custom hook
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
  }, [user]);

  useEffect(() => {
    getProductByID(id).then((product) => product && setProductDetail(product));
  }, []);
  return (
    <>
      <div>
        {porductDetail && (
          <div>
            <section className={styles["background-image"]}>
              <img
                src={porductDetail.background_image}
                alt={porductDetail.name}
              />
            </section>
            <section className={styles["info-container"]}>
              <div className={styles["left-section"]}>
                <div key={porductDetail.id}>
                  <h3>{porductDetail.name}</h3>
                  <p>${porductDetail.price}</p>
                  <Rating value={porductDetail.rating} size={24} />
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
                  <p className={styles.description}>
                    {porductDetail.description}
                  </p>
                  <div className={styles["right-section-info"]}>
                    <div className={styles["gender-section"]}>
                      <h4>Generos</h4>
                      <div className={styles["button-container"]}>
                        {porductDetail.genres.map(
                          (item: any, index: number) => (
                            <button key={index}>{item}</button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <DetailCarousel images={porductDetail.images} />
            <Comments />
          </div>
        )}
      </div>
    </>
  );
};
