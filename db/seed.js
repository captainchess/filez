import db from "#db/client";
import { faker } from "@faker-js/faker";

import { createFolder } from "./queries/folders.js";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 1; i <= 3; i++) {
    await createFolder(faker.person.firstName());

    for (let j = 1; j <= 5; j++) {
      await createFile('File' + j, 100 * j, i);
    }
  }
}
