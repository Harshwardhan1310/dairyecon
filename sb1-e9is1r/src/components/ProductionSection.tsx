import React from 'react';

type ProductionSectionProps = {
  milkProduction: number;
  fatSNF: number;
  onMilkProductionChange: (value: number) => void;
  onFatSNFChange: (value: number) => void;
};

export default function ProductionSection({
  milkProduction,
  fatSNF,
  onMilkProductionChange,
  onFatSNFChange,
}: ProductionSectionProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-purple-800 mb-8">दूध उत्पादन (Milk Production)</h2>
      <div className="space-y-8">
        <div>
          <label className="block text-base sm:text-sm font-medium text-purple-700 mb-3">
            एका दिवसाचे दूध (Daily Milk in Liters)
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              value={milkProduction || ''}
              onChange={(e) => onMilkProductionChange(Number(e.target.value))}
              className="w-full pr-12"
              min="0"
              step="0.1"
              placeholder="0"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-purple-600 text-lg sm:text-base">L</span>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-base sm:text-sm font-medium text-purple-700 mb-3">
            3.5 Fat, 8.5 SNF (Rate)
          </label>
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-purple-600 text-lg sm:text-base">₹</span>
            </div>
            <input
              type="number"
              value={fatSNF || ''}
              onChange={(e) => onFatSNFChange(Number(e.target.value))}
              className="w-full pl-10"
              min="0"
              step="0.01"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}