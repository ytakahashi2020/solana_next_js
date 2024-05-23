"use client";

import React, { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { callHelloProgram } from "../../anchorClient";
import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";

const AnchorPage: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [status, setStatus] = useState<string>("");

  const handleHelloClick = async () => {
    if (!connected) {
      setStatus("ウォレットが接続されていません");
      return;
    }

    setStatus("プログラム実行中...");

    try {
      await callHelloProgram(wallet, connection);
      setStatus("プログラムが正常に実行されました");
    } catch (err: any) {
      setStatus(`プログラムの実行に失敗しました: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Anchorプログラム実行
        </h1>
        <WalletMultiButton className="mb-4" />
        <button
          onClick={handleHelloClick}
          disabled={!connected}
          className="relative w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Helloプログラムを実行
        </button>
      </div>
      {status && (
        <div className="mt-4 p-2 bg-gray-200 rounded-md shadow-inner max-w-md w-full overflow-auto">
          <p className="text-center text-sm text-gray-600 break-all">
            {status}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnchorPage;
