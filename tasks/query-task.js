const { task } = require("@iboss/terrain");
const { prompt } = require("./helper");

task(async ({ client }) => {
  // your logic here
  const id = await prompt("id ? >>  ");
  const t = await client.query("todo", { task: { id } });
  console.log("task", t);
});
