import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { RootState } from "../../app/store";
// ROUTER
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SinglePostPage = () => {

    // Recupero id del post (tramite parametro url del router)
    const { postId } = useParams();

    // La tipizzazione come RootState va messa anche nel parametro
    const post = useSelector((state: RootState) => selectPostById(state, Number(postId)));

    if(!post){
        return (
            <section className="post-not-found w-100 h-100 d-flex justify-content-center align-items-center">
                <h2>Post not found!</h2>
            </section>
        );
    }

    return(
        <div className="single-post-page w-100 h-100 d-flex justify-content-center align-items-center p-2">
            <article className="post single-post w-50">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <p className="post-credit">
                    <Link to={`/post/edit/${post.id}`} className="me-1" style={{'color': 'cyan', 'textDecoration': 'none', 'display': 'block'}}>Edit Post</Link>
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timeStamp={post.date} />
                </p>
                <ReactionButtons post={post} />
            </article>
        </div>
    );
}

export default SinglePostPage