import { Client } from "@notionhq/client";
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const database_id = process.env.NOTION_PROJECTS_DATABASE_ID as string;

export async function getAllProjects() {
  const posts = await notion.databases.query({
    database_id,
  });
  return posts.results;
}

export async function getAllProjectsIds() {
  const posts = await notion.databases.query({
    database_id,
  });

  return posts.results.map((post: any) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}

export async function getProject(id: string) {
  const post = await notion.pages.retrieve({ page_id: id });

  return post;
}
