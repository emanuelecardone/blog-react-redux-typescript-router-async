import React from 'react';
import './general.scss';
import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';
import { useEffect, useRef } from 'react';
import { fetchUsers } from './features/users/usersSlice';
import { store } from './app/store';

function App() {

    const isMounted = useRef(false);

    // Si vogliono caricare gli utenti esattamente quando l'app viene lanciata 
    useEffect(() => {
      if(!isMounted.current){
        store.dispatch(fetchUsers());
        isMounted.current = true;
      }
    }, []);



    return (
      <main className="App">
        <AddPostForm />
        <PostsList />
      </main>
    );
}

export default App;
