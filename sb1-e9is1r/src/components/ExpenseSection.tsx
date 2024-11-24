import React from 'react';

type ExpenseItem = {
  amount: number;
  quantity: number;
  onChange: (value: number, field: 'amount' | 'quantity') => void;
  showQuantity?: boolean;
};

type ExpenseSectionProps = {
  expenses: Record<string, ExpenseItem>;
  animalType: 'cow' | 'buffalo';
  feedInfo: string;
};

export default function ExpenseSection({ expenses, animalType, feedInfo }: ExpenseSectionProps) {
  const ExpenseInput = ({ label, expense, info }: { label: string; expense: ExpenseItem; info?: string }) => (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-start sm:items-center py-6 border-b border-purple-100 last:border-0 hover:bg-purple-50/50 transition-colors rounded-lg px-4">
      <label className="sm:col-span-4 text-base sm:text-sm font-medium text-purple-700">
        {label}
        {info && (
          <span className="block text-xs text-purple-500 mt-1">{info}</span>
        )}
      </label>
      <div className="sm:col-span-4">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-purple-600 text-lg sm:text-base">₹</span>
          </div>
          <input
            type="number"
            value={expense.amount || ''}
            onChange={(e) => expense.onChange(Number(e.target.value), 'amount')}
            className="w-full pl-10"
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>
      </div>
      {expense.showQuantity ? (
        <div className="sm:col-span-2 mt-3 sm:mt-0">
          <div className="relative">
            <input
              type="number"
              value={expense.quantity || ''}
              onChange={(e) => expense.onChange(Number(e.target.value), 'quantity')}
              className="w-full"
              placeholder="0"
              min="0"
              step="0.1"
              readOnly={label.includes('पशुखाद्य')}
            />
            <div className="block sm:hidden absolute top-1/2 -translate-y-1/2 left-0 text-sm text-purple-600 font-medium pl-2">
              Quantity:
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden sm:block sm:col-span-2"></div>
      )}
      <div className="sm:col-span-2 text-right font-semibold text-purple-800 text-lg sm:text-base mt-3 sm:mt-0">
        ₹{(expense.amount * expense.quantity).toFixed(2)}
      </div>
    </div>
  );

  const totalExpenses = Object.values(expenses).reduce(
    (sum, expense) => sum + (expense.amount * expense.quantity),
    0
  );

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <h2 className="text-2xl font-semibold text-purple-800">खर्च (Expenses)</h2>
        <div className="text-sm text-purple-600">
          दैनिक खर्च (Daily Expenses)
        </div>
      </div>

      <div className="hidden sm:grid grid-cols-12 gap-4 mb-4 px-4 text-sm font-semibold text-purple-600">
        <div className="col-span-4">Item</div>
        <div className="col-span-4">Rate (₹)</div>
        <div className="col-span-2">Quantity</div>
        <div className="col-span-2 text-right">Total</div>
      </div>

      <div className="space-y-2">
        <ExpenseInput label="मजुरी (Labor)" expense={expenses.labor} />
        <ExpenseInput 
          label="पशुखाद्य (Feed)" 
          expense={expenses.feed} 
          info={feedInfo}
        />
        <ExpenseInput label="हिरवा चारा (Green Fodder)" expense={expenses.greenFodder} />
        <ExpenseInput label="सुका चारा (Dry Fodder)" expense={expenses.dryFodder} />
        <ExpenseInput label="मीठ, सोडा, मिनरल मिक्सचर (Minerals)" expense={expenses.minerals} />
        <ExpenseInput label="लाईट बिल (Electricity)" expense={expenses.electricity} />
        <ExpenseInput label="उपचार (Medical)" expense={expenses.medical} />
        <ExpenseInput label="पाणी भाडे (Water Rent)" expense={expenses.waterRent} />
        <ExpenseInput label="शेड भाडे (Shed Rent)" expense={expenses.shedRent} />
        <ExpenseInput label="विमा (Insurance)" expense={expenses.insurance} />
        <ExpenseInput label="बँकेचा हप्ता (Bank EMI)" expense={expenses.bankEmi} />
      </div>
      
      <div className="mt-8 pt-6 border-t-2 border-purple-100">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-lg font-semibold text-purple-800">एकूण खर्च (Total Expenses)</span>
          <span className="text-2xl sm:text-3xl font-bold text-purple-800">₹{totalExpenses.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}