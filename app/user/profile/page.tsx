"use client";
import {useState} from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
export default function ProfilePage() {
    const[name,setname] = useState("");
    const[email,setemail] = useState("");
    const[password,setpassword] = useState("");
    const[loading,setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try{
            await axios.put("http://localhost:5000/api/user/update",{
                name,
                email,
                password
            });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
};
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <Toaster position="top-right" />
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                       Update Profile
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            required
                            onChange={(e)=>setname(e.target.value)}
                            className="w-full px-3 py-2 shadowborder rounded"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            required
                            onChange={(e)=>setemail(e.target.value)}
                            className="w-full px-3 py-2 shadowborder rounded"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            required
                            onChange={(e)=>setpassword(e.target.value)}
                            className="w-full px-3 py-2 shadowborder rounded"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}