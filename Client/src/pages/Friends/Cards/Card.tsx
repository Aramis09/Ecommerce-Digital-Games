import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import {
  confFriend,
  respondFriendRequest,
} from "../../../redux/actions/friendAction";
import styles from "./Card.module.scss";
import { RootState } from "../../../redux/store";

export const Cards = ({ friend, index }: any | number) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );
  const friendsConfirmed = useAppSelector(
    (state) => state.friendReducer.friendsConfirmed
  );

  const handleResponse = (ev: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      respondFriendRequest(
        user?.email,
        friendsConfirmed[0]?.FriendInListEmail,
        ev.currentTarget.value
      )
    ).then(() => {
      dispatch(confFriend(user.email));
    });
  };
  return (
    <div className={styles.container}>
      <h4>{friend.FriendInListEmail}</h4>
      <button
        className={styles.deletFriend}
        value="remove"
        onClick={handleResponse}
      >
        Delete
      </button>
    </div>
  );
};
