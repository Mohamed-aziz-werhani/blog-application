
export const login_start=(userCredentials)=>({
   type:"LOGIN_START" 
});

export const login_Success=(user)=>({
    type:"LOGIN_SUCCESS",
    payload:user
});

export const login_Failure=()=>({
    type:"LOGIN_FAILURE"
});

export const logout=()=>({
    type:"LOGOUT"
});
    

