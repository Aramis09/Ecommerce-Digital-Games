import axios from "axios";
import { LIST_PRODUCTS_BY_FILTERS } from "../utils/constants";
import { Game } from "../types";
import { filtersGeneralType } from "../components/Filters/Filters";

export const getProductsFiltered = async (filters: filtersGeneralType,pageNumber:number):Promise<Game[]|undefined> => {
  try{
      const listProducts:Game[] = (await axios.post(`${LIST_PRODUCTS_BY_FILTERS}?pageNumber=${pageNumber}`, filters)).data;
      console.log(listProducts);
      return listProducts
      
    }catch(error){
      console.log("Ocurrio un error...intentelo mas tarde, controller Filters");
  }
}