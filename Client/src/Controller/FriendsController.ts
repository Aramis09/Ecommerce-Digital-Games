import axios from "axios";
import { LIST_USERS } from "../utils/constants";
import { FriendConfirmed } from "../redux/interfaces/friendInterface";
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
	console.log("pues si");
	console.log(emailFriend,emailUser,response);
	
		
	try {
			await axios.get(LIST_USERS + `responseRequestFriend?email=${emailUser}&emailFriend=${emailFriend}&response=${response}`)
			const pendingFriendList = await getPendingFriendList(emailUser).then(pendingFriendsList => pendingFriendsList)
			return pendingFriendList;
		} catch (error) {
			console.error('Esto ocurrio en el back ' + error);
		};
};

export const friendAddedListController = async (emailUser: string) => {
	try {
		let friendList: FriendConfirmed[] = (await axios.get(LIST_USERS + `friendsConfirmed?email=${emailUser}`)).data;
		return friendList;
		
	} catch (error) {
		console.error('Esto ocurrio en el back ' + error);
	};
};