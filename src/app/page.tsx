"use client";

import { useState } from "react";
import InputField from "./components/InputField";
import Button from "./components/Button";
import Loader from "./components/Loader";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [messageRate, setMessageRate] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessageRate(null);

    try {
      const response = await fetch("http://localhost:5000/api/sms/get-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, from: fromDate, to: toDate }),
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setMessageRate(data.count);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">📡 SMS Process Checker</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <InputField label="From Date (YYYY-MM-DD HH:MM:SS)" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <InputField label="To Date (YYYY-MM-DD HH:MM:SS)" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <Button text="Check SMS Process Rate" />
        </form>

        {loading && <Loader />}

        {messageRate !== null && (
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold">Message Process Rate:</h2>
            <p className="text-blue-600">📊 {messageRate} messages processed per second</p>
          </div>
        )}

        {message && (
          <div className="mt-4 text-center text-green-600">
            <h2 className="text-lg font-semibold">Message:</h2>
            <p>{message}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-center text-red-600">
            <h2 className="text-lg font-semibold">Error:</h2>
            <p>⚠️ {error}</p>
          </div>
        )}
      </div>
    </main>
  );
}
