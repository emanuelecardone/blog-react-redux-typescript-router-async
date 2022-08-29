// nanoid è uno strumento di redux toolkit per generare id random
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { act } from "react-dom/test-utils";
// npm i date-fns per la data/ora post
import {sub} from 'date-fns';
import { type } from "os";
import { Key } from "react";

// State iniziale (simile al reducer)
const initialState = [
    {
        id: '1', 
        title: 'Learning Redux Toolkit with Typescript', 
        content: 'I\'ve heard good things.',
        userId: '',
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2', 
        title: 'Slices...', 
        content: 'The more i say slice, the more i want pizza.',
        userId: '',
        date: sub(new Date(), {minutes: 5}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
]

export type Reactions = {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
}

// Custom type per payload action
type PostsPayload = PayloadAction<{
    id: string; 
    title: string; 
    content: string;
    userId: string;
    date: string;
    reactions: Reactions;
}>

// Custom type per reactions
type ReactionsPayload = PayloadAction<{
    postId: string;
    reaction: keyof Reactions;
}>

// Export slice (oggetto che ha un nome, uno state iniziale, e i reducers che compieranno varie azioni)
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // questo postAdded ha un reducer e una prepare che è una funzione callback
        postAdded:{
            reducer(state, action: PostsPayload){
                // Action sarà l'azione dispatchata
                // Payload corrisponderà alle values inserite nelle form
                // IMPORTANTE: si può usare il push invece di useState solo perché redux toolkit usa una sintassi js,
                    // in tutti gli altri file non-slice però si deve ancora usare useState o l'hook che fa a quel caso
                state.push(action.payload);
            },
            prepare(title: string, content: string, userId: string){
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action: ReactionsPayload){
            const {postId, reaction} = action.payload;
            const existingPost = state.find(post => post.id === postId)
            if(existingPost){
                existingPost.reactions[reaction]++;
            }
        }
    }
});

// https://redux-toolkit.js.org/usage/usage-with-typescript#createslice

// In futuro se cambia initialState non avremo più un array e si dovrà cambiare state in ogni componente
// Quindi si generalizza l'export selezionando tutti i post, così se cambiano i post si dovrà cambiare solo lo slice
export const selectAllPosts = (state: RootState) => state.posts;

// Actions è la keyword per esportare le possibili azioni
// Quando si scrive questa funzione postAdded e si crea,
   // slice genera in automatico un'azione "creator function" con lo stesso nome della funzione che adda i post
// Quindi si sta esportando questa azione creator function che è creata automaticamente,
    // ed è per questo che sopra non si vede la creazione postSlice.action, è automaticamente creata
   export const { postAdded, reactionAdded } = postsSlice.actions;

// Export del reducer
export default postsSlice.reducer;