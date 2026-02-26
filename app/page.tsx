"use client";
import Link from "next/link";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { register } from "../services/auth.api";
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
      const response = await register(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role,
      );

      toast.success("Account created successfully!");

      router.push("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Registeration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Toaster position="top-right" />
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          <span className="bg-linear-to-r text-transparent from-green-500 to-yellow-500 bg-clip-text">
            SignUp
          </span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
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
              <input
                type="text"
                id="firstName"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="off"
                className="shadow border rounded w-full max-w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                placeholder="Enter your first name"
              />
            </div>
            <div className="flex-1">
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
              <input
                type="text"
                id="lastName"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="off"
                className="shadow border rounded w-full max-w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
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
            <input
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="shadow border rounded w-full max-w-full py-2 px-3 text-gray-700 focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>

          <div>
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
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="shadow border rounded w-full max-w-full py-2 px-3 text-gray-700 focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <FontAwesomeIcon
                icon={faLock}
                className="mr-2 inline-block w-3.5"
              />
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              className="shadow border rounded w-full max-w-full py-2 px-3 text-gray-700 focus:shadow-outline"
              placeholder="Confirm password"
            />
          </div>

          <div>
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
            <select
              id="role"
              value={role}
              required
              onChange={(e) => setRole(e.target.value)}
              className="shadow border rounded w-full max-w-full py-2 px-3 text-gray-700 focus:shadow-outline"
            >
              <option value="">Select an option</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-yellow-500 to-green-500 hover:from-green-700 hover:to-yellow-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-105 transition duration-400"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
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
