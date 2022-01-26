import React from "react";
import { Connection } from "@terra-money/wallet-provider";

interface Props {
  connection: Connection;
}

const WalletIcon: React.FC<Props> = ({ connection }) => {
  return (
    <img
      src={connection?.icon}
      alt={connection?.name}
      style={{
        width: "1em",
        height: "1em",
        marginRight: "1em",
      }}
    />
  );
};

export default WalletIcon;
