import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setuserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const users = useSelector(selectAllUsers);

    const dispatch = useDispatch<AppDispatch>();

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }
    const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setuserId(e.target.value);
    }

    // Controllo validità di tutte e 3 i campi e status idle
    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    // Save post modificato
    const savePost = (e: React.FormEvent) => {
        e.preventDefault();
        if(canSave){
            try {
                setAddRequestStatus('pending');
                // unwrap() è di redux e ritorna un payload.action o lancia un errore se è rejected
                dispatch(addNewPost({title, body: content, userId})).unwrap();
                setTitle('');
                setContent('');
                setuserId('');
            } catch(err){
                console.error('Failed to save the post', err);
            } finally {
                setAddRequestStatus('idle');
            }
        }
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section>
            <h2>Add a New Post</h2>
            <form onSubmit={savePost} className='d-flex flex-column'>
                
                {/* TITLE */}
                <label htmlFor="post-title">Post Title:</label>
                <input 
                    type="text" 
                    id='post-title'
                    name='post-title'
                    value={title}
                    onChange={onTitleChanged}
                />

                {/* AUTHOR */}
                <label htmlFor="post-author" className='mt-2'>Post Author:</label>
                <select
                    className='mb-2' 
                    name="post-author" 
                    id="post-author"
                    value={userId}
                    onChange={onAuthorChanged}
                >
                    {/* Vuota */}
                    <option value=""></option>
                    {usersOptions}
                </select>

                {/* CONTENT */}
                <label htmlFor="post-content">Post Content:</label>
                <textarea 
                    id='post-content' 
                    name='post-content'
                    value={content}
                    onChange={onContentChanged}
                />
                <button 
                    type='submit' 
                    className='mt-2'
                    // Disabled è l'opposto di canSave
                    disabled={!canSave}
                >
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default AddPostForm