import * as anchor from "@coral-xyz/anchor";
import {
  PublicKey,
  Idl,
  SystemProgram,
  Transaction,
  ComputeBudgetProgram,
} from "@solana/web3.js";
import IDL from "./idl.json"; // IDLファイルをsrcディレクトリに配置
import { Program } from "@coral-xyz/anchor";

const programId = new PublicKey("467TS9z5e37HuPvkQBv4nNndyaK2GpnF2bZY2HsdpkcH");

export async function callHelloProgram(wallet, connection) {
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

  // 他のインストラクションをトランザクションに追加
  transaction.add(
    await program.methods.initialize().accounts({}).instruction()
  );

  // トランザクションの送信
  const result = await provider.sendAndConfirm(transaction);

  console.log("result", result);
}
