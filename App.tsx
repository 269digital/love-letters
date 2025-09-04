
import React, { useState } from 'react';
import LetterForm from './components/LetterForm';
import LetterDisplay from './components/LetterDisplay';
import { generateLoveLetter } from './services/geminiService';
import type { LetterData } from './types';

const App: React.FC = () => {
  const [formData, setFormData] = useState<LetterData>({
    recipientName: '',
    eyeColor: '',
    favoriteFood: '',
    favoritePlace: '',
    specialMemory: '',
    senderName: '',
  });
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showLetter, setShowLetter] = useState<boolean>(false);

  const handleGenerateLetter = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const letterText = await generateLoveLetter(formData);
      setGeneratedLetter(letterText);
      setShowLetter(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setShowLetter(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    setShowLetter(false);
    setGeneratedLetter('');
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4 font-sans selection:bg-rose-200">
      <div className="w-full max-w-[816px] mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-['Dancing_Script'] text-rose-800">Love Letter AI</h1>
          <p className="text-rose-600 mt-2 text-lg">Crafting romance, one word at a time.</p>
        </header>

        <main className="bg-white rounded-xl shadow-2xl shadow-rose-200/50 p-6 md:p-10 transition-all duration-500">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <strong className="font-bold">Oops! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {showLetter ? (
            <LetterDisplay
              letterContent={generatedLetter}
              senderName={formData.senderName}
              recipientName={formData.recipientName}
              onGoBack={handleGoBack}
            />
          ) : (
            <LetterForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleGenerateLetter}
              isLoading={isLoading}
            />
          )}
        </main>
         <footer className="text-center mt-8 text-rose-400 text-sm">
            <p>Powered with ❤️ by Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;