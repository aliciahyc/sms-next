"use client";

import { useState } from "react";
import InputField from "./components/InputField";
import Button from "./components/Button";
import Loader from "./components/Loader";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate1, setFromDate1] = useState("");
  const [toDate1, setToDate1] = useState("");
  const [messageRate, setMessageRate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessageRate(null);

    try {
      const response = await fetch("http://localhost:5000/api/sms/phone-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, fromDate: fromDate, toDate: toDate }),
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setMessageRate(data.count);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
          } else {
            console.error("An unknown error occurred", err);
          }    
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessageRate(null);

    try {
      const response = await fetch("http://localhost:5000/api/sms/account-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromDate: fromDate1, toDate: toDate1 }),
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setMessageRate(data.count);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
          } else {
            console.error("An unknown error occurred", err);
          }    
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
          <div style={{ display: 'flex', gap: '23px' }}>
            <Button text="Check By Phone" />
        </div>
        </form>
        <form onSubmit={handleSubmit1} className="space-y-4">
          <InputField label="From Date (YYYY-MM-DD HH:MM:SS)" value={fromDate1} onChange={(e) => setFromDate1(e.target.value)} />
          <InputField label="To Date (YYYY-MM-DD HH:MM:SS)" value={toDate1} onChange={(e) => setToDate1(e.target.value)} />
          <div style={{ display: 'flex', gap: '23px' }}>
            <Button text="Check By Account" />
          </div>
        </form>

        {loading && <Loader />}

        {messageRate !== null && (
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold">Message Process Rate:</h2>
            <p className="text-blue-600">📊 {messageRate} messages processed per second</p>
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
