import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './index.css'
export const Login = (props) => {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const login = async () => {
        const authConfig = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }

        const newToken = await axios.post("http://localhost:3001/auth/login", {
            username: username,
            password: password,
        });
        const accessToken = newToken.data.accessToken
        console.log(`ACCESS TOKEN: ${accessToken}`)

        setToken(accessToken)
        props.didReceiveToken(accessToken)
        navigate("/recipe-manager")
    };

    return (
        <div>
            <label className={"page-subtitle"}>Welcome!</label>
            <div className="imgcontainer">
               <img className="avatar" alt = "Avatar" src="https://i.ibb.co/bvMsyFs/login.png"/>
            </div>

            <div className="container">
                <div className={"spacer"}>
                    <label>Username</label>
                    <input
                        className={"logininput"}
                        type="text"
                        name="username"
                        placeholder={"Enter username"}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>

            <div className={"spacer"}>
                <label>Password</label>
                <input
                    className={"logininput"}
                    type="password"
                    name="password"
                    placeholder={"Enter password"}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
                <button className={"add-button"} onClick={login}>Login</button>
            </div>
        </div>
    );
}
