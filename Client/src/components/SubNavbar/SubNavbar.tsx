import { Link } from "react-router-dom";
// import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { useState, useEffect } from "react";
import styles from "./SubNavbar.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getListUsers } from "../../redux/actions/userAction";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import { RootState } from "../../redux/store";

const SubNavbar = (state: any) => {
  const [changeClass, setChangeClass] = useState({
    class: styles.containerShow,
  });
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );
  const userEmail = user?.email;
  const listUsersData = useAppSelector(
    (state) => state.userReducer.listUsersData
  );
  useEffect(() => {
    (() => {
      state.show
        ? setChangeClass({ class: styles.containerShow })
        : setChangeClass({ class: styles.containerHide });
    })();
  }, [state]);

  //Aramis:Esto lo hice yo y no se que miercoles hace.
  useEffect(() => {
    dispatch(getListUsers());
  }, []);

  const admin = listUsersData.find((item) => item.email === userEmail);

  return (
    <div className={changeClass.class}>
      {admin?.admin && (
        <Link to="/users" className={styles.buttons}>
          Admin
        </Link>
      )}
      {isAuthenticated === true && (
        <>
          <Link to="/library" className={styles.buttons}>
            Library
          </Link>
          <Link to="/wish" className={styles.buttons}>
            Wish
          </Link>
          <Link to="/friends" className={styles.buttons}>
            Friends
          </Link>
        </>
      )}

      <ShoppingCart />
    </div>
  );
};
export default SubNavbar;
