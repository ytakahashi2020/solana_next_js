"use client";
import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const Home: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // エアドロップを受け取る関数
  const getAirdropOnClick = async () => {
    try {
      setIsLoading(true);
      if (!publicKey) {
        throw new Error("ウォレットが接続されていません");
      }
      const [latestBlockhash, signature] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL),
      ]);
      const sigResult = await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "confirmed"
      );
      if (sigResult) {
        alert("エアドロップが確認されました！");
      }
    } catch (err) {
      alert("エアドロップのレート制限に達しました");
    } finally {
      setIsLoading(false);
    }
  };

  // 残高を10秒ごとに取得する
  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
        setTimeout(getBalanceEvery10Seconds, 100000);
      })();
    }
  }, [publicKey, connection, balance]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24 bg-gray-100">
      {publicKey ? (
        <div className="flex flex-col gap-4 items-center bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold">あなたの公開鍵</h1>
          <div className="bg-gray-100 p-4 rounded-md shadow-inner max-w-full overflow-auto">
            <p className="text-sm font-mono break-all">
              {publicKey.toString()}
            </p>
          </div>
          <h2 className="text-xl font-medium">残高 {balance} SOL</h2>
          <button
            onClick={getAirdropOnClick}
            type="button"
            disabled={isLoading}
            className="relative text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-10 w-10 text-gray-900 dark:text-white absolute inset-0 m-auto"
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
                処理中...
              </>
            ) : (
              "エアドロップを受け取る"
            )}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-4">
            ようこそ！
          </h1>
          <p className="text-lg text-center mb-4">
            まずは右上からウォレットを接続してください。
          </p>
          <p className="text-center mb-4">
            接続後、こちらで公開鍵と残高を確認できます。
          </p>
        </div>
      )}
    </main>
  );
};

export default Home;
