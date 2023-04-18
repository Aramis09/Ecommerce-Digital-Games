import axios from "axios";
import { LIST_GENRES } from "../utils/constants";
export interface genreType {
  id:number
  name:string
}
export const getListGenres =  async ():Promise<genreType[] |undefined> => {
  try{
      const arrayGenres: genreType[] = (await axios.get(LIST_GENRES)).data;
      return arrayGenres
  }catch(error){
      console.log("Exception - getListGenres: " + error);
  }
}