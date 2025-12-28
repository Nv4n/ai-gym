import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				username: { label: "Username", placeholder: "user" },
				password: {
					label: "Password",
					type: "password",
					placeholder: "*****",
				},
			},
			authorize: async (credentials) => {
				let user = null;

				// logic to salt and hash password
				const pwHash = saltAndHashPassword(credentials.password);

				// logic to verify if the user exists
				user = await getUserFromDb(credentials.email, pwHash);

				if (!user) {
					// No user found, so this is their first attempt to login
					// Optionally, this is also the place you could do a user registration
					throw new Error("Invalid credentials.");
				}

				// return user object with their profile data
				return user;
			},
			async authorize({ request }) {
				const response = await fetch(request);
				if (!response.ok) return null;
				return (await response.json()) ?? null;
			},
		}),
	],
});
