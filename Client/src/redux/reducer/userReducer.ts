import { createSlice } from "@reduxjs/toolkit";
import { UsersReducerState } from "../interfaces/userInterface";

//Aramis: Nop puedo tipar todo porque hay cosas que parecen no servir.
const initialState: UsersReducerState = {
    currentUser:{user:null,isAuthenticated:null},
    listUsersData:[],
    idDetails: {},
    successMsg: "",
    errorMsg: ""
}

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers:{
        saveUserInGlobalState: (state,action) => {
            state.currentUser = action.payload;
        },
        listUser: (state, action) => {
            state.listUsersData = action.payload;
        },
        //Aramis:Esto parece no hacer nada, viene ligado con una accion que debio ser un controllador.
        userByID: (state, action) => {
            state.idDetails = action.payload;
        },
        //Aramis:Estos mensajes parecen estar sin funcionalidad, podrian ser utiles (update , creo que si tiene funcionalidad, por favor verificar aramis del futuro)      
        successMsg: (state, action) => {
            state.successMsg = action.payload
        },
        //Aramis:Estos mensajes parecen estar sin funcionalidad, podrian ser utiles   
        errorMsg: (state, action) => {
            state.errorMsg = action.payload
        }
    }
})

export const { saveUserInGlobalState,listUser, userByID, successMsg, errorMsg } = userReducer.actions;
export default userReducer.reducer