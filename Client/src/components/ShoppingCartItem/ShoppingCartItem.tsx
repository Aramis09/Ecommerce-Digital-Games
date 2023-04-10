import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./ShoppingCartItem.module.scss";
import { useEffect, useState } from "react";
import {
  getProductSoppingCart,
  removeProductOfShoppingCart,
} from "../../redux/actions/shoppingCartAction";
import { RootState } from "../../redux/store";
import { ShoppingCartType } from "../../redux/interfaces/shoppingCartInterface";
import { Login } from "../LoginButton/LoginButton";

export const ShoppingCartItem = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loginWithRedirect }: any = useAuth0();
  const productsInShoopingCart = useAppSelector(
    (state: RootState) => state.shoppingCartReducer.productListShoopingCart
  );

  return (
    <>
      {productsInShoopingCart.length ? (
        <div>
          <table className={style.table}>
            <tbody className={style.tbody}>
              {productsInShoopingCart.map((item: any, index) => (
                <tr key={index}>
                  <td className={style.item}> {item.name}</td>
                  <td className={style.item}> ${item.price}</td>
                  <button
                    onClick={() =>
                      user
                        ? dispatch(
                            removeProductOfShoppingCart(user.email, item.id)
                          )
                        : dispatch(
                            removeProductOfShoppingCart("noLoginUser", item.id)
                          )
                    }
                  >
                    X
                  </button>
                </tr>
              ))}
              <tr className={style.priceTotal}>
                {/* <td>Amount Payable{` $${totalAmount}`}</td> */}
              </tr>
            </tbody>
          </table>
          {}
          <button className={style.checkout}>
            <Login from="shoopingCart" />
          </button>
        </div>
      ) : (
        <div>
          <div>
            <p className={style.cartClean}>Empty Shopping Cart</p>
          </div>
        </div>
      )}
    </>
  );
};
