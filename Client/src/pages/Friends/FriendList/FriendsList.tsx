import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { confFriend } from "../../../redux/actions/friendAction";
import { useEffect } from "react";
import { Cards } from "../Cards/Card";
import { useState } from "react";
import styles from "./listFriend.module.scss";
import { searchFriendEmailController } from "../../../Controller/searchFriendEmailController";
import { RootState } from "../../../redux/store";
import { FriendConfirmed } from "../../../redux/interfaces/friendInterface";

export const FriendsList = (flag: any) => {
  const dispatch = useAppDispatch();
  const [friendListResponse, setFriendListResponse] = useState<
    FriendConfirmed[]
  >([]);
  const friendsConfirmed = useAppSelector(
    (state) => state.friendReducer.friendsConfirmed
  );
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );
  const emailUser = user?.email;

  useEffect(() => {
    user && dispatch(confFriend(user?.email));
  }, [user?.email, flag]);

  useEffect(() => {
    setFriendListResponse(friendsConfirmed);
  }, [friendsConfirmed]);

  const searchFriendEmailHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const emailSearch = event.target.value;
    if (!emailSearch.length && user) {
      dispatch(confFriend(user?.email));
    }
    searchFriendEmailController(emailUser, emailSearch).then((friend) =>
      setFriendListResponse(friend)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerCards}>
        <input
          className={styles.inputSearch}
          onChange={(event) => searchFriendEmailHandler(event)}
          placeholder="Find your friend"
        ></input>

        {friendListResponse.map((friend: any, index: number) => {
          return <Cards key={index} friend={friend} />;
        })}
      </div>
    </div>
  );
};
