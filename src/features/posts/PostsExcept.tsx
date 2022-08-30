import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

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
            <p>{post.body.substring(0, 100)}</p>

            <p className='post-credit'>
                <PostAuthor userId={post.userId} />,
                <TimeAgo timeStamp={post.date} />
            </p>

            <ReactionButtons post={post} />
        </article>
    )
}

export default PostsExcept