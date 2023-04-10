import axios from "axios";
import { LIST_USERS } from "../utils/constants";
export interface pendingFriendListTypes {
    FriendInListEmail:string
    UserEmail:string
    accept:string
}
export const getPendingFriendList = async (emailUser:string):Promise<pendingFriendListTypes[] | undefined> => {
    try {
		let pendingFriendList: pendingFriendListTypes[] = (await axios.get(LIST_USERS + `friendsPending?email=${emailUser}`)).data;
        return pendingFriendList;
	} catch (error) {
		console.error('Server is dead, FriendsController ' + error);
	};
};

export const responseRequestFriendController = async (emailUser:string,emailFriend:string,response:string):Promise<pendingFriendListTypes[] | undefined> => {
		try {
			(await axios.get(LIST_USERS + `responseRequestFriend?email=${emailUser}&emailFriend=${emailFriend}&response=${response}`)).data;
            const pendingFriendsList= await getPendingFriendList(emailUser);
            return pendingFriendsList;
        } catch (error) {
			console.error('Esto ocurrio en el back ' + error);
		};
};