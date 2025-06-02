"use server"

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signUpSchema } from "y/schemas";
import { signIn, signOut } from "y/server/auth";
import { db } from "y/server/db";
import { email } from "zod/v4"
import { ZodError } from "zod";

///authactions ///siguPshcema register 
export async function signout () {
    await signOut();
}
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                return "Invalid credentials";
                default:
                    return " Something went wrong "
            }
        }
        throw error; // Re-throw the error if it's not an AuthError
    }
}

export async function register(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const { email, password } = await signUpSchema.parseAsync({
            email: formData.get("email"),
            password: formData.get("password"),
        });
        // Dynamic import to avoid bundling db on client
        //const { db } = await import("y/server/db");
        const user = await db.user.findUnique({
            where: {
                email: email,
            }
        });

        if (user) {
            return "User already exists";
        }
        const hash = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                email: email,
                password: hash,
            },
        });

    } catch (error) {
        if (error instanceof ZodError) {
            return error.errors.map((error) => error.message).join(", ");
        }
    }
    redirect("/signin");
}