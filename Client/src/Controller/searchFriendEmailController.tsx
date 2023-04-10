import axios from "axios";
import { FriendConfirmed } from "../redux/interfaces/friendInterface";

export const searchFriendEmailController = async (
  emailHardCodeado: string | undefined,
  emailSearch: string
) => {
  const response: FriendConfirmed[] = (
    await axios.get(
      `http://localhost:3001/user/searchFriends?emailUser=${emailHardCodeado}&valurForSearch=${emailSearch}`
    )
  ).data;
  return response;
};
