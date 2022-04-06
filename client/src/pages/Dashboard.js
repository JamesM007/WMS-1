import { useEffect } from "react";

import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUser } from "../redux/slices/userSlice";

const Dashboard = () => {
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuthUser());
    }, []);

    return user ? (
        <div>
            <Layout>
                <div className="container mt-3">
                    <div className="alert alert-info" role="alert">
                        <h4 className="alert-heading fw-bold">NOTICE</h4>
                        <hr />
                        <p>
                            Semester 6, the dashboard will provide a quick
                            overview of SLA status, order dispatch, order
                            overview, picking location short supplies and quick
                            access reports.
                        </p>
                        <Link
                            to="/admin/designer"
                            className="btn btn-outline-primary"
                        >
                            Warehouse Designer{" "}
                            <i className="bi bi-chevron-right"></i>
                        </Link>
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
    ) : (
        <></>
    );
};

export default Dashboard;
