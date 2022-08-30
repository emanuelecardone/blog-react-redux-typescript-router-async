import React from 'react';
import './general.scss';
import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';
import { useEffect, useRef } from 'react';
import { fetchUsers } from './features/users/usersSlice';
import { store } from './app/store';
// ROUTER 
import SinglePostPage from './features/posts/SinglePostPage';
import EditPostForm from './features/posts/EditPostForm';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';

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
      <Routes>
        {/* Questo Layout è il main (class app) che è il parent di tutte le routes sotto */}
        <Route path='/' element={<Layout />}>


          <Route index element={<PostsList />} />

          <Route path='post'>
            <Route index element={<AddPostForm />} />
            <Route path=':postId' element={<SinglePostPage />} />
            <Route path='edit/:postId' element={<EditPostForm />} />
          </Route>

        </Route>
      </Routes>
    );
}

export default App;
