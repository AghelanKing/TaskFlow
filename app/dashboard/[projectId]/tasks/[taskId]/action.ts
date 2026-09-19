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
  priority: z.enum(["low", "medium", "high"], {
    error: "Please select a priority.",
  }),
  status: z.enum(["todo", "in_progress", "done"], {
    error: "Please select a status",
  }),
});

export type StateTask = {
  errors?: {
    userId?: string[];
    title?: string[];
    priority?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function editTask(
  projectId: string,
  taskId: string | null,
  isOwner: boolean,
  isUser: boolean,
  prevState: StateTask,
  formData: FormData,
) {
  if (!isOwner && !isUser) {
    return {
      message: "You are unable to edit this task.",
    };
  }

  const validateFeilds = createTaskShema.safeParse({
    userId: formData.get("userId"),
    title: formData.get("title"),
    description: formData.get("description"),
    due_date: formData.get("due_date"),
    priority: formData.get("priority"),
    status: formData.get("status"),
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
    const { userId, title, description, due_date, priority, status } =
      validateFeilds.data;

    await sql`
  UPDATE tasks
  SET
    title = ${title},
    description = ${description || null},
    due_date = ${due_date || null},
    priority = ${priority},
    status = ${status},
    assigned_to = ${userId},
    updated_at = NOW()
  WHERE id = ${taskId} AND project_id = ${projectId}
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

export async function deleteTask(projectId: string, taskId: string) {
  await sql`DELETE FROM tasks WHERE id = ${taskId}`;
  revalidatePath(`/dashboard/${projectId}/tasks`);
  redirect(`/dashboard/${projectId}/tasks`);
}
