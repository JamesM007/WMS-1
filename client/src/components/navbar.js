import { NavLink } from "react-router-dom";

const Navbar = () => {
    const isAuth = false;

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                 
                <div>
                    <NavLink to="/">
                        <span className="navbar-brand mb-0 h1">Home</span>
                    </NavLink>
                </div>

                {isAuth ? (
                    <div>
                        <NavLink to="/dashboard">
                            <span>Dashboard</span>
                        </NavLink>
                    </div>
                ) : (
                <div>
                    <NavLink to="/accounts/login">
                        <span>Login</span>
                    </NavLink>
                    <NavLink to="/accounts/register">
                        <span>Register</span>
                    </NavLink>
                </div>
                )}

            </div>
        </nav>
    )
}

export default Navbar;
