import {
  getChainOptions,
  useWallet,
  WalletProvider,
} from "@terra-money/wallet-provider";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "store";

import { makeStyles } from "@mui/styles";

import Header from "components/Header";
import TodoForm from "components/TodoForm";
import TodoList from "components/TodoList";
import { get } from "settings";
import { useAppDispatch, useQuery } from "hooks";

import { fetchTodo } from "store/todo-action";
import { useEffect } from "react";

const useStyles = makeStyles(() => ({
  container: {
    margin: "100px",
  },
  main: {
    marginTop: "90px",
    width: "100%",
    minHeight: "calc(100vh - 88px)",
    display: "flex",
    flexDirection: "column",
  },
}));

function App() {
  const { network } = useWallet();
  const todoContractAddress = get(network.name, "todo");

  const queryHooks = useQuery(network);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodo(todoContractAddress, queryHooks));
  }, [dispatch]);

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Header />
      <main className={classes.main}>
        <TodoForm />
        <TodoList />
      </main>
      <footer></footer>
    </div>
  );
}

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <Provider store={store}>
        <App />
      </Provider>
    </WalletProvider>,
    document.getElementById("root")
  );
});
