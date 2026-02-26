"use client";
import Link from "next/link";
import axios from "axios";
import { login } from "../../services/auth.api";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    if (!email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);

    try {
      const response = await login(email, password, role);
      toast.success("Logged in successfully!");

      router.push("/admin");
    } catch (error: any) {
      console.log("Axios error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster position="top-right" />
      <div className="bg-white  shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          <span className="bg-linear-to-r text-transparent from-green-500 to-yellow-500 bg-clip-text">
            Login
          </span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-2 inline-block w-3.5"
              />
              Email
            </label>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                autoComplete="off"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <FontAwesomeIcon
                icon={faLock}
                className="mr-2 inline-block w-3.5"
              />
              Password
            </label>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                autoComplete="off"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:shadow-outline"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="role"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="mr-2 inline-block w-3.5"
              />
              Select a Role
            </label>
            <div>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                id="role"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:shadow-outline"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="transform hover:scale-105 transition duration-400 bg-linear-to-r from-yellow-500 to-green-500 hover:from-green-700 hover:to-yellow-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
          <div className="text-center mt-4">
            <Link
              href="/forget-password"
              className="text-gray-700 hover:underline"
            >
              Forget Password?
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-700 mt-6">
          Do not have an account?{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        <div className="mt-4">
          <p className="text-center text-gray-700"> or log in with: </p>
          <div className="flex justify-center mt-2">
            <Link
              href="http://www.facebook.com"
              target="_blank"
              className="bg-green-600 transform hover:scale-105 transition duration-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-2 "
            >
              <FontAwesomeIcon icon={faFacebookF} className=" w-2" />
            </Link>
            <Link
              href="http://www.instagram.com"
              target="_blank"
              className="bg-green-600 transform hover:scale-105 transition duration-400  hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-2 "
            >
              <FontAwesomeIcon icon={faInstagram} className=" w-4" />
            </Link>
            <Link
              href="http://www.twitter.com"
              target="_blank"
              className="bg-green-600 transform hover:scale-105 transition duration-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-2 "
            >
              <FontAwesomeIcon icon={faTwitter} className=" w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
