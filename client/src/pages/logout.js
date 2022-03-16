import { useDispatch } from "react-redux";
import { onLogout } from "../api/auth";
import { unAuthenticateUser } from "../redux/slices/authSlice";

const Logout = () => {
	const dispatch = useDispatch();

	const userLogout = async () => {
		try {
			await onLogout();
			dispatch(unAuthenticateUser());
			localStorage.removeItem("isAuth");
		} catch (error) {
			console.log(`Error: ${error.message}`);
		}
	};

	return userLogout();
};

export default Logout;
