import * as anchor from "@coral-xyz/anchor";
import { BN } from "@coral-xyz/anchor";
import {
  PublicKey,
  Idl,
  SystemProgram,
  Transaction,
  ComputeBudgetProgram,
  Keypair,
} from "@solana/web3.js";
import IDL from "./idl_2.json"; // IDLファイルをsrcディレクトリに配置
import { Program } from "@coral-xyz/anchor";

const programId = new PublicKey("9wp3vskuHapMPKnMKqthzChgWghh3iJKkcbu5dgG3go5");

export async function callHelloProgram2(wallet, connection) {
  const provider = new anchor.AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  anchor.setProvider(provider);

  const program = new Program(IDL, programId, provider);

  // トランザクションの作成
  const transaction = new Transaction();

  // 計算バジェットインストラクションの追加
  transaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 200000, // 必要なユニット数（必要に応じて調整）
    })
  );
  const newAccountKp = new Keypair();
  console.log("newAccountKp.publicKey", newAccountKp.publicKey.toBase58());
  console.log("wallet.publicKey", wallet.publicKey.toBase58());

  const data = new BN(42);
  // 他のインストラクションをトランザクションに追加
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

  // トランザクションの送信
  return await provider.sendAndConfirm(transaction, [newAccountKp]);
}
