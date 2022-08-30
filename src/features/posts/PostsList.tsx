import { useSelector, useDispatch } from 'react-redux'
// Import della selezione di tutti i post
import { selectAllPosts, getPostStatus, getPostsError, fetchPosts, Status } from './postsSlice';
import { AppDispatch } from '../../app/store';
import { useEffect, useRef } from 'react';
import PostsExcept from './PostsExcept';

const PostsList = () => {

    const dispatch = useDispatch<AppDispatch>();

    // Legata la selezione di tutti i post
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostStatus);
    const error = useSelector(getPostsError);

    const isMounted = useRef(false);

    useEffect(() => {
        if(postsStatus === 'idle' && !isMounted.current){
            dispatch(fetchPosts());
            isMounted.current = true;
        }
    }, [postsStatus, dispatch])

    let content;
    if (postsStatus === 'loading'){
        content = <p>"Loading..."</p>;
    } else if (postsStatus === Status.SUCCEDED){
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map(post => <PostsExcept key={post.id} post={post} />)
    } else if (postsStatus === 'failed') {
        content = 'error';
        console.log(error);
    }

    return (
        <>
            <h2 className='text-center'>Posts</h2>
            <section className='posts-section pt-3 border border-2 border-white'>
                <div className='posts-wrapper w-75 mx-auto p-1'>
                    {content}
                </div>
            </section>
        </>
    );
}

export default PostsList;