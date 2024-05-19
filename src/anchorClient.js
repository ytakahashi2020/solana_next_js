import * as anchor from "@coral-xyz/anchor";
import { PublicKey, Idl } from "@solana/web3.js";
import IDL from "./idl.json"; // IDLファイルをsrcディレクトリに配置
import { Program } from "@coral-xyz/anchor";

const programId = new PublicKey("4rDGHPvN8HhcgujoGr86NtU2ErAoyaFYNHXZ1pkbm1Sp");

export async function getProvider(wallet) {
  console.log("Starting getProvider");
  console.log("Wallet provided to getProvider:", wallet);

  const connection = new anchor.web3.Connection(
    anchor.web3.clusterApiUrl("devnet")
  );
  console.log("Connection established");

  const opts = {
    preflightCommitment: "processed",
  };

  const provider = new anchor.AnchorProvider(connection, wallet, {});
  console.log("Provider created", provider);

  // Check the wallet's publicKey from the provider
  console.log("Provider wallet publicKey:", provider);

  return provider;
}

export async function callHelloProgram(wallet) {
  console.log("Starting callHelloProgram");
  console.log("Wallet provided:", wallet);
  const connection = new anchor.web3.Connection(
    anchor.web3.clusterApiUrl("devnet")
  );

  const provider = await getProvider(wallet);
  anchor.setProvider(provider);
  console.log("Provider obtained:", provider);
  console.log("Program ID:", programId);

  const program = new Program(IDL, programId, { connection });
  console.log("Program created");
  try {
    await program.methods.hello().rpc();
    console.log("Hello, World!");
  } catch (err) {
    console.error("Failed to call hello program:", err);
    console.error(err);
  }
}
