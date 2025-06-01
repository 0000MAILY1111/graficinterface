import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "y/schemas"
import { db } from "y/server/db";
import { ZodError } from "zod";
import { email } from "zod/v4"


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
        const { db } = await import("y/server/db");

        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return "User already exists";
        }

        const hash = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                email,
                password: hash,
            },
        });

    } catch (error) {
        if (error instanceof ZodError) {
            return error.errors.map((error) => error.message).join(", ");
        }
        return "Registration failed";
    }

    redirect("/signin");
}