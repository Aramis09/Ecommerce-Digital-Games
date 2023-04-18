import axios from "axios"
import { LIST_PRODUCTS } from "../utils/constants"
import { Game } from "../types"

export const getFirstBestProducts= async (QuantityProducts:number):Promise<Game[]|undefined> =>{
  try {
    const bestProducts: Game[] = (await axios(`${LIST_PRODUCTS}/productsBetter?QuantityProducts=${QuantityProducts}`)).data    
    return bestProducts;
  } catch (error) {
    console.error(`Error Controller carrousel:${error}`);
  }
}