import { LCDClient } from "@terra-money/terra.js";
import { NetworkInfo } from "@terra-money/wallet-provider";
import { networks, DEFAULT_NETWORK } from "settings";

export const useQuery = ({ name, chainID }: NetworkInfo) => {
  const lcd = new LCDClient({
    URL: networks[name]?.lcd || networks[DEFAULT_NETWORK].lcd,
    chainID: chainID,
  });

  async function query<T>(contractAddress: string, msg: object) {
    const resp = await lcd.apiRequester.get<{
      result: T;
    }>(`wasm/contracts/${contractAddress}/store`, {
      query_msg: JSON.stringify(msg),
    });
    return resp.result;
  }

  return { query };
};
