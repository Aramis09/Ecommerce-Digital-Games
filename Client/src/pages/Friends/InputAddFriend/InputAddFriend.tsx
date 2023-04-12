import { useAppSelector, useAppDispatch } from "../../../redux/hooks/hooks";
import React, { useState } from "react";
import styles from "./addFriends.module.scss";
import { RootState } from "../../../redux/store";
import { addNewFriend } from "../../../Controller/FriendsController";

export const InputAddFriend = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );
  const [emailFriendFromInput, setEmailFriendFromInput] = useState("");

  const handlerAddFriend = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const emailUser = user?.email;
    if (event.key === "Enter" && user && emailUser) {
      addNewFriend(emailUser, emailFriendFromInput);
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
