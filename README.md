# Terra Todo List

This project is running on arm64 machine. If you are not, Please change the following,

In `contracts/todo/Cargo.toml`, change the optimize script to the following:

```toml
[package.metadata.scripts]
optimize = """docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.12.4
"""
```

## Deploy contract

The deploy command performs the following steps automatically:

- Builds the counter smart contract.

- Optimizes the counter smart contract.

- Uploads counter smart contract to LocalTerra.

- Instantiates the deployed smart contract.

```sh
terrain deploy todo --signer test-1 --network <NETWORK_NAME>
```

NOTE:

IF you get the following error:

```
CLIError: account sequence mismatch, expected 1, got 0: incorrect account sequence
```

Wait a few seconds and try the deploy again

IF you get the error:

```
no such file or directory, open 'artifacts/todo.wasm'
```

Please go to `contracts/todo/artifacts` and change the name of `todo-aarch64.wasm` to `todo.wasm`. Then, try the deploy

## Interacting with the contract

Open the console

```sh
terrain console --network <NETWORK_NAME>
```

Here are the possible functions:

1. get task count

```sh
await lib.getCount();
```

2. get task by id

```sh
 await lib.getTask('1');
```

3. create task

```sh
await lib.createTask('hello world')
```

4. toggle task complete

```sh
await lib.toggleTask('1')
```

## Front-end

Make sure the the contract address in `frontend/src/settings.ts` is updated.

```
cd frontend
yarn
yarn start
```
