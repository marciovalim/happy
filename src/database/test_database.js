const openDatabase = require("./database.js");

runTest();

async function runTest() {
  const database = await openDatabase();
  await database.deleteAllOrphanages();
  const orphanages = await database.getAllOrphanages();
  console.log(orphanages);
}
