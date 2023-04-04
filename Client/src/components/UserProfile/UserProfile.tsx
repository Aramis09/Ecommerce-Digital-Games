import styles from "./UserProfile.module.scss";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks/hooks";

export const UserProfile = () => {
  const { user } = useAppSelector(
    (state: RootState) => state.userReducer.currentUser
  );
  const userEmail = user?.email;
  const name = user?.name;
  const profileImage = user?.picture;
  const isEmailVerified = user?.email_verified; // es un boleano

  return (
    <div className="user-profile">
      <h6>Name: {name}</h6>
      <h6>E-mail: {userEmail}</h6>
      <h6>Is verified: {String(isEmailVerified)}</h6>
      <h6>
        Picture: <img src={profileImage} className={styles["user-img"]}></img>
      </h6>
    </div>
  );
};
