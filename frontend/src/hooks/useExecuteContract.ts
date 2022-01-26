import { MsgExecuteContract } from "@terra-money/terra.js";
import { useConnectedWallet, useWallet } from "@terra-money/wallet-provider";

export type ExecuteMsg =
  | {
      create_task: {
        content: string;
      };
    }
  | {
      toggle_complete_task: {
        id: string;
      };
    };

export const useExecuteContract = (contractAddress: string) => {
  const { post } = useWallet();
  const wallet = useConnectedWallet();

  const execute = async (msg: ExecuteMsg) => {
    if (!wallet) {
      throw new Error("please connect the wallet");
    }

    const message = new MsgExecuteContract(
      wallet.walletAddress,
      contractAddress,
      msg
    );

    await post({ msgs: [message] });
  };

  return { execute };
};
