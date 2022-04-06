import "./App.css";

import {
    BrowserRouter,
    Navigate,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Designer from "./pages/Designer";
import AllUsers from "./pages/AllUsers";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthUser } from "./redux/slices/userSlice";
import { useEffect } from "react";

/**
 * For private routes.
 * Routes where you need to be logged in to access.
 * Dashboard, etc...
 */
const PrivateRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth);

    return <>{isAuth ? <Outlet /> : <Navigate to="/accounts/login" />}</>;
};

/**
 * For restricted routes.
 * If a user is logged in, and tries to access login, register endpoints.
 * Redirect user back to dashboard endpoint.
 */
const RestrictedRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth);

    return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

// TODO: Hard coding role_type for "Management"
const role_type = "Management";

/**
 * For management routes.
 * If a role_type of the user is "Management", allow the user to proceed.
 * Only "Management" role_type can access these routes.
 */
const ManagementRoutes = () => {
    const { isAuth } = useSelector((state) => state.auth);
    return isAuth && role_type === "Management" ? (
        <Outlet />
    ) : (
        <Navigate to="/dashboard" />
    );
};

/**
 * TODO: For management and operations routes.
 * If a role_type is "Management" OR "Operations", allow the user to proceed to these links.
 * This is different than "Management" only routes as it enables "Operations" to access too.
 */
// const ManagementAndOperationsRoutes = () => {
// 	const { isAuth } = useSelector((state) => state.auth);
// 	const { role_type } = useSelector((state) => state.user)
//
// 	return isAuth && (role_type === "Management" || role_type === "Operations") ? (
// 		<Outlet />
// 	) : (
// 		<Navigate to="/dashboard" />
// 	);
// }

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />

                <Route element={<RestrictedRoutes />}>
                    <Route path="/accounts/login" element={<Login />} />
                    <Route path="/accounts/register" element={<Register />} />
                </Route>

                <Route element={<PrivateRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                <Route element={<ManagementRoutes />}>
                    <Route path="/admin/designer" element={<Designer />} />
                    <Route path="/admin/all-users" element={<AllUsers />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
