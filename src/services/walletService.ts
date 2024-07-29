import {
  ComethWallet,
  ConnectAdaptor,
  ComethProvider,
  SupportedNetworks,
} from "@cometh/connect-sdk";

const apiKey = "aig3ev1N2SW8EnF4wwRSUSu4CLs9DPLG"; // Replace with your actual API key
const rpcUrl = "https://sepolia-rollup.arbitrum.io/rpc"; // Updated RPC URL

const walletAdaptor = new ConnectAdaptor({
  chainId: SupportedNetworks.ARBITRUM_SEPOLIA,
  apiKey: apiKey,
});

const wallet = new ComethWallet({
  authAdapter: walletAdaptor,
  apiKey: apiKey,
  rpcUrl: rpcUrl,
});

const provider = new ComethProvider(wallet);

export const connectWallet = async () => {
  try {
    const localStorageAddress = window.localStorage.getItem("walletAddress");

    if (localStorageAddress) {
      await wallet.connect(localStorageAddress);
    } else {
      await wallet.connect();
      const walletAddress = await wallet.getAddress();
      window.localStorage.setItem("walletAddress", walletAddress);
    }

    return wallet;
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    throw error;
  }
};

export const sendTransaction = async (to: any, value: any, data: any) => {
  try {
    const txParams = { to, value, data };
    const tx = await wallet.sendTransaction(txParams);
    const txPending = await provider.getTransaction(tx.safeTxHash);
    return await txPending.wait();
  } catch (error) {
    console.error("Error sending transaction:", error);
    throw error;
  }
};
