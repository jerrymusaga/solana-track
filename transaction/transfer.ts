import "dotenv/config";
import {
  Keypair,
  Connection,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  clusterApiUrl,
  SystemProgram,
} from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { argv } from "process";

const publicKey = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const transaction = new Transaction();

const transferAmount = 1000;

const suppliedPK = argv[2];

const pubKeyToSendTo = new PublicKey(suppliedPK);

if (!suppliedPK) {
  throw new Error("Public key is missing as argument");
}

const transfer = SystemProgram.transfer({
  fromPubkey: publicKey.publicKey,
  toPubkey: pubKeyToSendTo,
  lamports: transferAmount,
});

transaction.add(transfer);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  publicKey,
]);

console.log(
  `${publicKey.publicKey.toBase58()} has sent ${transferAmount} to ${pubKeyToSendTo.toBase58()} with hash: https://explorer.solana.com/tx/${signature}?cluster=devnet`
);
