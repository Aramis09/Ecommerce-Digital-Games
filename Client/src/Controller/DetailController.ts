import axios from "axios";
import { LIST_PRODUCTS } from "../utils/constants";
import { Game } from "../types";

export const getProductByID =  async (id: number):Promise<Game|undefined> => {
  try{
      let product:Game = (await axios.get(LIST_PRODUCTS + id)).data;
      return product
  }catch(error){
      console.log("Ocurrio un error...intentelo mas tarde");
  }
}