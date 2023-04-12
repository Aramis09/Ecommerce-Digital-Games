import { useAppSelector } from "../../../redux/hooks/hooks";
import styles from "./Card.module.scss";
import { RootState } from "../../../redux/store";
import { FriendConfirmed } from "../../../redux/interfaces/friendInterface";
import { responseRequestFriendController } from "../../../Controller/FriendsController";
interface FriendCardType {
  friend: FriendConfirmed;
  wayToUpdateList: (flag: number) => void;
}
export const FriendCard = ({ friend, wayToUpdateList }: FriendCardType) => {
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );

  const hanlderRemoveFriend = (ev: React.MouseEvent<HTMLButtonElement>) => {
    user &&
      responseRequestFriendController(
        user?.email,
        friend.FriendInListEmail,
        "remove"
      ).then(() => wayToUpdateList(Math.random()));
  };
  return (
    <div className={styles.container}>
      <h4>{friend.FriendInListEmail}</h4>
      <button
        className={styles.deletFriend}
        value="remove"
        onClick={hanlderRemoveFriend}
      >
        Delete
      </button>
    </div>
  );
};
