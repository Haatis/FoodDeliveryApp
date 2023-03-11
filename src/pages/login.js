/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isLoginForm) {
        const response = await axios.post("/api/login", { email, password });
        console.log(response.data);
        // Handle successful login
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", true); // set isLoggedIn to true
        window.location.href = "/";
      } else {
        const response = await axios.post("/api/register", { email, password });
        console.log(response.data);
        // Handle successful registration
        setIsLoginForm(true); // switch back to login form
        setErrorMessage("Registration successful! Please log in to continue.");
      }
    } catch (error) {
      console.log(error.response.data);
      // Handle error
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">
          {isLoginForm ? "Login" : "Register"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              className="border border-gray-300 px-3 py-2 w-full rounded-lg"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              className="border border-gray-300 px-3 py-2 w-full rounded-lg"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {isLoginForm ? (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Register
            </button>
          )}
        </form>
        <div className="mt-4">
          {isLoginForm ? (
            <p>
              Don't have an account?{" "}
              <a
                href="#"
                onClick={toggleForm}
                className="text-blue-500 hover:text-blue-600"
              >
                Sign up
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <a
                href="#"
                onClick={toggleForm}
                className="text-blue-500 hover:text-blue-600"
              >
                Login
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
