module.exports = ({ wallets, refs, config, client }) => ({
  getCount: () => client.query("todo", { config: {} }),
  getTask: (id) => client.query("todo", { task: { id } }),
  createTask: (content, signer = wallets.validator) =>
    client.execute(signer, "todo", { create_task: { content } }),
  toggleTask: (id, signer = wallets.validator) =>
    client.execute(signer, "todo", { toggle_complete_task: { id } }),
});
