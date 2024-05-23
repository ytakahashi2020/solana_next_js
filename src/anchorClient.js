import * as anchor from "@coral-xyz/anchor";
import { PublicKey, Idl, SystemProgram } from "@solana/web3.js";
import IDL from "./idl.json"; // IDLファイルをsrcディレクトリに配置
import { Program } from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const programId = new PublicKey("467TS9z5e37HuPvkQBv4nNndyaK2GpnF2bZY2HsdpkcH");

export async function getProvider(wallet, connection) {
  // console.log("Starting getProvider");
  // console.log("Wallet provided to getProvider:", wallet);

  // // const connection = new anchor.web3.Connection(
  // //   anchor.web3.clusterApiUrl("devnet")
  // // );
  // console.log("Connection established");

  // const opts = {
  //   commitment: "confirmed",
  // };

  const provider = new anchor.AnchorProvider(connection, wallet, opts);
  console.log("Provider created", provider);

  // Check the wallet's publicKey from the provider
  console.log("Provider wallet publicKey:", provider);

  return provider;
}

export async function callHelloProgram(program) {
  // const provider = new anchor.AnchorProvider(connection, wallet, {
  //   commitment: "confirmed",
  // });

  // const program = new Program(IDL, programId, provider);

  try {
    await program.methods.hello().rpc();
    console.log("Hello, World!");
  } catch (err) {
    console.error("Failed to call hello program:", err);
    console.error(err);
  }
}
