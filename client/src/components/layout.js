import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<div>
			<Navbar applicationName="WMS" groupName="UniqueCoders" />
			<div id="main" className="">
				{children}
			</div>
		</div>
	);
};

export default Layout;
