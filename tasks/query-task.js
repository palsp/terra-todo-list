const { task } = require("@iboss/terrain");

task(async ({ wallets, refs, config, client }) => {
  // your logic here
  const t = await client.query("todo", { task: { id: "1" } });
  console.log("task", t);
});
