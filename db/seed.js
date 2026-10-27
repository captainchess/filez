import db from "#db/client";
import "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 0; i < 3; i++)  {
    const folder = {
      name: faker.person.firstName()
    };
    await createFolder(folder);

    for (let j = 0; j < 5; i++) {
      const file = {
        name: faker.finance.accountName(),
        size: Math.floor(Math.random() * 100),
        folder_id: i
      };
      await createFile(file);
    }
  }
}
