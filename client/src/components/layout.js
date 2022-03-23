import Navbar from "./navbar";

const Layout = ({ children }) => {
	return (
		<div>
			<Navbar />
			<div id="main" className="container mt-3">
				{children}
			</div>
		</div>
	);
};

export default Layout;
