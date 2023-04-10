import { NavBar } from "../../components/NavBar/NavBar";
import { InputAddFriend } from "./InputAddFriend/InputAddFriend";
import { PendingFriends } from "./PendingFriends/PendingFriends";
import { FriendsList } from "./FriendList/FriendsList";
import styles from "./Friends.module.scss";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
import { useState } from "react";

export const Friends = () => {
  const [flagFriendWasAccepted, setFlag] = useState(0);

  const wayToSendFlag = (signal: number) => {
    setFlag(signal);
  };

  return (
    <div>
      {window.innerWidth > 959 ? <NavBar /> : <NavbarPhone />}
      <div className={styles.container}>
        <div className={styles.containerPendings}>
          <InputAddFriend />
          <PendingFriends wayFlagToUpdate={wayToSendFlag} />
        </div>
        <div className={styles.containerListFriends}>
          <FriendsList flag={flagFriendWasAccepted} />
        </div>
      </div>
    </div>
  );
};
