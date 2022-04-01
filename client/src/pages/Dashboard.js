import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { fetchUserData } from "../api/auth";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	const userData = async () => {
		try {
			const { data } = await fetchUserData();
			setUser(data.user);
			setLoading(false);
		} catch (error) {
			console.log(`Error: ${error.message}`);
			// redirect to logout route to perform logout operation
			<Navigate redirect to="/accounts/logout" />;
		}
	};

	useEffect(() => {
		userData()
	}, []);

	return loading ? (
		<Layout>
			<h1>Loading...</h1>
		</Layout>
	) : (
		<div>
			<Layout>
				<div className="container mt-3">
					<div className="alert alert-info" role="alert">
						<h4 className="alert-heading">NOTICE</h4>
						<hr />
						<p className="">
							The dashboard will provide a quick overview of SLA
							status, order dispatch, order overview, picking
							location short supplies and quick access reports.
						</p>
						<Link
							to="/admin/designer"
							className="btn btn-outline-primary"
						>
							Warehouse Designer{" "}
							<i className="bi bi-chevron-right"></i>
						</Link>
					</div>
					<div className="alert alert-danger" role="alert">
						<h4 className="alert-heading">DANGER</h4>
						Currently, <code>role_type</code> is hard-coded for testing purposes. <br/>
						<code>role_type</code> is being used to allow access for "Management"
						to certain sections of the website. <br/>
						<strong>Location:</strong> <code>redux -> slices -> userSlice.js</code>
					</div>
					<div className="card">
						<div className="card-body">
							<div className="card-title">
								<h1>Dashboard</h1>
								<hr />
							</div>
							<div className="card-text">
								<h5>Current user</h5>
								<strong>ID: </strong>
								{user.id ? user.id : "No id provided"} <br />
								<strong>First name: </strong>
								{user.first_name
									? user.first_name
									: "No first name provided"}{" "}
								<br />
								<strong>Last name: </strong>
								{user.last_name
									? user.last_name
									: "No last name provided"}{" "}
								<br />
								<strong>Username: </strong>
								{user.username
									? user.username
									: "No username provided"}{" "}
								<br />
								<strong>Email: </strong>
								{user.email
									? user.email
									: "No email provided"}{" "}
								<br />
								<strong>Role Type: </strong>
								{user.role_type
									? user.role_type
									: "No role_type provided"}{" "}
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default Dashboard;
