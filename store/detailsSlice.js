import {createSlice} from "@reduxjs/toolkit";

const UserDetailsSlice=createSlice({
    name:"userDetails",
    initialState:{
        userOwnDetails:'',
        myShares:''
    },
    reducers:{
        setUserDetails:(state,action)=>{
            state.userOwnDetails=action.payload;
            return state;
        },
        setMyShares:(state,action)=>{
            state.myShares=action.payload;
            return state;
        }
    }
})

export const setUserDetailsActions=UserDetailsSlice.actions;

export default UserDetailsSlice;