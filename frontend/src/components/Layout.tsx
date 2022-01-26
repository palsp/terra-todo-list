import Header from "components/Header";
import { makeStyles } from "@mui/styles";
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
const Layout = () => {
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
};

export default Layout;
