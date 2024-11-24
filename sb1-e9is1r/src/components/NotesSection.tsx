import React from 'react';

type NotesSectionProps = {
  notes: string;
  onNotesChange: (value: string) => void;
};

export default function NotesSection({ notes, onNotesChange }: NotesSectionProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">टिप्पणी (Notes)</h2>
      <div className="relative">
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Add your notes here..."
          className="w-full h-32 px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-200 resize-none"
        />
      </div>
    </div>
  );
}