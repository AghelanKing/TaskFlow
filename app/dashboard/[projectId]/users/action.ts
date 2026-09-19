"use server";

import { sql } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const updateProjectShema = z.object({
  name: z.string().min(4, { message: "It must have at least 4 characters." }),
  password: z.string().nullable().optional(),
});

export type Stateupdate = {
  errors?: {
    name?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function updateUser(
  projectId: string,
  userId: string,
  prevState: Stateupdate,
  formData: FormData,
) {
  const validateFeilds = updateProjectShema.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  if (!validateFeilds.success) {
    return {
      errors: validateFeilds.error.flatten().fieldErrors,
      message:
        "An error occurred; make sure you have entered the values correctly.",
    };
  }

  try {
    const { name, password } = validateFeilds.data;
    const password_hash = await bcrypt.hash(password as string, 10);
    await sql`UPDATE users
    SET name = ${name},
    password_hash = ${password_hash}
    WHERE id = ${userId}
    `;
  } catch (error) {
    console.log(error);
    return {
      message:
        "An error occurred; make sure you have entered the values correctly.",
    };
  }

  revalidatePath(`/dashboard/${projectId}`);
  revalidatePath(`/dashboard/${projectId}/owner`);
  revalidatePath(`/dashboard/${projectId}/task`);
  revalidatePath(`/dashboard/${projectId}/users`);

  redirect(`/dashboard/${projectId}`);
}

export async function deleteUser(
  projectId: string,
  userId: string,
  isOwner: boolean,
  ownerId: string,
) {
  if (!isOwner) {
    return {
      message: "You are not the project owner, so you cannot create tasks.",
    };
  }

  const isOwnerForDeleteProject = userId === ownerId;

  await sql`DELETE FROM project_members WHERE user_id = ${userId}`;

  if (isOwnerForDeleteProject) {
    await sql`DELETE FROM projects WHERE id = ${projectId}`;
    redirect(`/dashboard/no_project`);
  }

  revalidatePath(`/dashboard/${projectId}/users`);
}
