import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <Fragment>
            <Header />
            <main className="app py-3">
                {/* Outlet rappresenta tutti i children */}
                <Outlet />
            </main>  
        </Fragment>
    );
}

export default Layout