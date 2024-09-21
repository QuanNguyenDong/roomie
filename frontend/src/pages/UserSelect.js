import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getUserProfile from "../services/getUserProfile";

export default function SignIn() {
    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        getUserProfile()
            .then((user) => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate("/home");
                }
            })
            .catch((error) => {});
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                global.route + `/users/signin`,
                {
                    username: username,
                    password: password,
                },
                { withCredentials: true }
            );

            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/home", { replace: true });
        } catch (error) {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="flex flex-col justify-center py-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h3 className="mt-10 text-center text-2xl font-light leading-9 tracking-tight text-gray-900">
                    Roomie
                </h3>
                <h3 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h3>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label
                            htmlFor="username"
                            className="text-sm font-medium leading-6 text-gray-900 flex flex-row items-center gap-1"
                        >
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium leading-6 text-gray-900 flex flex-row items-center gap-1"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
