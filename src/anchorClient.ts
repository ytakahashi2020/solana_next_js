import * as anchor from "@coral-xyz/anchor";
import { BN } from "@coral-xyz/anchor";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  ComputeBudgetProgram,
  Keypair,
  Connection,
} from "@solana/web3.js";
import IDL from "./idl.json";
import IDL_anchor from "./idl_2.json"; // IDLファイルをsrcディレクトリに配置
import { Program } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";

const programId = new PublicKey("467TS9z5e37HuPvkQBv4nNndyaK2GpnF2bZY2HsdpkcH");
const programId_2 = new PublicKey(
  "9wp3vskuHapMPKnMKqthzChgWghh3iJKkcbu5dgG3go5"
);

function createProvider(wallet: AnchorWallet, connection: Connection) {
  const provider = new anchor.AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  anchor.setProvider(provider);
  return provider;
}

function createTransaction() {
  const transaction = new Transaction();
  transaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 200000, // 必要なユニット数（必要に応じて調整）
    })
  );
  return transaction;
}

export async function callHelloProgram(
  wallet: AnchorWallet,
  connection: Connection
) {
  const provider = createProvider(wallet, connection);
  const program = new Program(IDL, programId, provider);
  const transaction = createTransaction();

  transaction.add(
    await program.methods.initialize().accounts({}).instruction()
  );

  return await provider.sendAndConfirm(transaction);
}

export async function callHelloAnchorProgram(
  wallet: AnchorWallet,
  connection: Connection
) {
  const provider = createProvider(wallet, connection);
  const program = new Program(IDL_anchor, programId_2, provider);
  const transaction = createTransaction();

  const newAccountKp = new Keypair();
  console.log("newAccountKp.publicKey", newAccountKp.publicKey.toBase58());
  console.log("wallet.publicKey", wallet.publicKey.toBase58());

  const data = new BN(10);
  transaction.add(
    await program.methods
      .initialize(data)
      .accounts({
        newAccount: newAccountKp.publicKey,
        signer: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction()
  );
  console.log("transaction");

  return await provider.sendAndConfirm(transaction, [newAccountKp]);
}
