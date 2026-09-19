"use server";

import { sql } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const OwnerShipShema = z.object({
  userId: z.string({
    error: "Please select a user:",
  }),
});

const updateProjectShema = z.object({
  name: z.string().min(4, { message: "It must have at least 4 characters." }),
  description: z
    .string()
    .min(5, { message: "It must have at least 5 characters." }),
});

export type StateOwner = {
  errors?: {
    userId?: string[];
  };
  message?: string | null;
};

export type Stateupdate = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

export async function ownerShip(
  projectId: string,
  isOwner: boolean,
  userIdPrevious: string,
  prevState: StateOwner,
  formData: FormData,
) {
  if (!isOwner) {
    return {
      message: "You are not the project owner, so you cannot create tasks.",
    };
  }

  const validateFeilds = OwnerShipShema.safeParse({
    userId: formData.get("userId"),
  });

  if (!validateFeilds.success) {
    return {
      errors: validateFeilds.error.flatten().fieldErrors,
      message:
        "An error occurred; make sure you have entered the values correctly.",
    };
  }

  try {
    const { userId } = validateFeilds.data;
    await sql`UPDATE projects
    SET owner_id = ${userId}
    WHERE id = ${projectId}
    `;
    await sql`UPDATE project_members
    SET role = ${"owner"}
    WHERE user_id = ${userId} AND project_id = ${projectId}
    `;
    await sql`UPDATE project_members
    SET role = ${"member"}
    WHERE user_id = ${userIdPrevious} AND project_id = ${projectId}
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

export async function updateProject(
  projectId: string,
  isOwner: boolean,
  prevState: Stateupdate,
  formData: FormData,
) {
  if (!isOwner) {
    return {
      message: "You are not the project owner, so you cannot create tasks.",
    };
  }

  const validateFeilds = updateProjectShema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validateFeilds.success) {
    return {
      errors: validateFeilds.error.flatten().fieldErrors,
      message:
        "An error occurred; make sure you have entered the values correctly.",
    };
  }

  try {
    const { name, description } = validateFeilds.data;
    await sql`UPDATE projects
    SET name = ${name},
    description = ${description}
    WHERE id = ${projectId}
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

  redirect(`/dashboard/${projectId}/owner`);
}

export async function deleteProject(projectId: string, isOwner: boolean) {
  if (!isOwner) {
    return {
      message: "You are not the project owner, so you cannot create tasks.",
    };
  }

  await sql`DELETE FROM projects WHERE id = ${projectId}`;

  redirect(`/dashboard/no_project`);
}
