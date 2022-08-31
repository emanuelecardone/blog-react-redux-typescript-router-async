import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../app/store";

const UserPage = () => {

    const { userId } = useParams();
    const user = useSelector((state: RootState) => selectUserById(state, Number(userId)));

    const postsForUser = useSelector((state: RootState) => selectPostsByUser(state, Number(userId)));

    const orderedPosts = postsForUser.slice().sort((a, b) => b.date.localeCompare(a.date));

    const postTitles = orderedPosts.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`} className='text-white' style={{'textDecoration': 'none'}}>{post.title}</Link>
        </li>
    ));

    return (
        <section className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <h2 className="mb-5">Posts by {user.name}</h2>

            <ul className="text-center" style={{'listStyleType': 'none'}}>
                {postTitles}
            </ul>
        </section>
    );
}

export default UserPage;