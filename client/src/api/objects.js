import axios from "axios";
axios.defaults.withCredentials = true;

let SERVER_URL = "http://localhost";
let PORT = 5000;

export async function onSaveObjects(objectsData) {
    const path = "/api/objects/save";
    console.log(objectsData);
    // return await axios.post(`${SERVER_URL}:${PORT}${path}`, objectsData);
}
