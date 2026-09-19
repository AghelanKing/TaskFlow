import { LatestTask } from "../ui/dashboard/LatestTasks";
import { TaskWithId } from "../ui/dashboard/tasks/EditTask";
import { Task } from "../ui/dashboard/tasks/TasksItem";
import { sql } from "./db";
import { User } from "./definitions";

export async function fetchUser(email: string | null | undefined) {
  try {
    const data = await sql<User[]>`
      SELECT * FROM users WHERE email = ${email as string}`;
    return data;
  } catch (error) {
    console.log("Database error: ", error);
    throw new Error("Error retrieving users information");
  }
}

export async function fetchProjectMembers(projectId: string) {
  try {
    const users = await sql<User[]>`SELECT 
    users.* FROM users
  JOIN project_members ON users.id = project_members.user_id
  WHERE project_members.project_id = ${projectId}
`;
    return users;
  } catch (error) {
    console.log("Database error: ", error);
    throw new Error("Error retrieving project_member information");
  }
}

export async function fetchProject(projectId: string) {
  try {
    const project = await sql`
    SELECT 
    id,
    name,
    description,
    owner_id
    FROM projects WHERE id = ${projectId}`;
    return project;
  } catch (error) {
    console.log("Database error: ", error);
    throw new Error("Error retrieving projects information");
  }
}

export async function getProjectAndUser(
  userEmail: string | null | undefined,
  projectId: string,
) {
  const user = await fetchUser(userEmail);

  let project;

  if (projectId !== "no_project") {
    project = await fetchProject(projectId);
  }

  return { project, user };
}

export async function fetchAllTasks(projectId: string, query: string) {
  try {
    const allTasks = await sql<Task[]>`SELECT 
    tasks.id,
    tasks.title,
     tasks.status,
     tasks.priority,
     users.name as userName,
     tasks.assigned_to as userid
     FROM tasks
     LEFT JOIN users ON tasks.assigned_to = users.id
    WHERE
    tasks.project_id = ${projectId}
    AND (
    tasks.title ILIKE ${`%${query}%`}
    OR users.name ILIKE ${`%${query}%`}
    )
     ORDER BY tasks.updated_at DESC
     `;

    return allTasks;
  } catch (error) {
    console.log("Database error: ", error);
    throw new Error("Error retrieving all tasks information");
  }
}

export async function fetchLatestTasks(projectId: string) {
  if (projectId === "no_project") return;

  try {
    const allTasks = await sql<LatestTask[]>`SELECT 
    tasks.id,
    tasks.title,
    tasks.status,
    users.name as userName,
    tasks.assigned_to as userid
    FROM tasks
    LEFT JOIN users ON tasks.assigned_to = users.id
    WHERE tasks.project_id = ${projectId}
    ORDER BY tasks.updated_at DESC
    LIMIT 4
     `;

    return allTasks;
  } catch (error) {
    console.log("Database error: ", error);
    throw new Error("Error retrieving all tasks information");
  }
}

export async function fetchTaskWithId(projectId: string, taskId: string) {
  try {
    const task = await sql<TaskWithId[]>`SELECT
    tasks.id,
    tasks.title,
    tasks.due_date,
    tasks.description,
    tasks.priority,
    tasks.status,
    users.id as userId,
    users.name as username,
    projects.name as projectName
    FROM tasks
    LEFT JOIN users ON tasks.assigned_to = users.id
    JOIN projects ON tasks.project_id = projects.id
    WHERE tasks.id = ${taskId} AND tasks.project_id = ${projectId}
    `;

    return task;
  } catch (error) {
    console.log("Database error: ", error);
    throw new Error("Error retrieving task information");
  }
}

export async function fetchStatisticalCards(projectId: string) {
  try {
    if (projectId === "no_project") return;
    const [userCount, taskCount, doneCount, overdueCount] = await Promise.all([
      sql`SELECT COUNT(*) FROM project_members WHERE project_id = ${projectId}`,
      sql`SELECT COUNT(*) FROM tasks WHERE project_id = ${projectId}`,
      sql`SELECT COUNT(*) FROM tasks WHERE project_id = ${projectId} AND status = ${"done"}`,
      sql`SELECT COUNT(*) FROM tasks WHERE project_id = ${projectId} AND due_date < NOW() AND status != ${"done"}`,
    ]);

    const totalUsers = Number(userCount[0]?.count);
    const totalTasks = Number(taskCount[0]?.count);
    const totalDone = Number(doneCount[0]?.count);
    const overdueTask = Number(overdueCount[0]?.count);

    return {
      totalUsers,
      totalTasks,
      complateRate:
        totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0,
      overdueTask,
    };
  } catch (error) {
    console.log("Database error: ", error);
    throw new Error("Error retrieving statistical cards information");
  }
}

export async function fetchUsers(projectId: string, query: string) {
  try {
    const allTasks = await sql<User[]>`SELECT 
    users.*
    FROM users
    JOIN project_members ON users.id = project_members.user_id
    WHERE
    project_members.project_id = ${projectId}
    AND (
    users.name ILIKE ${`%${query}%`}
    OR users.email ILIKE ${`%${query}%`}
    )
     `;

    return allTasks;
  } catch (error) {
    console.log("Database error: ", error);
    throw new Error("Error retrieving users information");
  }
}
