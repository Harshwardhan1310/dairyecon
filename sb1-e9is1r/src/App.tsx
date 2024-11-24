import React, { useState, useEffect } from 'react';
import AnimalSelector from './components/AnimalSelector';
import ProductionSection from './components/ProductionSection';
import IncomeSection from './components/IncomeSection';
import ExpenseSection from './components/ExpenseSection';
import NotesSection from './components/NotesSection';

type AnimalType = 'cow' | 'buffalo';

type ExpenseItem = {
  amount: number;
  quantity: number;
  onChange: (value: number, field: 'amount' | 'quantity') => void;
  showQuantity?: boolean;
};

const defaultExpenses = {
  labor: { amount: 33, quantity: 1, showQuantity: false },
  feed: { amount: 0, quantity: 0, showQuantity: true },
  greenFodder: { amount: 0, quantity: 24, showQuantity: true },
  dryFodder: { amount: 0, quantity: 6, showQuantity: true },
  minerals: { amount: 10, quantity: 1, showQuantity: false },
  electricity: { amount: 2, quantity: 1, showQuantity: false },
  medical: { amount: 5, quantity: 1, showQuantity: false },
  waterRent: { amount: 1, quantity: 1, showQuantity: false },
  shedRent: { amount: 7, quantity: 1, showQuantity: false },
  insurance: { amount: 7, quantity: 1, showQuantity: false },
  bankEmi: { amount: 18, quantity: 1, showQuantity: false },
};

const buffaloExpenses = {
  ...defaultExpenses,
  labor: { ...defaultExpenses.labor, amount: 40 },
  bankEmi: { ...defaultExpenses.bankEmi, amount: 36 },
};

function App() {
  const [animalType, setAnimalType] = useState<AnimalType>('cow');
  const [showDetails, setShowDetails] = useState(false);
  const [milkProduction, setMilkProduction] = useState<number>(0);
  const [fatSNF, setFatSNF] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  
  const [expenses, setExpenses] = useState<Record<string, ExpenseItem>>(() => {
    return Object.entries(defaultExpenses).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: {
        ...value,
        onChange: (val: number, field: 'amount' | 'quantity') =>
          updateExpense(key, val, field),
      },
    }), {});
  });

  useEffect(() => {
    const baseExpenses = animalType === 'cow' ? defaultExpenses : buffaloExpenses;
    setExpenses(
      Object.entries(baseExpenses).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: {
          ...value,
          onChange: (val: number, field: 'amount' | 'quantity') =>
            updateExpense(key, val, field),
        },
      }), {})
    );
  }, [animalType]);

  useEffect(() => {
    const feedPerLiter = animalType === 'cow' ? 0.4 : 0.6;
    const feedQuantity = milkProduction * feedPerLiter;
    updateExpense('feed', feedQuantity, 'quantity');
  }, [milkProduction, animalType]);

  const updateExpense = (key: string, value: number, field: 'amount' | 'quantity') => {
    setExpenses(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  };

  const handleAnimalSelect = (type: AnimalType) => {
    setAnimalType(type);
    setShowDetails(true);
  };

  const calculateMilkIncome = () => milkProduction * fatSNF;
  const calculateDungIncome = () => 16;
  const calculateTotalExpenses = () => 
    Object.values(expenses).reduce((sum, exp) => sum + (exp.amount * exp.quantity), 0);
  
  const calculatePerLiterCost = () => 
    milkProduction > 0 ? calculateTotalExpenses() / milkProduction : 0;
  
  const calculatePerLiterProfit = () => {
    if (milkProduction > 0) {
      const totalIncome = calculateMilkIncome() + calculateDungIncome();
      return (totalIncome - calculateTotalExpenses()) / milkProduction;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-purple-800 mb-2">
            Dairy Economic Calculator
          </h1>
        </div>

        <AnimalSelector animalType={animalType} onSelect={handleAnimalSelect} />

        {showDetails && (
          <div className="space-y-6 sm:space-y-8 mt-6 sm:mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <ProductionSection
                milkProduction={milkProduction}
                fatSNF={fatSNF}
                onMilkProductionChange={setMilkProduction}
                onFatSNFChange={setFatSNF}
              />
              <IncomeSection
                milkIncome={calculateMilkIncome()}
                dungIncome={calculateDungIncome()}
              />
            </div>

            <ExpenseSection 
              expenses={expenses} 
              animalType={animalType}
              feedInfo={`${animalType === 'cow' ? '400' : '600'}gm/ltr`}
            />

            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4 sm:p-8 rounded-xl shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Financial Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="bg-white/10 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-sm font-medium mb-2">Total Income</h3>
                  <p className="text-2xl sm:text-3xl font-bold">
                    ₹{(calculateMilkIncome() + calculateDungIncome()).toFixed(2)}
                  </p>
                </div>
                <div className="bg-white/10 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-sm font-medium mb-2">Total Expenses</h3>
                  <p className="text-2xl sm:text-3xl font-bold">
                    ₹{calculateTotalExpenses().toFixed(2)}
                  </p>
                </div>
                <div className="bg-white/10 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-sm font-medium mb-2">Net Profit</h3>
                  <p className="text-2xl sm:text-3xl font-bold">
                    ₹{(calculateMilkIncome() + calculateDungIncome() - calculateTotalExpenses()).toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/10 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-sm font-medium mb-2">Cost per Liter</h3>
                  <p className="text-2xl sm:text-3xl font-bold">
                    ₹{calculatePerLiterCost().toFixed(2)}
                  </p>
                </div>
                <div className="bg-white/10 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-sm font-medium mb-2">Profit per Liter</h3>
                  <p className="text-2xl sm:text-3xl font-bold">
                    ₹{calculatePerLiterProfit().toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <NotesSection notes={notes} onNotesChange={setNotes} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;