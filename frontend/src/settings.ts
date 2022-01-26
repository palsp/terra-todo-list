export interface ISetting {
  todo: string;
  lcd: string;
}

export const DEFAULT_NETWORK = "testnet";

export const networks: Record<string, ISetting> = {
  localterra: {
    todo: "terra1x57pg2vkmas9kur8av95x28xngdg8n5pgvqqaj",
    lcd: "http://localhost:1317",
  },
  testnet: {
    todo: "terra1d5g6tsxw09jwr8a866jveu8pq369xkf268uxmu",
    lcd: "https://bombay-lcd.terra.dev",
  },
};

export const get = (network: string, key: keyof ISetting) => {
  return networks[network]?.[key] || networks[DEFAULT_NETWORK][key];
};
