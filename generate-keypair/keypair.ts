import { Keypair } from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

// const keypair = Keypair.generate();

// const address = getKeypairFromEnvironment("SECRET_KEY");
// const address2 = new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN");

// console.log("Public key:", address.publicKey.toBase58());

// const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// const getAccountInfo = await connection.getAccountInfo(address2);
// console.log(`Account Info of ${address2.toBase58()}:`, getAccountInfo);
// const balance2 = await connection.getBalance(address2);
// console.log(`Balance of ${address2} in Lamports: ${balance2}`);
// const balanceInSol2 = balance2 / LAMPORTS_PER_SOL;
// console.log(
//   `Balance of ${address.publicKey.toBase58()} in Sol: ${balanceInSol2} SOL`
// );

// console.log(`Account Info of ${address.publicKey.toBase58()}:`, getAccountInfo);
// const balance = await connection.getBalance(address.publicKey);
// console.log(
//   `Balance of ${address.publicKey.toBase58()}in Lamports: ${balance}`
// );
// const balanceInSol = balance / LAMPORTS_PER_SOL;
// console.log(
//   `Balance of ${address.publicKey.toBase58()} in Sol: ${balanceInSol} SOL`
// );

const pubKey = process.argv[3];
const cluster_type = process.argv[2];
const mainnet_cluster = new Connection(
  clusterApiUrl("mainnet-beta"),
  "confirmed"
);

if (!pubKey && !cluster_type) {
  throw new Error("Public key and Cluster type is missing as argument");
} else if (!pubKey) {
  throw new Error("Public key is missing as argument");
} else if (
  !cluster_type ||
  (cluster_type !== "dev" && cluster_type !== "mainnet-beta")
) {
  throw new Error("Cluster type not chosen");
}

if (cluster_type === "mainnet-beta") {
  const address = new PublicKey(pubKey);

  const validateAddress = PublicKey.isOnCurve(address.toBuffer());
  if (validateAddress === false) {
    throw new Error("Public key is not valid");
  }
  const get_balance = await mainnet_cluster.getBalance(address);
  const userBalance = get_balance / LAMPORTS_PER_SOL;
  console.log(
    `User balance of this address "${address}" is ${userBalance} SOL`
  );
}

if (cluster_type === "dev") {
  const dev_cluster = new Connection(clusterApiUrl("devnet"), "confirmed");
  const address = new PublicKey(pubKey);
  const validateAddress = PublicKey.isOnCurve(address.toBuffer());
  if (validateAddress === false) {
    throw new Error("Public key is not valid");
  }
  const get_balance = await dev_cluster.getBalance(address);
  const userBalance = get_balance / LAMPORTS_PER_SOL;
  console.log(
    `User balance of this address "${address}" is ${userBalance} SOL`
  );
}

const connect = new Connection(clusterApiUrl("devnet"), "confirmed");
