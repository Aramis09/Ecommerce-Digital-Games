import { ShoppingCartType } from "../redux/interfaces/shoppingCartInterface";
import axios from "axios";
import { MERCADO_PAGO_LINK } from "../utils/constants";
interface clientType {
	name: string
	email: string | null
}
interface verifyDiscountType {
	amountWithoutDiscount: number
	amountWithDiscount:number
}
//AramisWork:Este discount tiene que venir de un estado global y borrarse de aqui.
let discount = {
		genre: "Action",
		discount: 20,
};
const generateLinkPay = async (productsShoppingCart:ShoppingCartType[],nameUser:string,emailToBill:string):Promise<string | undefined> => {
	//Aramis: Esto tiene que tener un manejo del error en caso de que las cosas fallen.
	try {
		const items = productsShoppingCart;
		const client:clientType = {
				name: nameUser,
				email: emailToBill
		};
		let  dataMercadoPago = (
			await axios.post(MERCADO_PAGO_LINK, {
				items,
				client,
				discount,
			})
			).data.response;
		return dataMercadoPago.init_point;
	} catch (error) {
		console.log(error)
	}
	
};

export const calculatePrice = (products: ShoppingCartType[]):verifyDiscountType  => { 
	let amountWithoutDiscount = 0;
	let amountForPay = 0;
	products.forEach(
		product => {
			amountWithoutDiscount = amountWithoutDiscount + Number(product.price);
			const priceWithDiscount: number = verifyDiscount(product);
			amountForPay = amountForPay + priceWithDiscount;
		}
    );
	
    return {
		amountWithoutDiscount:Number(amountWithoutDiscount.toFixed(2)),
		amountWithDiscount: Number(amountForPay.toFixed(2))
	};
  };

  const verifyDiscount = (product:ShoppingCartType):number => {
	const  verify = product.Genres.some(genreObj => genreObj.name === discount.genre);
	if(verify) {
		const amountForDiscount = Number(product.price)*(discount.discount/100);
		return Number(product.price) - amountForDiscount;
	};
	return Number(product.price);
  };

export default generateLinkPay;


