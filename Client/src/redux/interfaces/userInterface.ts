import { User } from "../../types"
import {ShoppinCartConexion}from "../interfaces/shoppingCartInterface"
interface DataProduct {
  ShoppingCart:ShoppinCartConexion
  background_image:string
  created:boolean
  description:string
  id:number
  name:string
  playtime:number
  price:string
  rating:string
  released:string
  state:boolean

}
export interface DataUser {
  Products:DataProduct
  admin:boolean
  blocked:boolean
  email:string
  image:string
  name:string
  secret:string

}
interface UserType {
  given_name:string
  family_name:string
  nickname:string
  name:string
  locale:string
  picture:string
  updated_at:string
  email:string
  email_verified:boolean
  sub:string
}
interface CurrentUserType {
  isAuthenticated:boolean
  user:UserType
}
export interface UsersReducerState{
  listUsersData: DataUser[],
  currentUser:CurrentUserType | {user:null,isAuthenticated:null} // AramisWork: tengo que definir que es esto.
  idDetails: object,
  successMsg: string,
  errorMsg: string
}
