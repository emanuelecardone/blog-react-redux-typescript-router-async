import { useSelector, useDispatch } from 'react-redux'
// Import della selezione di tutti i post
import { selectAllPosts } from './postsSlice'
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = () => {

    // Legata la selezione di tutti i post
    const posts = useSelector(selectAllPosts);

    // Ordine posts in base a date
    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map(post => (
        <article key={post.id} className='post'>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>

            <p className='post-credit'>
                <PostAuthor userId={post.userId} />,
                <TimeAgo timeStamp={post.date} />
            </p>

            <ReactionButtons post={post} />
        </article>
    ));

    return (
        <section className='posts-section pt-3'>
            <h2 className='text-center'>Posts</h2>
            <div className='posts-wrapper w-50 mx-auto p-1'>
                {renderedPosts}
            </div>
        </section>
    );
}

export default PostsList;