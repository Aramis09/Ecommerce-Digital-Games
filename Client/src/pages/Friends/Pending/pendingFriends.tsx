import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { pendingFriend, resReque } from "../../../redux/actions/friendAction";
import { useEffect } from "react";
import styles from "./pendingFriends.module.scss";
import { RootState } from "../../../redux/store";

export const PendingFr = (props: any) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );
  const friendsPending = useAppSelector(
    (state) => state.friendReducer.FriendsPending
  );

  useEffect(() => {
    if (user?.email && isAuthenticated) {
      dispatch(pendingFriend(user?.email));
    }
  }, [user?.email, isAuthenticated]);
  //console.log()(props)
  const handleResponse = (ev: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      resReque(
        user?.email,
        // @ts-ignore
        friendsPending[0]?.UserEmail,
        ev.currentTarget.value
      )
    ).then(() => {
      dispatch(pendingFriend(user?.email));
    });
    // @ts-ignore
    if (String(ev.target.value) === "accept") {
      props.wayFlagToUpdate(Math.random());
    }
  };

  if (user?.email_verified && isAuthenticated) {
    if (friendsPending.length > 0) {
      return (
        <div className={styles.container}>
          {/* <span className={styles.user}>Your Friends Requests: {user?.name}</span> */}
          {friendsPending.map((pend: any, index: number) => {
            return (
              <div className={styles.cards} key={index}>
                <span className={styles.resquets}>{pend.UserEmail}</span>
                <button
                  className={styles.buttonRejected}
                  value="rejected"
                  onClick={handleResponse}
                >
                  X
                </button>
                <button
                  className={styles.buttonAccept}
                  value="accept"
                  onClick={handleResponse}
                >
                  ✓
                </button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className={styles.noFrien}>
          <span className={styles.msg}></span>
        </div>
      );
    }
  } else {
    return (
      <div className={styles.noReg}>
        <span className={styles.register}>Register to add your friends</span>
      </div>
    );
  }
};
