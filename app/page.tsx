"use client";
import Link from "next/link";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          role,
        },
      );
      console.log(response.data);
      toast.success("Account created successfully!");
      router.push("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster position="top-right" />
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          <span className="bg-linear-to-r text-transparent from-green-500 to-yellow-500 bg-clip-text">
            SignUp
          </span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="mr-2 inline-block w-3.5"
              />
              First Name
            </label>
            <div>
              <input
                type="text"
                required
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="off"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:shadow-outline"
                placeholder="Enter your first name"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="mr-2 inline-block w-3.5"
              />
              Last Name
            </label>
            <div>
              <input
                type="text"
                id="lastName"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="off"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:shadow-outline"
                placeholder="Enter your last name"
              />
            </div>
          </div>
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
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
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
                required
                id="password"
                autoComplete="off"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:shadow-outline"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <FontAwesomeIcon
                icon={faLock}
                className="mr-2 inline-block w-3.5"
              />
              Confrim Password
            </label>
            <div>
              <input
                type="password"
                value={confirmPassword}
                required
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:shadow-outline"
                placeholder="Confirm password"
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
                id="role"
                value={role}
                required
                onChange={(e) => setRole(e.target.value)}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:shadow-outline"
              >
                <option value="">Select an option</option>
                <option value="admin">Admin</option>
                <option value="cashier">User</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className=" transform hover:scale-105 cursor-pointer transition duration-400 bg-linear-to-r from-yellow-500 to-green-500 hover:from-green-700 hover:to-yellow-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-700 mt-6">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-600 hover:underline cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
