import axios from "axios";
import { LIST_PRODUCTS_BY_FILTERS } from "../utils/constants";
import { Game } from "../types";
import { filtersGeneralType } from "../components/Filters/Filters";
interface params {
  filters:filtersGeneralType
  pageNumber:number
}
export const getProductsFiltered = async ({filters ,pageNumber}:params):Promise<Game[]|undefined> => {
  try{
      const listProducts:Game[] = (await axios.post(`${LIST_PRODUCTS_BY_FILTERS}?pageNumber=${pageNumber}`, filters)).data;
      console.log("entramos a products y cargamos -----------------");
      return listProducts
    }catch(error){
      console.log("Ocurrio un error...intentelo mas tarde, controller Filters");
  }
}