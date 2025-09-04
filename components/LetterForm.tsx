
import React from 'react';
import type { LetterData } from '../types';

interface LetterFormProps {
  formData: LetterData;
  setFormData: React.Dispatch<React.SetStateAction<LetterData>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputField: React.FC<{
  id: keyof LetterData;
  label: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
}> = ({ id, label, value, placeholder, onChange, isTextArea = false }) => (
  <div>
    <label htmlFor={id} className="block text-lg text-rose-700 mb-2">{label}</label>
    {isTextArea ? (
      <textarea
        id={id}
        name={id}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-rose-50/50 border border-rose-200 rounded-lg p-3 text-gray-700 font-sans focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-shadow"
        required
      />
    ) : (
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-rose-50/50 border border-rose-200 rounded-lg p-3 text-gray-700 font-sans focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-shadow"
        required
      />
    )}
  </div>
);

const LetterForm: React.FC<LetterFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField id="recipientName" label="Their Name" value={formData.recipientName} onChange={handleChange} placeholder="e.g., Jane Doe" />
        <InputField id="eyeColor" label="Their Eye Color" value={formData.eyeColor} onChange={handleChange} placeholder="e.g., sparkling blue" />
        <InputField id="favoriteFood" label="Their Favorite Food" value={formData.favoriteFood} onChange={handleChange} placeholder="e.g., spicy ramen" />
        <InputField id="favoritePlace" label="A Place They Love" value={formData.favoritePlace} onChange={handleChange} placeholder="e.g., the little cafe by the park" />
      </div>
      <InputField
        id="specialMemory"
        label="A Special Memory You Share"
        value={formData.specialMemory}
        onChange={handleChange}
        placeholder="Describe a cherished moment..."
        isTextArea
      />
      <InputField id="senderName" label="Your Name" value={formData.senderName} onChange={handleChange} placeholder="e.g., John Doe" />
      
      <div className="pt-4 text-center">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-bold text-xl py-3 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Writing...
            </>
          ) : (
            'Generate Letter'
          )}
        </button>
      </div>
    </form>
  );
};

export default LetterForm;
