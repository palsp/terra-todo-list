import { MsgExecuteContract, Wallet } from "@terra-money/terra.js";

export const execute = (
  walletAddress: string,
  contractAddress: string,
  content: string
) => {
  return new MsgExecuteContract(walletAddress, contractAddress, {
    create_task: {
      content,
    },
  });
};
