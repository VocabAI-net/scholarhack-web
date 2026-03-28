import React from 'react';

const AdBanner: React.FC = () => {
  return (
    <div className="w-full my-8 p-4 bg-gray-100 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center min-h-[150px]">
      <span className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Advertisement</span>
      <div className="text-gray-300 font-bold text-lg">Google AdSense Placeholder</div>
      <p className="text-[10px] text-gray-400 mt-2">Ad placement for high-converting revenue</p>
    </div>
  );
};

export default AdBanner;
