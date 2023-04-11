import { useAppSelector } from "../../../redux/hooks/hooks";
import { useEffect } from "react";
import { FriendCard } from "../FriendCard/FriendCard";
import { useState } from "react";
import styles from "./listFriend.module.scss";
import { searchFriendEmailController } from "../../../Controller/searchFriendEmailController";
import { RootState } from "../../../redux/store";
import { FriendConfirmed } from "../../../redux/interfaces/friendInterface";
import { friendAddedListController } from "../../../Controller/FriendsController";

export const FriendsList = (flag: any) => {
  //AramisWork:Tengo que buscar la forma que no pueda entrar a la page Friend un invitado
  const [updateList, setUpdateList] = useState<number>(0);
  const [friendListResponse, setFriendListResponse] = useState<
    FriendConfirmed[]
  >([]);
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );

  console.log(flag, "vengo de lista de amigos");
  useEffect(() => {
    user &&
      friendAddedListController(user.email).then(
        (fiendList) => fiendList && setFriendListResponse(fiendList)
      );
  }, [user, flag, updateList]);

  const searchFriendEmailHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const emailSearch = event.target.value;
    if (emailSearch && user) {
      searchFriendEmailController(user?.email, emailSearch).then((friend) =>
        setFriendListResponse(friend)
      );
      return;
    }
    setUpdateList(Math.random());
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
          return (
            <FriendCard
              key={index}
              friend={friend}
              wayToUpdateList={(flag: number): void => setUpdateList(flag)}
            />
          );
        })}
      </div>
    </div>
  );
};
