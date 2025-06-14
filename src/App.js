import React, { useState, useEffect } from 'react';
import './App.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('reset'); // running, paused, reset

  useEffect(() => {
    let interval;
    if (isRunning) {
      setStatus('running');
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (status === 'running') {
      setStatus('paused');
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setStatus('reset');
  };

  return (
    <div className={`stopwatch-container ${status}`}>
      <h1 className="stopwatch-title">⏱️ Stopwatch</h1>
      <h2 className="stopwatch-time">{formatTime(time)}</h2>
      <div className="button-group">
        <button className="btn start" onClick={() => setIsRunning(true)}>Start</button>
        <button className="btn pause" onClick={() => setIsRunning(false)}>Pause</button>
        <button className="btn reset" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
