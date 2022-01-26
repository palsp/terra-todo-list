import { getChainOptions, WalletProvider } from "@terra-money/wallet-provider";
import ReactDOM from "react-dom";

import { makeStyles } from "@mui/styles";

import Header from "components/Header";
import TodoForm from "components/TodoForm";
import TodoList from "components/TodoList";

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
      <App />
    </WalletProvider>,
    document.getElementById("root")
  );
});
