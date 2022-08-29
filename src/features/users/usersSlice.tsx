import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import React from 'react'

const initialState = [
    {
        id: '0',
        name: 'Dude Lebowski'
    },
    {
        id: '1',
        name: 'Neil Young'
    },
    {
        id: '2',
        name: 'Dave Gray'
    }
];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
});

export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;