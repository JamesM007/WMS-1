import { useState } from "react";
import { onRegistration } from "../api/auth";
import Layout from "../components/layout";

const Register = () => {
	const [values, setValues] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		role_type: "",
		password: "",
	});
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [created, setCreated] = useState(false);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSelectChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value.toLowerCase() });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await onRegistration(values);
			setError("");
			setSuccess(data.message);
			setValues({
				first_name: "",
				last_name: "",
				username: "",
				email: "",
				role_type: "",
				password: "",
			});
			setCreated(true);
		} catch (error) {
			console.log(`Error: ${error.message}`);
			setError(error.response.data.errors[0].msg);
			setSuccess("");
			setCreated(false);
		}
	};

	return (
		<Layout>
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card shadow-sm p-4 border mb-4">
						<h1 className="m-0">Create an account</h1>

						<hr />

						<div className="alert alert-info fw-regular">
							<h5 className="mb-1 fw-semibold">Please Note</h5>
							An administrator will have to activate your account
							after you create your account.
						</div>

						{error.length ? (
							<div
								className="alert alert-danger fw-regular"
								role="alert"
							>
								<h5 className="mb-1 fw-semibold">Error</h5>
								{error}
							</div>
						) : (
							<></>
						)}

						{success ? (
							<h4 className="fw-semibold mb-3 mt-2 p-0 text-center">
								{success}
							</h4>
						) : (
							<></>
						)}

						{created ? (
							<div className="account-created-feedback">
								<i className="bi bi-check-circle"></i>
								<br />
								<div className="mt-4">
									<a
										className="btn btn-primary"
										href="/accounts/login"
									>
										Proceed to Login &nbsp;
										<i className="bi bi-chevron-right"></i>
									</a>
								</div>
							</div>
						) : (
							<form
								onSubmit={(e) => onSubmit(e)}
								className="mt-1"
							>
								<div className="row mb-3">
									{/* first name field */}
									<div className="col">
										<label
											htmlFor="first_name"
											className="form-label fw-semibold"
										>
											First name
										</label>
										<input
											required
											autoFocus
											type="text"
											id="first_name"
											name="first_name"
											value={values.first_name}
											className="form-control"
											onChange={(e) => onChange(e)}
										/>
									</div>

									{/* last name field */}
									<div className="col">
										<label
											htmlFor="last_name"
											className="form-label fw-semibold"
										>
											Last name
										</label>
										<input
											required
											type="text"
											id="last_name"
											name="last_name"
											value={values.last_name}
											className="form-control"
											onChange={(e) => onChange(e)}
										/>
									</div>
								</div>

								{/* username field */}
								<div className="mb-3">
									<label
										htmlFor="username"
										className="form-label fw-semibold"
									>
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

								{/* email address field */}
								<div className="mb-3">
									<label
										htmlFor="email"
										className="form-label fw-semibold"
									>
										Email Address
									</label>
									<input
										required
										type="email"
										id="email"
										name="email"
										value={values.email}
										className="form-control"
										onChange={(e) => onChange(e)}
									/>
								</div>

								{/* role type field */}
								<div className="mb-3">
									<label
										htmlFor="role_type"
										className="form-label fw-semibold"
									>
										Role
									</label>
									<input
										type="text"
										id="role_type"
										name="role_type"
										className="form-control"
										placeholder="What is your role?"
										value={values.role_type}
										onChange={(e) => onSelectChange(e)}
									/>
									<div className="form-text">
										<span className="fw-bold">
											Options:{" "}
										</span>
										Management, Operations, Picker,
										Forklift.
									</div>
								</div>

								{/* password field */}
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
										placeholder="Choose a password"
										onChange={(e) => onChange(e)}
									/>
								</div>

								{/* password field */}
								<div className="mb-3">
									<label
										htmlFor="confirm_password"
										className="form-label fw-semibold"
									>
										Confirm password
									</label>
									<input
										required
										type="password"
										id="confirm_password"
										name="confirm_password"
										className="form-control"
										placeholder="Confirm your password"
										onChange={(e) => onChange(e)}
									/>
								</div>

								<button
									type="submit"
									className="btn btn-primary mt-1"
								>
									Create Account &nbsp;
									<i className="bi bi-chevron-right"></i>
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Register;
