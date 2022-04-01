import Layout from "../components/Layout";
import {Link} from "react-router-dom";

const AllUsers = () => {
	return (
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

					<h2>All Users</h2>
					<hr/>
					<div className="alert alert-info" role="alert">
						<strong>TODO:</strong> Retrieve all users from the database. <br/>
						<strong>TODO:</strong> Display all users information. &nbsp;
						<code>id, first_name, last_name, username, email, role_type</code>
					</div>
				</div>
			</Layout>
		</div>
	)
};

export default AllUsers;
