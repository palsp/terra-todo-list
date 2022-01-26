import { getChainOptions, WalletProvider } from "@terra-money/wallet-provider";
import Layout from "components/Layout";
import ReactDOM from "react-dom";

function App() {
  return <Layout />;
}

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>,
    document.getElementById("root")
  );
});
