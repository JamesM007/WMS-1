import { NavLink } from "react-router-dom";
import { Nav, Navbar as N, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../api/auth";
import { unAuthenticateUser } from "../redux/slices/authSlice";

const Navbar = () => {
	const { isAuth } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const logout = async () => {
		try {
			await onLogout();
			dispatch(unAuthenticateUser());
			localStorage.removeItem("isAuth");
		} catch (error) {
			console.log(`Error: ${error.message}`);
		}
	};

	return (
		<N bg="dark" variant="dark">
			<Container>
				<NavLink to="/" className="navbar-brand">
					<span className="navbar-brand mb-0 h1">WMS</span>
				</NavLink>

				{isAuth ? (
					<Nav className="ms-auto">
						<NavLink to="/dashboard" className="nav-link">
							<span>Dashboard</span>
						</NavLink>
						<NavLink
							to="#"
							onClick={() => logout()}
							className="nav-link"
						>
							<span>Logout</span>
						</NavLink>
					</Nav>
				) : (
					<Nav className="ms-auto">
						<NavLink to="/accounts/login" className="nav-link">
							<span>Login</span>
						</NavLink>
						<NavLink to="/accounts/register" className="nav-link">
							<span>Register</span>
						</NavLink>
					</Nav>
				)}
			</Container>
		</N>
	);
};

export default Navbar;
