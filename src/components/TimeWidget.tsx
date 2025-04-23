import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const TimeWidget: React.FC = () => {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col justify-between p-4">
      <Clock className="w-6 h-6 mb-4 text-gray-400" />
      <h3 className="text-lg font-semibold mb-2 text-gray-200">Current Time</h3>
      <p className="text-sm text-gray-300">{time.toLocaleTimeString()}</p>
      <p className="mt-auto text-gray-400 text-xs">Your local time</p>
    </div>
  );
};

export default TimeWidget;
