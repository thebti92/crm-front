import React from 'react';

export default function StatisticCard({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
      <div className="text-3xl text-blue-500 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
