import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { connectWallet, sendTransaction } from "../services/walletService";

const Home: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    try {
      const wallet = await connectWallet();
      const address = await wallet.getAddress(); // Assuming getAddress() method exists on the wallet object
      setWalletAddress(address);
      console.log("Wallet connected:", wallet);
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
    }
  };

  const handleSendTransaction = async () => {
    try {
      const txReceipt = await sendTransaction(
        "DESTINATION_ADDRESS",
        "VALUE_IN_WEI",
        "DATA_PAYLOAD"
      );
      console.log("Transaction successful:", txReceipt);
    } catch (error) {
      console.error("Failed to send transaction:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wallet App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Connect to Your Wallet</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>
                    Wallet Address:{" "}
                    {walletAddress ? walletAddress : "Not connected"}
                  </p>
                </IonCardContent>
                <IonCardContent>
                  <IonButton expand="block" onClick={handleConnectWallet}>
                    Connect Wallet
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Send a Transaction</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonButton expand="block" onClick={handleSendTransaction}>
                    Send Transaction
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
