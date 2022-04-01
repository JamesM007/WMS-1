import {Navigate, NavLink} from "react-router-dom";
import { Link } from "react-router-dom";
import {Nav, Navbar as N, Container, NavDropdown} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {onLogout} from "../api/auth";
import { unAuthenticateUser } from "../redux/slices/authSlice";
import PropTypes from "prop-types";

const Navbar = (props) => {
	const { isAuth } = useSelector((state) => state.auth);
	const {role_type} = useSelector((state) => state.user);

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
					<span className="navbar-brand mb-0 h1">
						{props.applicationName}&nbsp;
						<i className="bi bi-activity"/>&nbsp;
						<span className="fancy">{props.groupName}</span>
					</span>
				</NavLink>
				<Nav className="ms-auto">
					{isAuth ? (
						<>
							<NavLink to="/dashboard" className="nav-link">
								<span>Dashboard</span>
							</NavLink>
							<NavLink to="/admin/designer" className="nav-link">
								<span>Designer</span>
							</NavLink>
							<NavDropdown title="Account">
								{role_type === "Management" ? (
									<>
										{/* NavDropDown.Item href property forces hard reload on the page */}
										<Link to="/admin/all-users" style={{color: "#212529"}} className="dropdown-item custom-nav-link">All Users</Link>
										<NavDropdown.Divider />
									</>
								) : <></>}
								<NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
							</NavDropdown>
						</>
					) : (
						<>
							<NavLink to="/" className="nav-link">
								<span>Home</span>
							</NavLink>
							<NavLink to="/accounts/login" className="nav-link">
								<span>Login</span>
							</NavLink>
							<NavLink
								to="/accounts/register"
								className="nav-link"
							>
								<span>Create an account</span>
							</NavLink>
						</>
					)}
				</Nav>
			</Container>
		</N>
	);
};

// Default props the navbar should use
Navbar.defaultProps = {
	applicationName: "WMS",
	groupName: "UniqueCoders",
};

// Default props defined types
Navbar.propTypes = {
	// use isRequired to force a prop being passed, since we have default props, this doesn't apply.
	// applicationName: PropTypes.string.isRequired,
	applicationName: PropTypes.string,
	groupName: PropTypes.string,
};

export default Navbar;
