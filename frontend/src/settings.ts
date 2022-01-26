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
    todo: "terra1x57pg2vkmas9kur8av95x28xngdg8n5pgvqqaj",
    lcd: "https://bombay-lcd.terra.dev",
  },
};
