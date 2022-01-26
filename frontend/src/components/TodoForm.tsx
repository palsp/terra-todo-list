import { ChangeEventHandler, useState } from "react";
import { Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useWallet } from "@terra-money/wallet-provider";
import { CircularProgress } from "@mui/material";
import { DEFAULT_NETWORK, networks } from "settings";
import { useExecuteContract } from "hooks/useExecuteContract";
const useStyles = makeStyles(() => ({
  input: {
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "1rem",
    // width: "60%",
  },

  btn: {
    padding: "0.5rem",
    borderRadius: "1rem",
    border: "1px solid #ccc",
    width: "30%",
  },
}));

export const TodoForm = () => {
  const classes = useStyles();
  const {
    network: { name },
  } = useWallet();
  const todoAddress = networks[name]?.todo || networks[DEFAULT_NETWORK].todo;
  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { execute } = useExecuteContract(todoAddress);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setContent(e.target.value);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await execute({ create_task: { content } });
    } catch (err) {
      console.log(err);
    } finally {
      setContent("");
      setLoading(false);
    }
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "20vh",
        background: "transparent",
        paddingLeft: "28px",
        paddingRight: "28px",
      }}
    >
      <h1>TODO</h1>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <input
          type="text"
          className={classes.input}
          placeholder="enter task...."
          onChange={handleChange}
        />
      )}
      <button
        type="button"
        disabled={isLoading}
        className={classes.btn}
        onClick={handleSubmit}
      >
        ADD
      </button>
    </Card>
  );
};

export default TodoForm;
