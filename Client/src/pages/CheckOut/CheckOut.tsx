import styles from "./CheckOut.module.scss";
import { NavBar } from "../../components/NavBar/NavBar";
import { useAppSelector } from "../../redux/hooks/hooks";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { MakeGift } from "../../components/MakeGift/MakeGift";
import { RootState } from "../../redux/store";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
import generateLinkPay from "../../Controller/CheckoutController";
import CheckoutProducts from "../../components/CheckoutProducts/ChechoutProducts";
export const CheckOut = (): JSX.Element => {
  const [friendMail, setFriendMail] = useState<string>("");
  const [init_pointButton, setInit_PointButton] = useState<string | undefined>(
    ""
  );
  const productsShoppingCart = useAppSelector(
    (state: RootState) => state.shoppingCartReducer.productListShoopingCart
  );
  const user = useAppSelector(
    (state: RootState) => state.userReducer.currentUser.user
  );
  const handlerGetEmailForGift = (friendMail: string) => {
    setFriendMail(friendMail);
  };
  const handlerGenerateLinkForPay = async (
    emailToBill: string | undefined = user?.email
  ) => {
    //Aramis: A veces tengo que hacer verificaciones extras por el typeScript, hay cosas que ya estan controladas pero que no las toma.
    if (user && emailToBill) {
      const linkForPay = await generateLinkPay(
        productsShoppingCart,
        user.name,
        emailToBill
      );
      setInit_PointButton(linkForPay);
    }
  };
  return (
    <>
      {productsShoppingCart.length > 0 && user ? (
        <div>
          {window.innerWidth > 959 ? <NavBar /> : <NavbarPhone />}
          <section className={styles["checkout-container"]}>
            <div className={styles["form-container"]}>
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
