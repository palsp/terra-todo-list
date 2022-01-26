const { task } = require("@iboss/terrain");

task(async ({ wallets, refs, config, client }) => {
  // your logic here
  const conf = await client.query("todo", { config: {} });
  console.log("config", conf);
});
