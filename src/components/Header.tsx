import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { increaseCount, selectCount } from "../features/posts/postsSlice";
import { AppDispatch } from "../app/store";

const Header = () => {

    const dispatch = useDispatch<AppDispatch>();
    const count = useSelector(selectCount);

    return (
        <header className="w-100 d-flex flex-column justify-content-between align-items-center p-2 position-relative">
            <h1 className="text-center">Redux Blog</h1>
            <nav className="w-100">
                <ul className="header-list w-100 d-flex justify-content-center align-items-center" style={{'gap': '50px'}}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='post'>Post</Link></li>
                    <li><Link to='user'>Users</Link></li>
                </ul>
            </nav>
            {/* Test counter */}
            <div className="count-box flex-column justify-content-center align-items-center position-absolute" style={{'color': 'cyan', 'top': '10px', 'right': '10px'}}>
                <span className="text-center">This is an optimization test<br/> Ignore this counter</span>
                <button
                    type="button"
                    className="px-2"
                    style={{'color': 'cyan'}}
                    // Funzione dispatch anonima
                    onClick={ () => {dispatch(increaseCount())} }
                    >
                        {count}
                    </button>
            </div>
        </header>
    );
}

export default Header