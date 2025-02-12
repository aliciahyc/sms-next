'use client'; // This is the client-side directive

import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [messageRate, setMessageRate] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const requestData = {
      phonenumber: phoneNumber,
      from: fromDate,
      to: toDate,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/sms/get-rate', requestData);
      
      if (response.data && response.data.count) {
        setMessageRate(response.data.count);
        setError(null);
      } else {
        setMessage(response.data.message);
        setError(null);
      }
    } catch (err) {
      setError('Error fetching data from the API');
      setMessageRate(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>SMS Rate Checker</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            style={{ padding: '8px', margin: '10px 0', width: '300px' }}
          />
        </div>

        <div>
          <label htmlFor="fromDate">From Date (YYYY-MM-DD HH:MM:SS):</label>
          <input
            type="text"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder="Enter from date"
            style={{ padding: '8px', margin: '10px 0', width: '300px' }}
          />
        </div>

        <div>
          <label htmlFor="toDate">To Date (YYYY-MM-DD HH:MM:SS):</label>
          <input
            type="text"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            placeholder="Enter to date"
            style={{ padding: '8px', margin: '10px 0', width: '300px' }}
          />
        </div>

        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Check Rate
        </button>
      </form>

      {messageRate !== null && (
        <div>
          <h2>Message Rate:</h2>
          <p>Messages processed {messageRate} per second</p>
        </div>
      )}
      {message !== null && (
        <div>
          <h2>Message:</h2>
          <p> {message} </p>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
