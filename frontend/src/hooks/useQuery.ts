import { LCDClient } from "@terra-money/terra.js";
import { NetworkInfo } from "@terra-money/wallet-provider";
import { get } from "settings";

export type ConfigQuery = { config: {} };

export type TaskQuery = { task: { id: string } };
export type QueryMsg = ConfigQuery | TaskQuery;

export type UseQueryResult = ReturnType<typeof useQuery>;

export const useQuery = ({ name, chainID }: NetworkInfo) => {
  const lcd = new LCDClient({
    URL: get(name, "lcd"),
    chainID: chainID,
  });

  async function query<T>(contractAddress: string, msg: QueryMsg) {
    const resp = await lcd.apiRequester.get<{
      result: T;
    }>(`wasm/contracts/${contractAddress}/store`, {
      query_msg: JSON.stringify(msg),
    });
    return resp.result;
  }

  return { query };
};
