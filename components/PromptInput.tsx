
import React from 'react';
import type { PromptParts } from '../types';

interface PromptInputProps {
  id: keyof PromptParts;
  title: string;
  placeholder: string;
  value: string;
  onChange: (id: keyof PromptParts, value: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ id, title, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-md font-medium text-stone-300">
        {title}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full p-3 bg-stone-800 border border-stone-700 rounded-lg text-stone-200 placeholder-stone-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      />
    </div>
  );
};
