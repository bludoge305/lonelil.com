import fs from "fs";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "projects");

export function getAllProjects() {
  const fileNames = fs.readdirSync(projectsDirectory);

  return fileNames.map((fileName) => {
    const file = JSON.parse(
      fs.readFileSync(`${projectsDirectory}/${fileName}`, "utf8")
    );

    return {
      id: fileName.replace(/\.json$/, ""),
      ...file,
    };
  });
}
