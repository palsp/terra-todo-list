# Terra Todo List

## Build the Contract

To build your contract, run the following command. This will check for any preliminary errors before optimizing.

```sh
cargo wasm
```

### optimize build

You will need to make sure the output WASM binary is as small as possible in order to minimize fees and stay under the size limit for the blockchain.

```sh
cargo run-script optimize
```

### build the schema

You can then build the schemas with:

```sh
cargo schema
```

## Interacting with the Contract

Make sure you have set up LocalTerra and that it is up and running:

```sh
cd localterra
docker-compose up
```

In a separate terminal, make sure to set up the following mnemonic:

```sh
terrad keys add test1 --recover
```

Using the mnemonic:

```
satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn
```

### Uploading Code

```
terrad tx wasm store artifacts/todo-aarch64.wasm --from test1 --chain-id='testnet' --gas=auto --fees=100000uluna --broadcast-mode=block
```

You can check it out:

```sh
terrad query wasm code 1

code_hash: 4JyVUUMQesikEw5XhCqrfK/EPFAhnaEb5QSZQSuC4LE=
code_id: "1"
creator: terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8
```

### Creating the Contract

```
terrad tx wasm instantiate 1 '{}' --from test1 --chain-id=localterra --fees=10000uluna --gas=auto --broadcast-mode=block
```

Check out your contract information:

```sh
terrad query wasm contract terra10pyejy66429refv3g35g2t7am0was7ya7kz2a4

```

### Execute the Contract

1. Crate todo's task

```json
{
  "create_task": {
    "content": "hello world"
  }
}
```

```sh
terrad tx wasm execute terra10pyejy66429refv3g35g2t7am0was7ya7kz2a4 '{"create_task" : {"content" : "hello world"}}' --from test1 --chain-id=localterra --fees=1000000uluna --gas=auto --broadcast-mode=block
```

2. Update task's status

```json
{
  "toggle_complete_task": {
    "id": "1"
  }
}
```

```sh
terrad tx wasm execute terra10pyejy66429refv3g35g2t7am0was7ya7kz2a4 '{ "toggle_complete_task": { "id": "1" } }' --from test1 --chain-id=localterra --fees=1000000uluna --gas=auto --broadcast-mode=block
```

### Query

#### Query Task

```json
{
  "task": {
    "id": "1"
  }
}
```

```
terrad query wasm contract-store terra10pyejy66429refv3g35g2t7am0was7ya7kz2a4 '{"task":{ "id" : "1"}}'
```

### Query Config

```json
{
  "config": {}
}
```

```
terrad query wasm contract-store terra1x57pg2vkmas9kur8av95x28xngdg8n5pgvqqaj '{"config":{}}'
```
