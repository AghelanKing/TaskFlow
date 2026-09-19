"use server";

import { z } from "zod";
import { sql } from "../lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signOut } from "@/auth";

const signupShema = z.object({
  name: z.string().min(2, { message: "It must have at least 2 characters." }),
  email: z.string().email({ message: "The entered email is invalid." }),
  password: z
    .string()
    .min(6, { message: "It must have at least 6 characters." }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
  const validateFeilds = signupShema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFeilds.success) {
    return {
      errors: validateFeilds.error.flatten().fieldErrors,
      message: "The entered information is invalid",
    };
  }

  const { name, email, password } = validateFeilds.data;

  const existedUser = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (existedUser.length > 0) {
    return { message: "This user already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`INSERT INTO users (name,email,password_hash) VALUES (${name},${email},${hashedPassword})`;
  } catch (error) {
    console.log(error);
    return { message: "Registration encountered an error." };
  }

  redirect("/login");
}

export async function autenticate(
  preveState: string | undefined,
  formData: FormData,
) {
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    await signIn("credentials", data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "email or password is Invalid.";
        default:
          return "Somthing went wrong!";
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
