import { Client } from "@notionhq/client";
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
const database_id = process.env.NOTION_BLOG_DATABASE_ID as string;

export async function getAllPosts() {
  const posts = await notion.databases.query({
    database_id,
  });
  return posts.results;
}

export async function getAllPostIds() {
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

export async function getPost(id: string) {
  const post = await notion.pages.retrieve({ page_id: id });

  return post;
}

export async function getBlocks(id: string) {
  const blocks = [];
  let cursor;
  while (true) {
    const { results, next_cursor }: any = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: id,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks;
}
