import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                await dbConnect();
                console.log("Credentials received:", credentials.email, credentials.password);

                const user = await User.findOne({ email: credentials.email }).select("+password");
                console.log("Credentials from DB User", user.email, user.password);
                if (!user) {
                    throw new Error("No user found with this email");
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                console.log("🔍 Password Check for:", user.email);
                console.log("Result:", isPasswordCorrect ? "✅ MATCH" : "❌ FAIL");
                if (isPasswordCorrect) {
                    console.log("password matched successfully");
                }
                if (!isPasswordCorrect) {
                    throw new Error("Invalid password");
                }

                // The object returned here is passed to the JWT callback
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role || "customer",
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            // When the user signs in, the 'user' object is available
            if (user) {
                token.id = user._id || user.id; // Store the MongoDB ID
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            // Pass the ID from the token to the session object
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

