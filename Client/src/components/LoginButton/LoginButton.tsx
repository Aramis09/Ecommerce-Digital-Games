import { useAuth0 } from "@auth0/auth0-react";
import style from "./LoginButton.module.scss";
import { Link } from "react-router-dom";
interface LoginType {
  from: string;
}
export const Login = ({ from }: LoginType): JSX.Element => {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const saveToken = (getAccessTokenSilently: string) => {
    window.localStorage.setItem("token", getAccessTokenSilently);
  };
  return (
    <>
      {isAuthenticated ? (
        from === "shoopingCart" ? (
          <Link to="/checkout">
            <p>CHECKOUT</p>
          </Link>
        ) : (
          <button
            className={style.loginButton}
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            LOG OUT
          </button>
        )
      ) : (
        <button
          className={style.loginButton}
          onClick={async () => {
            loginWithRedirect();
            const token = await getAccessTokenSilently();
            saveToken(token);
          }}
        >
          LOG IN
        </button>
      )}
    </>
  );
};
