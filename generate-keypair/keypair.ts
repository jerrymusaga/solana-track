import { Keypair } from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// const keypair = Keypair.generate();

const keypair = getKeypairFromEnvironment("SECRET_KEY");

// console.log("Keypair generated", keypair);
console.log("Public key:", keypair.publicKey.toBase58());
