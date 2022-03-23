import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { fetchProtectedInfo } from "../api/auth";
import Layout from "../components/layout";

const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [protectedData, setProtectedData] = useState(null);

	const protectedInfo = async () => {
		try {
			const { data } = await fetchProtectedInfo();
			console.log(data);
			setProtectedData(data.info);
			setLoading(false);
		} catch (error) {
			console.log(`Error: ${error.message}`);
			// redirect to logout route to perform logout operation
			<Navigate redirect to="/accounts/logout" />;
		}
	};

	useEffect(() => {
		protectedInfo();
	});

	return loading ? (
		<Layout>
			<h1>Loading...</h1>
		</Layout>
	) : (
		<div>
			<Layout>
				<h1>Dashboard</h1>
				<h2>Protected Information: {protectedData}</h2>
			</Layout>
		</div>
	);
};

export default Dashboard;
