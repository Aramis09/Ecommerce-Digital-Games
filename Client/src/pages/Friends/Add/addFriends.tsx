import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hooks";
import { addFriend, confFriend } from "../../../redux/actions/friendAction";
import { useEffect, useState } from "react";
import styles from "./addFriends.module.scss";
import { RootState } from "../../../redux/store";

export const AddiFriend = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );
  const [emailFriendFromInput, setEmailFriendFromInput] = useState("");

  const handlerAddFriend = (event: any) => {
    const emailUser = user?.email;
    //AramisWork: me marca el error porque tengo que agregar un if de verificacion para ver si user existe.
    if (event.keyCode === 13) {
      dispatch(addFriend(emailUser, emailFriendFromInput));
      dispatch(confFriend(user?.email));
      setEmailFriendFromInput("");
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={emailFriendFromInput}
        placeholder="send request"
        onChange={(ev) => setEmailFriendFromInput(ev.target.value)}
        onKeyDown={handlerAddFriend}
      />
    </div>
  );
};
