import { createContext ,useEffect,useReducer } from "react";
 import { Reducer } from "./Reducer";

const intial_state={
    user:null||JSON.parse(localStorage.getItem("user")),
    isfetching:false,
    error:false

}
export const Context1=createContext(intial_state);

export const ContextProvider=({children})=>{
   const [state,dispatch]=useReducer(Reducer,intial_state); 
   useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(state.user))// 2éme argument json  
   },[state.user])
    return(
        <Context1.Provider value={{
            dispatch,
            user:state.user,
            isfetching:state.isfetching,
            error:state.error
        }}>
       {children}{/*the of contextProvider*/}
        </Context1.Provider>
    );
}