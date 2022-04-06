import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList } from "../redux/slices/usersSlice";
import UserListItem from "../components/UserListItem";

const AllUsers = () => {
    const { users } = useSelector((state) => state.users);
    const [role, setRole] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsersList());
        setRole(localStorage.getItem("role_type"));
    }, [role]);

    return (
        <div>
            <Layout>
                <div className="container mt-3">
                    <div className="alert alert-info" role="alert">
                        <h4 className="alert-heading fw-bold">NOTICE</h4>
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
                    <hr />
                    {role === "Management" ? (
                        <div className="list-group">
                            {users &&
                                users.map((user, i) => {
                                    return <UserListItem key={i} {...user} />;
                                })}
                        </div>
                    ) : (
                        <div className="alert alert-danger" role="alert">
                            You are not authorized to view this information.
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
};

export default AllUsers;
