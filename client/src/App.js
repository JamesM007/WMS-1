import {
    BrowserRouter,
    Navigate,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

/**
 * For private routes. 
 * Routes where you need to be logged in to access.
 * Dashboard, etc...
 */
const PrivateRoutes = () => {
    const isAuth = false;

    return <>{isAuth ? <Outlet /> : <Navigate to="accounts/login" />}</>
}

/**
 * For restricted routes. 
 * If a user is logged in, and tries to access login, register endpoints.
 * Redirect user back to dashboard endpoint.
 */
const RestrictedRoutes = () => {
    const isAuth = false;

    return <>{!isAuth ? <Outlet /> : <Navigate to="dashboard" />}</>
}

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Home />} />

                <Route element={<RestrictedRoutes />}>
                    <Route path="/accounts/login" element={<Login />} />
                    <Route path="/accounts/register" element={<Register />} />
                </Route>

                <Route element={<PrivateRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default App;
