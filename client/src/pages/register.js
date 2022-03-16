import { useState } from "react";
import { onRegistration } from "../api/auth";
import Layout from "../components/layout";

const Register = () => {
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await onRegistration(values);
			console.log(data);
			setError("");
			setSuccess(data.message);
			setValues({ username: "", email: "", password: "" });
		} catch (error) {
			console.log(`Error: ${error.message}`);
			setError(error.response.data.errors[0].msg);
			setSuccess("");
		}
	};

	return (
		<Layout>
			<h1>Register</h1>

			{error ? (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			) : (
				<></>
			)}

			{success ? (
				<div className="alert alert-success" role="alert">
					{success}
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
						placeholder="Pick a username"
						onChange={(e) => onChange(e)}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email Address
					</label>
					<input
						required
						type="email"
						id="email"
						name="email"
						value={values.email}
						className="form-control"
						placeholder="Enter your email"
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
						value={values.password}
						className="form-control"
						placeholder="Enter your password"
						onChange={(e) => onChange(e)}
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Create Account
				</button>
			</form>
		</Layout>
	);
};

export default Register;
