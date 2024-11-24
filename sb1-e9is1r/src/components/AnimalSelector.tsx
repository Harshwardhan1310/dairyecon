import React from 'react';

type AnimalSelectorProps = {
  animalType: 'cow' | 'buffalo';
  onSelect: (type: 'cow' | 'buffalo') => void;
};

export default function AnimalSelector({ animalType, onSelect }: AnimalSelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-purple-800 mb-4 sm:mb-8">Select Animal</h2>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto">
        <button
          onClick={() => onSelect('cow')}
          className={`w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 rounded-xl transition-all transform hover:scale-105 ${
            animalType === 'cow'
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
          }`}
        >
          <span className="text-lg sm:text-xl font-semibold">Cow</span>
        </button>
        <button
          onClick={() => onSelect('buffalo')}
          className={`w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 rounded-xl transition-all transform hover:scale-105 ${
            animalType === 'buffalo'
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg scale-105'
              : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
          }`}
        >
          <span className="text-lg sm:text-xl font-semibold">Buffalo</span>
        </button>
      </div>
    </div>
  );
}