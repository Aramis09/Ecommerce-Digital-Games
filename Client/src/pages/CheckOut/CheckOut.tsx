import styles from "./CheckOut.module.scss";
import { NavBar } from "../../components/NavBar/NavBar";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { MakeGift } from "../../components/MakeGift/MakeGift";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";

import { RootState } from "../../redux/store";
import generateLinkPay from "../../Controller/CheckoutController";
import CheckoutProducts from "../../components/CheckoutProducts/ChechoutProducts";
//Tengo que hacer un solo boton para iniciar sesion, asi no se repira muchas veces lo mismo
export const CheckOut = (): JSX.Element => {
  const { user, isAuthenticated, loginWithPopup, logout }: any = useAuth0();
  const [friendMail, setFriendMail] = useState<string>("");
  const [init_pointButton, setInit_PointButton] = useState<string>("");
  const productsShoppingCart = useAppSelector(
    (state: RootState) => state.shoppingCartReducer.productListShoopingCart
  );
  const handlerGetEmailForGift = (friendMail: string) => {
    setFriendMail(friendMail);
  };
  const handlerGenerateLinkForPay = async (
    emailToBill: string = user.email
  ) => {
    const linkForPay = await generateLinkPay(
      productsShoppingCart,
      user.name,
      emailToBill
    );
    setInit_PointButton(linkForPay);
  };
  return (
    <>
      {productsShoppingCart.length > 0 ? (
        <div>
          {window.innerWidth > 959 ? <NavBar /> : <NavbarPhone />}
          <section className={styles["checkout-container"]}>
            <div className={styles["form-container"]}>
              {user?.email_verified && isAuthenticated ? (
                <div className={styles.checked}>
                  <h4 className={styles.title}>
                    ¿Do you want to make the purchase?
                  </h4>
                  <MakeGift onVariableChange={handlerGetEmailForGift} />
                  <button
                    className={styles["form-button"]}
                    onClick={() =>
                      friendMail
                        ? handlerGenerateLinkForPay(friendMail)
                        : handlerGenerateLinkForPay()
                    }
                  >
                    Generate Payment Link
                  </button>
                  <div>
                    {!!init_pointButton && (
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
            <CheckoutProducts products={productsShoppingCart} />
          </section>
        </div>
      ) : (
        <div>{!productsShoppingCart.length ? <Navigate to="/" /> : <></>}</div>
      )}
    </>
  );
};
