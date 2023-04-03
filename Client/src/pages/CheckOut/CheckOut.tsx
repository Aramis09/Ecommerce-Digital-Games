import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./CheckOut.module.scss";
import { useAppSelector } from "../../redux/hooks/hooks";
import { MERCADO_PAGO_LINK } from "../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MakeGift } from "../../components/MakeGift/MakeGift";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
import discountIcon from "../../assets/discount-2.svg";
import { RootState } from "../../redux/store";

export const CheckOut = () => {
  const { user, isAuthenticated, loginWithPopup, logout }: any = useAuth0();
  const [friendMail, setFriendMail] = useState<string | null>("");
  const [init_pointButton, setInit_PointButton] = useState<boolean | string>(
    false
  );
  const productsShoppingCart = useAppSelector(
    (state: RootState) => state.shoppingCartReducer.productListShoopingCart
  );
  //Aramis:Esto setea si hay un amigo( en nombre no ayuda)
  const handleChildVariable = (friendMail: string | null) => {
    setFriendMail(friendMail);
  };
  //Aramis:Quien es steve  y porque es un total? steve esta bien ? steve pasa frio ?
  var steveTotal = 0;
  //Aramis:Mandara la informacion al back-end para que se genere el link de pago
  //Aramis:Deberia ser un controller.
  const fetchCheckout = async () => {
    let client = {
      name: user.name,
      email: user.email,
    };
    //Aramis:verifica si se lo regalara a un amigo
    if (friendMail) {
      client.email = friendMail;
    }
    //Aramis:Hace la request para  que se setee el link de pago
    let redirectLink: any = (
      await axios.post(MERCADO_PAGO_LINK, { items, client, discount })
    ).data.response;
    //Setea el link para ponerle en un ancor y asi poder acceder.
    if (await redirectLink.init_point) {
      setInit_PointButton((prev) => (prev = redirectLink.init_point));
    }
  };

  if (productsShoppingCart.length > 0) {
    //Aramis:Esta pregunta esta mal puesta aqui.
    return (
      <>
        {window.innerWidth > 959 ? <NavBar /> : <NavbarPhone />}
        <section className={styles["checkout-container"]}>
          <div className={styles["form-container"]}>
            {user?.email_verified && isAuthenticated ? (
              <div className={styles.checked}>
                <h4 className={styles.title}>
                  ¿Do you want to make the purchase?
                </h4>
                <MakeGift onVariableChange={handleChildVariable} />
                <button
                  className={styles["form-button"]}
                  onClick={fetchCheckout}
                >
                  Generate Payment Link
                </button>
                <div>
                  {init_pointButton && (
                    <a href={`${init_pointButton}`}>
                      <button>Pay</button>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.noRegister}>
                <h4>Please register to be able to make a purchase.</h4>
                <button
                  className={styles.loginButton}
                  onClick={() => loginWithPopup()}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
          <div>
            <div className={styles["items-container"]}>
              <h4>Products</h4>
              <div className={styles["card-container"]}>
                {productsShoppingCart.map((game: any, index) => (
                  <div key={index} className={styles["card-item"]}>
                    <img src={game.background_image} />
                    <h5>{game.name}</h5>
                    <p>${game.price}</p>
                  </div>
                ))}
                <p className={styles.price}>
                  Amount Payable: ${"totalAmount,tengo que agregar"}
                </p>
                {steveTotal > 0 && (
                  <div className={styles.finalDiscount}>
                    <img src={discountIcon} alt="" />
                    <p className={styles.price}>
                      Final Price Discount: ${steveTotal}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <div>{!productsShoppingCart.length ? <Navigate to="/" /> : <></>}</div>
    );
  }
};
