import { ShoppingCartType } from "../redux/interfaces/shoppingCartInterface";
import axios from "axios";
import { MERCADO_PAGO_LINK } from "../utils/constants";
interface clientType {
	name: string
	email: string | null
}
const generateLinkPay = async (productsShoppingCart:ShoppingCartType[],nameUser:string,emailToBill:string) => {
	//AramisWork:Este discount tiene que venir de un estado global y borrarse de aqui.
	let discount = {
			genre: "Action",
			discount: 20,
	};
	const items = productsShoppingCart;
	const client:clientType = {
			name: nameUser,
			email: emailToBill
	};

	let  dataMercadoPago: any = (
			await axios.post(MERCADO_PAGO_LINK, {
			items,
			client,
			discount,
			})
	).data.response;
	//Setea el link para ponerle en un ancor y asi poder acceder.
	if (dataMercadoPago.init_point) return dataMercadoPago.init_point;
};

export default generateLinkPay;