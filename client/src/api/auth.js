import axios from "axios";
axios.defaults.withCredentials = true;

let SERVER_URL = "http://localhost";
let PORT = 5000;

export async function onRegistration(registrationData) {
	const path = "/api/accounts/register";
	return await axios.post(`${SERVER_URL}:${PORT}${path}`, registrationData);
}

export async function onLogin(loginData) {
	const path = "/api/accounts/login";
	return await axios.post(`${SERVER_URL}:${PORT}${path}`, loginData);
}

export async function onLogout() {
	const path = "/api/accounts/logout";
	return await axios.get(`${SERVER_URL}:${PORT}${path}`);
}

export async function fetchProtectedInfo() {
	const path = "/api/accounts/protected";
	return await axios.get(`${SERVER_URL}:${PORT}${path}`);
}
