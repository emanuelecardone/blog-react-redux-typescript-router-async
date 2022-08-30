// nanoid è uno strumento di redux toolkit per generare id random
import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import {sub} from "date-fns";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export type Reactions = {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
}

type Post = {
    id: string; 
    title: string; 
    body: string;
    userId: string | number;
    date: string;
    reactions: Reactions;
}

type InitialPost = {
    title: string;
    body: string;
    userId: string | number;
}

// Custom type per payload action
type PostsPayload = PayloadAction<Post>

// Custom type per reactions
type ReactionsPayload = PayloadAction<{
    postId: string;
    reaction: keyof Reactions;
}>

export enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEDED = 'succeded',
    FAILED = 'failed',
    PENDING = 'pending'
}

type InitialState = {
    posts: Post[];
    status: Status;
    error: unknown | Error;
}

// State iniziale (simile al reducer)
const initialState: InitialState = {
    posts: [],
    status: Status.IDLE, // 'idle' | 'loading' | 'succeded' | 'failed'
    error: null
} 

// Fetch per prendere i post (<Post[]> è il return della funzione)
export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL);
    const data: Post[] = response.data;
    return [...data];
})

// Quando c'è un parametro va inserito per forza oltre al tipo di ritorno, il tipo del primo argomento che riceve la funzione (initialPost)
export const addNewPost = createAsyncThunk<Post, InitialPost>('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    const data: Post = response.data;
    return {...data};
});

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
                state.posts.push(action.payload);
            },
            prepare(title: string, body: string, userId: string | number){
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
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
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost){
                existingPost.reactions[reaction]++;
            }
        }
    },
    extraReducers(builder){
        // Gestione di tutti i casi status tramite builder
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = Status.LOADING;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = Status.SUCCEDED;
                // Data e reazioni
                let min = 1;
                const loadedPosts = action.payload.map((post: Post) => {
                    post.date = sub(new Date(), {minutes: min++}).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });

                // Aggiunta di ogni post fetchato nell'array
                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = Status.FAILED;
                state.error = action.error.message;
            })
            // Case per il nuovo post
            .addCase(addNewPost.fulfilled, (state, action) => {
                
                // Fix per api post id non accurati
                // Assegnazione id manuale (non sarebbe necessaria se l'api ritornasse id accurati)
                const sortedPosts = state.posts.sort((a: Post, b: Post) => {
                    if(a.id > b.id) return 1;
                    if(a.id < b.id) return -1;
                    return 0;
                });
                action.payload.id = sortedPosts[sortedPosts.length - 1].id +1;

                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                state.posts.push(action.payload);
            })
    }
});

// https://redux-toolkit.js.org/usage/usage-with-typescript#createslice

// In futuro se cambia initialState non avremo più un array e si dovrà cambiare state in ogni componente
// Quindi si generalizza l'export selezionando tutti i post, così se cambiano i post si dovrà cambiare solo lo slice
export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

// Actions è la keyword per esportare le possibili azioni
// Quando si scrive questa funzione postAdded e si crea,
   // slice genera in automatico un'azione "creator function" con lo stesso nome della funzione che adda i post
// Quindi si sta esportando questa azione creator function che è creata automaticamente,
    // ed è per questo che sopra non si vede la creazione postSlice.action, è automaticamente creata
   export const { postAdded, reactionAdded } = postsSlice.actions;

// Export del reducer
export default postsSlice.reducer;