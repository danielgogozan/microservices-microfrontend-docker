import axios from "axios";

let baseURL = "http://localhost:3012/recipes"

export default function apiClient(token) {
    return axios.create({
        baseURL: `${baseURL}`,
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        }});
}