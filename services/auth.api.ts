import http from "./http";
import { User } from "../types/user";


export async function login(
	email: string,
	password: string
): Promise<{ user: User; token: string }> {
	const res = await http.post("/auth/login", { email, password });
	return res.data;
}


export async function register(
	name: string,
	email: string,
	password: string,
	role: string
): Promise<{ user: User; token: string }> {
	const res = await http.post("/auth/register", {
		name,
		email,
		password,
		role,
	});
	return res.data;
}

export async function getAllUsers(
	token: string
): Promise<{ success: boolean; users: User[] }> {
	const res = await http.get("/auth/users", {
		headers: { Authorization: `Bearer ${token}` },
	});

	return res.data;
}


export async function deleteUser(userId: string, token: string) {
	return await http.delete(`/auth/users/${userId}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
}