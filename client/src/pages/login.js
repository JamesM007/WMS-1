import { useState } from "react";
import { onLogin } from "../api/auth";
import Layout from "../components/layout";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";

const Login = () => {
	const [values, setValues] = useState({
		username: "",
		password: "",
	});
	const [error, setError] = useState(false);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const dispatch = useDispatch();

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await onLogin(values);
			dispatch(authenticateUser());

			// Set local storage item for isAuth
			localStorage.setItem("isAuth", true);
		} catch (error) {
			console.log(`Error: ${error.message}`);
			setError(error.response.data.errors[0].msg);
		}
	};

	return (
		<Layout>
			<h1>Login</h1>

			{error ? (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			) : (
				<></>
			)}

			<form onSubmit={(e) => onSubmit(e)} className="container mt-3">
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Username
					</label>
					<input
						required
						type="text"
						id="username"
						name="username"
						value={values.username}
						className="form-control"
						placeholder="Enter your username"
						onChange={(e) => onChange(e)}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						required
						type="password"
						id="password"
						name="password"
						className="form-control"
						placeholder="Enter your password"
						onChange={(e) => onChange(e)}
					></input>
				</div>

				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
		</Layout>
	);
};

export default Login;
