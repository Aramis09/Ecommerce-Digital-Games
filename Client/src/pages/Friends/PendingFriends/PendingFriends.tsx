import { useAppSelector } from "../../../redux/hooks/hooks";
import { useEffect, useState } from "react";
import styles from "./pendingFriends.module.scss";
import { RootState } from "../../../redux/store";
import {
  getPendingFriendList,
  pendingFriendListTypes,
  responseRequestFriendController,
} from "../../../Controller/FriendsController";

export const PendingFriends = (props: any) => {
  const [friendsPending, setFriendsPending] = useState<
    pendingFriendListTypes[]
  >([]);
  const { user, isAuthenticated } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );

  useEffect(() => {
    if (user?.email && isAuthenticated) {
      //Aramis, capaz que podemos establecer una comunicacion local entre componentes y no usar una global.
      getPendingFriendList(user?.email).then((pendingList) => {
        if (pendingList) setFriendsPending(pendingList);
      });
    }
  }, [user?.email, isAuthenticated]);

  const handlerFriendRequest = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    response: string
  ) => {
    user &&
      responseRequestFriendController(
        user?.email,
        friendsPending[0]?.UserEmail,
        ev.currentTarget.value
      ).then((newPendingFriendList) => {
        newPendingFriendList && setFriendsPending(newPendingFriendList);
        response === "accept" && props.wayFlagToUpdate(Math.random());
      });
  };

  return (
    <>
      {friendsPending.length ? (
        <div className={styles.container}>
          {friendsPending.map((pend: any, index: number) => {
            return (
              <div className={styles.cards} key={index}>
                <span className={styles.resquets}>{pend.UserEmail}</span>
                <button
                  className={styles.buttonRejected}
                  value="rejected"
                  onClick={(evt) => handlerFriendRequest(evt, "rejected")}
                >
                  X
                </button>
                <button
                  className={styles.buttonAccept}
                  value="accept"
                  onClick={(evt) => handlerFriendRequest(evt, "accept")}
                >
                  ✓
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.noFrien}>
          {/* {Aramis: esto no me gusta nada , esta vacio y ese mensaje no se si en algun momento va a eXISTIR} */}
          <span className={styles.msg}></span>
        </div>
      )}
    </>
  );
};
