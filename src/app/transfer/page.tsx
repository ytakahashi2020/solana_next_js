"use client";
import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const TransferPage: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();

  const [destination, setDestination] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(true);

  useEffect(() => {
    // ページ表示時にポップアップを表示
    setShowPopup(true);
  }, []);

  const handleTransfer = async () => {
    if (!connected) {
      setStatus("ウォレットが接続されていません");
      return;
    }

    try {
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;
      if (isNaN(lamports) || lamports <= 0) {
        setStatus("有効な送付量を入力してください");
        return;
      }

      setIsLoading(true);
      const recipient = new PublicKey(destination);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey!,
          toPubkey: recipient,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      setStatus(`https://solscan.io/tx/${signature}?cluster=devnet`);
    } catch (error: any) {
      setStatus(`送付失敗: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">SOLを送付</h1>
        <label className="block mb-4">
          <span className="text-gray-700">宛先アドレス:</span>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">送付量 (SOL):</span>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button
          onClick={handleTransfer}
          disabled={isLoading}
          className="relative w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-10 w-10 text-white absolute inset-0 m-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "送付"
          )}
        </button>
      </div>
      {status && (
        <div className="mt-4 p-2 bg-gray-200 rounded-md shadow-inner max-w-md w-full overflow-auto">
          <p className="text-left">実行結果</p>
          <a
            href={status}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            {status}
          </a>
        </div>
      )}
    </div>
  );
};

export default TransferPage;
