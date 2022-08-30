import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { RootState, AppDispatch } from "../../app/store";
import { Status } from "./postsSlice";
// ROUTER
import { useParams, useNavigate } from "react-router-dom";

const EditPostForm = () => {

    const {postId} = useParams();
    const navigate = useNavigate();

    const post = useSelector((state: RootState) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    // Il post potrebbe essere undefined quindi col ? si specifica che si usa lo useState solo se il post esiste
    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setuserId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState(Status.IDLE);

    const dispatch = useDispatch<AppDispatch>();

    if(!post){
        return (
            <section className="post-not-found w-100 h-100">
                <h2>Post not found!</h2>
            </section>
        );
    }

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }
    const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setuserId(e.target.value);
    }

    // Se si dichiarano alcune variabili come possibili undefined (useState post?.body etc) non si può usare [].every(Boolean)
    const canSave = title && content && userId && requestStatus === Status.IDLE;

    const savePost = (e: React.FormEvent) => {
        e.preventDefault();
        if(canSave){
            try{
                setRequestStatus(Status.PENDING);
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap();

                setTitle('');
                setContent('');
                setuserId('');
                navigate(`/post/${postId}`);

            } catch(err){
                if(typeof err === 'string'){
                    console.log(err)
                } else if(err instanceof Error){
                    console.log(err.message);
                }

            } finally{
                setRequestStatus(Status.IDLE);
            }
        }
    }

    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >
            {user.name}
        </option>
    ));

    // Delete
    const deleteThisPost = () => {
        try{

            setRequestStatus(Status.PENDING);
            // Usando unwrap si può usare la logica try and catch
            dispatch(deletePost({id: post.id})).unwrap();

            setTitle('');
            setContent('');
            setuserId('');
            navigate('/');

        } catch(err){
            if(typeof err === 'string'){
                console.log(err)
            } else if(err instanceof Error){
                console.log(err.message);
            }
        } finally{
            setRequestStatus(Status.IDLE);
        }
    }

    return (
        <section className="w-100 h-100 d-flex flex-column justify-content-around align-items-center">
            <p className="text-center text-danger w-75 fw-bold">IMPORTANT!<br/> Since jsonplaceholder doesn't allow to edit a post created by user (returning 500 status), you can only edit posts coming from api</p>
            <h2>Edit Post</h2>
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
                    // Si mette la defaultValue perché a differenza del nuovo post questo ha già un value che è l'utente attuale
                    defaultValue={userId}
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
                <button
                    type="button"
                    className="mt-2 bg-danger"
                    onClick={deleteThisPost}
                >
                    Delete Post
                </button>
            </form>
        </section>
    );
}

export default EditPostForm;