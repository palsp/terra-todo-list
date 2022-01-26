module.exports = ({ wallets, refs, config, client }) => ({
  getCount: () => client.query("todo", { config: {} }),
  createTask: (content, signer = wallets.validator) =>
    client.execute(signer, "todo", { create_task: { content } }),
});
