"use client";

import React, { useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  callPDAProgram,
  callPDAFetchCounter,
  callPDAUpdateCounter,
} from "../../anchorClient";

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
  const [status2, setStatus2] = useState<string>("");
  const [status3, setStatus3] = useState<string>("");
  const [resultUrl, setResultUrl] = useState<string>("");
  const [resultUrl2, setResultUrl2] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(true);

  useEffect(() => {
    // ページ表示時にポップアップを表示
    setShowPopup(true);
  }, []);

  const handleHelloClick = async () => {
    if (!connected) {
      setStatus("ウォレットが接続されていません");
      return;
    }

    setStatus("プログラム実行中...");

    try {
      const result = await callPDAProgram(wallet, connection);
      setStatus("プログラムが正常に実行されました");
      setResultUrl(`https://solscan.io/tx/${result}?cluster=devnet`);
    } catch (err: any) {
      setStatus(`プログラムの実行に失敗しました: ${err.message}`);
    }
  };
  const handleHelloClick2 = async () => {
    if (!connected) {
      setStatus2("ウォレットが接続されていません");
      return;
    }

    setStatus2("プログラム実行中...");

    try {
      const result = await callPDAFetchCounter(wallet, connection);
      setStatus2("プログラムが正常に実行されました");
      setResult(`現在のカウント：${result.count.toNumber()}`);
    } catch (err: any) {
      setStatus2(`プログラムの実行に失敗しました: ${err.message}`);
    }
  };
  const handleHelloClick3 = async () => {
    if (!connected) {
      setStatus3("ウォレットが接続されていません");
      return;
    }

    setStatus3("プログラム実行中...");

    try {
      const result = await callPDAUpdateCounter(wallet, connection);
      setStatus3("プログラムが正常に実行されました");
      setResultUrl2(`https://solscan.io/tx/${result}?cluster=devnet`);
    } catch (err: any) {
      setStatus3(`プログラムの実行に失敗しました: ${err.message}`);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          PDAプログラム実行
        </h1>
        <button
          onClick={handleHelloClick}
          disabled={!connected}
          className="relative w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          アカウントを作成
        </button>
      </div>
      {status && (
        <div className="mt-4 p-2 bg-gray-200 rounded-md shadow-inner max-w-md w-full overflow-auto">
          <p className="text-center text-sm text-gray-600 break-all">
            {status}
          </p>
        </div>
      )}
      {resultUrl && (
        <div className="mt-4 p-2  max-w-md w-full overflow-auto">
          <p className="text-left text-sm text-gray-600 break-all">
            <p className="text-left">実行結果</p>
            <a
              href={resultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              {resultUrl}
            </a>
          </p>
        </div>
      )}

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          PDAアカウントの取得
        </h1>
        {/* <WalletMultiButton className="mb-4" /> */}
        <button
          onClick={handleHelloClick2}
          disabled={!connected}
          className="relative w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          PDAアカウントの取得
        </button>
      </div>
      {status2 && (
        <div className="mt-4 p-2 bg-gray-200 rounded-md shadow-inner max-w-md w-full overflow-auto">
          <p className="text-center text-sm text-gray-600 break-all">
            {status2}
          </p>
        </div>
      )}
      {result && (
        <div className="mt-4 p-2  max-w-md w-full overflow-auto">
          <p className="text-left text-sm text-gray-600 break-all">{result}</p>
        </div>
      )}

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          PDAアカウントの更新
        </h1>
        {/* <WalletMultiButton className="mb-4" /> */}
        <button
          onClick={handleHelloClick3}
          disabled={!connected}
          className="relative w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          PDAアカウントの更新
        </button>
      </div>
      {status3 && (
        <div className="mt-4 p-2 bg-gray-200 rounded-md shadow-inner max-w-md w-full overflow-auto">
          <p className="text-center text-sm text-gray-600 break-all">
            {status3}
          </p>
        </div>
      )}
      {resultUrl2 && (
        <div className="mt-4 p-2  max-w-md w-full overflow-auto">
          <p className="text-left text-sm text-gray-600 break-all">
            <p className="text-left">実行結果</p>
            <a
              href={resultUrl2}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              {resultUrl2}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default AnchorPage;
