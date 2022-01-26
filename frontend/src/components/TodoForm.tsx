import { ChangeEventHandler, useState } from "react";
import { Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { execute } from "api";
import { Msg } from "@terra-money/terra.js";
import {
  useConnectedWallet,
  useLCDClient,
  useWallet,
} from "@terra-money/wallet-provider";
import { DEFAULT_NETWORK, networks } from "settings";
const useStyles = makeStyles(() => ({
  input: {
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "1rem",
    width: "60%",
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
  const wallet = useConnectedWallet();
  const { post } = useWallet();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setContent(e.target.value);

  const handleSubmit = async () => {
    if (!wallet) return;
    const messages: Msg[] = [];
    // execute(wallet.walletAddress, content);
    messages.push(execute(wallet.walletAddress, todoAddress, content));
    try {
      await post({
        msgs: messages,
      });
    } catch (err) {
      console.log(err);
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
      <input
        type="text"
        className={classes.input}
        placeholder="enter task...."
        onChange={handleChange}
      />
      <button type="button" className={classes.btn} onClick={handleSubmit}>
        ADD
      </button>
    </Card>
  );
};

export default TodoForm;
