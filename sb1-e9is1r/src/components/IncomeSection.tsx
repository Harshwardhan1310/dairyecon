import React from 'react';

type IncomeSectionProps = {
  milkIncome: number;
  dungIncome: number;
};

export default function IncomeSection({ milkIncome, dungIncome }: IncomeSectionProps) {
  const totalIncome = milkIncome + dungIncome;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-purple-800 mb-8">उत्पन्न (Income)</h2>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-purple-50 rounded-lg gap-2">
          <span className="text-base sm:text-sm text-purple-700">दुधातून उत्पन्न (Milk Income)</span>
          <span className="font-semibold text-xl sm:text-lg">₹{milkIncome}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-purple-50 rounded-lg gap-2">
          <span className="text-base sm:text-sm text-purple-700">शेण (Dung Income)</span>
          <span className="font-semibold text-xl sm:text-lg">₹{dungIncome}</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 mt-6 bg-purple-100 rounded-lg gap-2">
          <span className="text-purple-800 font-semibold">दिवसाचे उत्पन्न (Total Daily Income)</span>
          <span className="font-bold text-2xl sm:text-xl text-purple-800">₹{totalIncome}</span>
        </div>
      </div>
    </div>
  );
}