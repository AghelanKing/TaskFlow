"use server";

import { sql } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createTaskShema = z.object({
  userId: z.string({
    error: "Please select a user:",
  }),
  title: z.string().min(4, { message: "It must have at least 4 characters." }),
  description: z.string().nullable().optional(),
  due_date: z.string().nullable().optional(),
  priority: z
    .enum(["low", "medium", "high"], {
      error: "Please select a priority.",
    })
    .default("medium"),
});

export type StateTask = {
  errors?: {
    userId?: string[];
    title?: string[];
    priority?: string[];
  };
  message?: string | null;
};

export async function createTask(
  projectId: string,
  isOwner: boolean,
  prevState: StateTask,
  formData: FormData,
) {
  if (!isOwner) {
    return {
      message: "You are not the project owner, so you cannot create tasks.",
    };
  }

  const validateFeilds = createTaskShema.safeParse({
    userId: formData.get("userId"),
    title: formData.get("title"),
    description: formData.get("description"),
    due_date: formData.get("due_date"),
    priority: formData.get("priority"),
  });

  console.log(validateFeilds.error);

  if (!validateFeilds.success) {
    return {
      errors: validateFeilds.error.flatten().fieldErrors,
      message:
        "An error occurred; make sure you have entered the values correctly.",
    };
  }

  try {
    const { userId, title, description, due_date, priority } =
      validateFeilds.data;

    await sql`
      INSERT INTO tasks (title, description, status, priority, due_date, project_id, assigned_to)
      VALUES (
        ${title},
        ${description || null},
        ${"todo"},
        ${priority},
        ${due_date || null},
        ${projectId},
        ${userId}
      )
    `;
  } catch (error) {
    console.log(error);
    return {
      message:
        "An error occurred; make sure you have entered the values correctly.",
    };
  }

  revalidatePath(`/dashboard/${projectId}/tasks`);
  redirect(`/dashboard/${projectId}/tasks`);
}
