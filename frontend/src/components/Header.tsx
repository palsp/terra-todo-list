import ConnectWallet from "components/ConnectWallet";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "fixed",
    top: "0",
    left: "0",
    width: "95%",
    padding: "1rem",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <h1>TODO List</h1>
      <ConnectWallet />
    </header>
  );
};

export default Header;
