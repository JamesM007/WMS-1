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
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card shadow-sm p-4 border mb-4">
						<h1 className="m-0">Login</h1>

						<hr />

						{error ? (
							<div
								className="alert alert-danger fw-regular"
								role="alert"
							>
								{error}
							</div>
						) : (
							<></>
						)}

						<form onSubmit={(e) => onSubmit(e)} className="mt-1">
							<div className="mb-3">
								<label
									htmlFor="username"
									className="form-label fw-semibold"
								>
									Username
								</label>
								<input
									required
									autoFocus
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
								<label
									htmlFor="password"
									className="form-label fw-semibold"
								>
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
								Login &nbsp;
								<i className="bi bi-chevron-right"></i>
							</button>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
