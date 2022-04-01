import { useState } from "react";
import { onRegistration } from "../api/auth";
import Layout from "../components/Layout";
import RegistrationFrom from "../components/forms/RegistrationForm";
import { Link } from "react-router-dom";

const Register = () => {
	const [values, setValues] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		role_type: "Management",
		password: "",
		password_confirm: "",
	});

	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [created, setCreated] = useState(false);

	const onChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setValues({ ...values, [name]: value });
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
				password_confirm: "",
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
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="card shadow-sm p-4 border mb-4">
							<h1 className="m-0">Create an account</h1>

							<hr />

							<div className="alert alert-info fw-regular">
								<h5 className="mb-1 fw-semibold">
									Please Note
								</h5>
								An administrator will have to activate your
								account after you create your account.
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
										<Link
											to="/accounts/login"
											className="btn btn-outline-primary"
										>
											Proceed to Login{"  "}
											<i className="bi bi-chevron-right"></i>
										</Link>
									</div>
								</div>
							) : (
								<RegistrationFrom
									values={values}
									handleChange={(e) => onChange(e)}
									handleSubmit={(e) => onSubmit(e)}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Register;
