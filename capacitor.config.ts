import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "myConnectWalletApp",
  webDir: "dist",
  server: {
    url: "http://169.155.250.241:8100",
    cleartext: true,
  },
};

export default config;
