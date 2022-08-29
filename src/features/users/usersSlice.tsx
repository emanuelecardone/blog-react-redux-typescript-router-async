import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

type Users = Array<object>;

type UsersPayload = PayloadAction<Users>;

const initialState: Array<any> = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {

    try{

        const response = await axios.get(USERS_URL);
        return [...response.data] as Users;

    } catch(err: unknown){

        if(typeof err === 'string'){
            return err;
        } else if (err instanceof Error){
            return err.message;
        }

    }

});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder){
        // Senza funzioni js come il push nell'array, si sta facendo un override totale dell'initialState 
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any>) => {
            return action.payload;
        })
    }
});


export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;