import axios from "axios"
import { LIST_PRODUCTS } from "../utils/constants"
import { Game } from "../types"

export const getFirstBestProducts= async (QuantityProducts:number):Promise<Game[]|undefined> =>{
  try {
    const bestProducts: Game[] = (await axios(`${LIST_PRODUCTS}/productsBetter?QuantityProducts=${QuantityProducts}`)).data    
    console.log("soy el controller de getFirstBestProducts")
    
    return bestProducts;
  } catch (error) {
    console.error(`Error Controller carrousel:${error}`);
  }
}