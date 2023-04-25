import { useState } from "react";
import { Link } from "react-router-dom";
import buttonIcon1 from "../../assets/circle-1-filled.svg";
import buttonIcon2 from "../../assets/circle-2-filled.svg";
import buttonIcon3 from "../../assets/circle-3-filled.svg";
import styles from "./Carousel.module.scss";
import { Game } from "../../types";
interface CarrouselType {
  bestThreeProducts: Game[];
}
export const Carousel = ({ bestThreeProducts }: CarrouselType): JSX.Element => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <>
      <div className={styles["carousel-container"]}>
        {bestThreeProducts.length ? (
          bestThreeProducts.map((item: Game, index: number) => {
            return (
              <div key={index} className={styles["card-carousel"]}>
                <div className={styles["img-carousel"]}>
                  {currentImage === index ? (
                    <Link to={`/${item.id}`}>
                      <img src={item.background_image} alt={item.name} />
                    </Link>
                  ) : null}
                </div>
                <div className={styles["description-carousel"]}>
                  {currentImage === index ? (
                    <>
                      <div className={styles.description}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            );
          })
        ) : (
          <p>...loading</p>
        )}
      </div>
      <div className={styles["carousel-buttons--change"]}>
        <img src={buttonIcon1} alt="" onClick={() => setCurrentImage(0)} />
        <img src={buttonIcon2} alt="" onClick={() => setCurrentImage(1)} />
        <img src={buttonIcon3} alt="" onClick={() => setCurrentImage(2)} />
      </div>
    </>
  );
};
