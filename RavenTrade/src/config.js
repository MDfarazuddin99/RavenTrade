import axios from "axios";

const backend = axios.create({
    baseURL: "http://localhost:3000/api/", // replace with your API URL and default port
});

export default backend;