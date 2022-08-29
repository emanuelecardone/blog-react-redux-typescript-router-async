import { createSlice, createAsyncThunk, PayloadAction, Action } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { Status } from "../posts/postsSlice";
import { RootState } from "../../app/store";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

type User = {
    id: number | string;
    name: string;
    username: string;
    email: string;
    address: object;
    phone: string;
    website: string;
    company: object;
}

type Users = User[];

type UsersPayload = PayloadAction<Users>;

const initialState: Array<any> = [];

export const fetchUsers = createAsyncThunk<Users>('users/fetchUsers', async () => {

    const response = await axios.get(USERS_URL);
    const data: Users = response.data;
    return [...data];
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder){
        // Senza funzioni js come il push nell'array, si sta facendo un override totale dell'initialState 
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
});


export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;