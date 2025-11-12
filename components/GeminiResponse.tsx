
import React from 'react';

interface GeminiResponseProps {
  response: string;
  isLoading: boolean;
  error: string | null;
}

export const GeminiResponse: React.FC<GeminiResponseProps> = ({ response, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
          <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-2 text-stone-400">
                  <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Thinking...</span>
              </div>
          </div>
      );
    }

    if (error) {
      return <div className="p-4 bg-red-900/20 border border-red-500/30 text-red-300 rounded-lg">{error}</div>;
    }

    if (response) {
      return <div className="text-stone-200 whitespace-pre-wrap">{response}</div>;
    }

    return <div className="text-stone-500">The AI response will be displayed here.</div>;
  };

  return (
    <div className="min-h-[10rem] p-4 bg-stone-950 border border-stone-700 rounded-lg">
      {renderContent()}
    </div>
  );
};
