"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          <span className="bg-linear-to-r text-transparent from-green-500 to-yellow-500 bg-clip-text">
            Login
          </span>
        </h2>
        <form>
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
                type="text"
                id="email"
                autoComplete="off"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
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
                id="password"
                autoComplete="off"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:shadow-outline"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-linear-to-r from-yellow-500 to-green-500 hover:from-green-700 hover:to-yellow-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </div>
          <div className="text-center mt-4">
            <Link href="/" className="text-gray-700 hover:underline">
              Forget Password?
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-700 mt-6">
          Do not have an account?
          <Link href="/" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        <div className="mt-4">
          <p className="text-center text-gray-700"> or log in with: </p>
          <div className="flex justify-center mt-2">
            <Link
              href="/"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2 "
            >
              <FontAwesomeIcon icon={faFacebookF} className=" w-2" />
            </Link>
            <Link
              href="/"
              className="bg-green-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-2 "
            >
              <FontAwesomeIcon icon={faInstagram} className=" w-4" />
            </Link>
            <Link
              href="/"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2 "
            >
              <FontAwesomeIcon icon={faTwitter} className=" w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
