import React from 'react';
import './general.scss';
import PostsList from './features/posts/PostsList';
import UsersList from './features/users/UsersList';
import AddPostForm from './features/posts/AddPostForm';
import UserPage from './features/users/UserPage';
import { useEffect, useRef } from 'react';
import { fetchUsers } from './features/users/usersSlice';
import { store } from './app/store';
// ROUTER 
import SinglePostPage from './features/posts/SinglePostPage';
import EditPostForm from './features/posts/EditPostForm';
import Layout from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';

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
          {/* E' qui che viene definita la path quando verrà richiamata con /post o /post/edit/ etc */}
          <Route path='post'>
            {/* index element è ciò che viene visualizzato di default nel path /post */}
            <Route index element={<AddPostForm />} />
            {/* la sintassi :postId o dopo :userId indica con i due punti che saranno endpoints dinamici */}
            <Route path=':postId' element={<SinglePostPage />} />
            <Route path='edit/:postId' element={<EditPostForm />} />
          </Route>

          <Route path='user'>
            <Route index element={<UsersList />} />
            <Route path=':userId' element={<UserPage />} />
          </Route>

          {/* Catch all (si può fare anche con un 404 component), se nessuna delle path precedenti viene matchata dalla richiesta url allora si verrà indirizzati alla home 
          Il replace infatti sostituisce qualsiasi bad request con quella home */}
          <Route path='*' element={<Navigate to='/' replace />}></Route>

        </Route>
      </Routes>
    );
}

export default App;
