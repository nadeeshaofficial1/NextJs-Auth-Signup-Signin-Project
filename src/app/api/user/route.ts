import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = body;

        // Check if a user with the given email already exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Email already exists" }, { status: 409 });
        }

        // Check if a user with the given username already exists
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });

        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "Username already exists" }, { status: 409 });
        }

        // Hash the user's password
        const hashedPassword = await hash(password, 10);

        // Create a new user
        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });

        // Return a successful response with the new user
        return NextResponse.json({ user: newUser, message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
