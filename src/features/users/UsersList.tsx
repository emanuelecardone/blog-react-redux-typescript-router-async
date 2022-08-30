import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {

    const users = useSelector(selectAllUsers);

    const renderedUsers = users.map(user => (
        <li key={user.id} className='text-center'>
            <Link to={`/user/${user.id}`} className='user-link' style={{'color': 'white', 'textDecoration': 'none'}}>{user.name}</Link>
        </li>
    ));

    return (
        <section className="w-100 h-100 d-flex flex-column justify-content-around align-items-center">
            <h2>Users</h2>

            <ul style={{'listStyleType': 'none'}}>
                {renderedUsers}
            </ul>
        </section>
    )
}

export default UsersList