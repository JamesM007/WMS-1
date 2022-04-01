const RegistrationForm = ({ values, handleChange, handleSubmit }) => {
	const role_types_list = () => [
		"Management",
		"Operations",
		"Picker",
		"Forklift",
	];

	return (
		<form onSubmit={handleSubmit} className="mt-1">
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
						onChange={handleChange}
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
						onChange={handleChange}
					/>
				</div>
			</div>

			{/* username field */}
			<div className="mb-3">
				<label htmlFor="username" className="form-label fw-semibold">
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
					onChange={handleChange}
				/>
			</div>

			{/* email address field */}
			<div className="mb-3">
				<label htmlFor="email" className="form-label fw-semibold">
					Email Address
				</label>
				<input
					required
					type="email"
					id="email"
					name="email"
					value={values.email}
					className="form-control"
					onChange={handleChange}
				/>
			</div>

			{/* role type field */}
			<div className="mb-3">
				<label htmlFor="role_type" className="form-label fw-semibold">
					Role
				</label>
				<select
					id="role_type"
					name="role_type"
					value={values.role_type}
					onChange={handleChange}
				>
					{role_types_list
						? role_types_list().map(
								(role_type_item, role_type_item_index) => {
									return (
										<option
											key={role_type_item_index}
											value={role_type_item}
										>
											{role_type_item}
										</option>
									);
								}
						  )
						: console.log("doesnt exist")}
				</select>
			</div>

			{/* password field */}
			<div className="mb-3">
				<label htmlFor="password" className="form-label fw-semibold">
					Password
				</label>
				<input
					required
					type="password"
					id="password"
					name="password"
					className="form-control"
					value={values.password}
					placeholder="Choose a password"
					onChange={handleChange}
				/>
			</div>

			{/* password field */}
			<div className="mb-3">
				<label
					htmlFor="password_confirm"
					className="form-label fw-semibold"
				>
					Confirm password
				</label>
				<input
					required
					type="password"
					id="password_confirm"
					name="password_confirm"
					className="form-control"
					values={values.password_confirm}
					placeholder="Confirm your password"
					onChange={handleChange}
				/>
			</div>

			<button type="submit" className="btn btn-primary mt-1">
				Create Account &nbsp;
				<i className="bi bi-chevron-right"></i>
			</button>
		</form>
	);
};

export default RegistrationForm;
