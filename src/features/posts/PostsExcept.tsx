import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
// ROUTER
import { Link } from 'react-router-dom'

type Props = {
    post: {
        id: string; 
        title: string; 
        body: string;
        userId: string | number;
        date: string;
        reactions: {
            thumbsUp: number;
            wow: number;
            heart: number;
            rocket: number;
            coffee: number;
        }
    }
}

const PostsExcept = ({post}: Props) => {
    return (
        <article className='post'>
            <h3>{post.title}</h3>
            {/* L'api ha il suo content in .body, non in .content come nella versione static */}
            <p className='except'>{post.body.substring(0, 75)}</p>

            <p className='post-credit'>
                {/* Link router */}
                <Link to={`post/${post.id}`} className="me-1" style={{'color': 'cyan', 'textDecoration': 'none', 'display': 'block'}}>
                    View this post
                </Link>
                <PostAuthor userId={post.userId} />,
                <TimeAgo timeStamp={post.date} />
            </p>

            <ReactionButtons post={post} />
        </article>
    )
}

export default PostsExcept