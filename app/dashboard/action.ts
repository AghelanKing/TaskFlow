"use server";

import { z } from "zod";
import { sql } from "../lib/db";
import { redirect } from "next/navigation";

const createProjectShema = z.object({
  name: z.string().min(4, { message: "It must have at least 4 characters." }),
  description: z
    .string()
    .min(5, { message: "It must have at least 5 characters." }),
});

const goToProjectShema = z.object({
  name: z.string().min(4, { message: "It must have at least 4 characters." }),
});

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

export type StateGo = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createProject(
  ownerId: string,
  prevState: State,
  formData: FormData,
) {
  const validateFeilds = createProjectShema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validateFeilds.success) {
    return {
      errors: validateFeilds.error.flatten().fieldErrors,
      message: "The entered information is invalid",
    };
  }

  let projectId;

  try {
    const { name, description } = validateFeilds.data;

    const existingProject = await sql`
  SELECT id FROM projects WHERE name = ${name}
`;

    if (existingProject.length > 0) {
      return {
        message: "This name has already been chosen; choose another name.",
      };
    }

    const project = await sql`
      INSERT INTO projects (name, description, owner_id)
      VALUES (${name}, ${description}, ${ownerId})
      RETURNING id
    `;
    projectId = project?.at(0)?.id;

    if (projectId) {
      await sql`
    INSERT INTO project_members (project_id, user_id, role)
    VALUES (${projectId}, ${ownerId}, ${"owner"})
  `;
    }
  } catch (error) {
    console.log(error);
    return { message: "Project creation failed." };
  }

  redirect(`/dashboard/${projectId}`);
}

export async function goToProject(
  userId: string,
  prevState: StateGo,
  formData: FormData,
) {
  const validateFeilds = goToProjectShema.safeParse({
    name: formData.get("name"),
  });

  if (!validateFeilds.success) {
    return {
      errors: validateFeilds.error.flatten().fieldErrors,
      message: "The entered information is invalid",
    };
  }

  let projectId;

  try {
    const { name } = validateFeilds.data;
    const project = await sql`SELECT * FROM projects WHERE name = ${name}`;

    projectId = project?.at(0)?.id;

    const project_member =
      await sql`SELECT * FROM project_members WHERE user_id = ${userId} AND project_id = ${projectId}`;

    const isMember = project_member?.at(0);

    if (!isMember) {
      await sql`INSERT INTO project_members (project_id, user_id, role) VALUES (${projectId}, ${userId}, ${"member"})`;
    }
  } catch (error) {
    console.log(error);
    return {
      message: "An error occurred; ensure that the entered value is correct.",
    };
  }

  redirect(`/dashboard/${projectId}`);
}
