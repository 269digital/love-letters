import React, { useRef } from 'react';
import html2canvas from 'https://esm.sh/html2canvas';
import jsPDF from 'https://esm.sh/jspdf';

interface LetterDisplayProps {
  letterContent: string;
  senderName: string;
  recipientName: string;
  onGoBack: () => void;
}

const LetterDisplay: React.FC<LetterDisplayProps> = ({ letterContent, senderName, recipientName, onGoBack }) => {
  const letterRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const element = letterRef.current;
    if (!element) return;

    // Wait for fonts and images to be fully loaded
    await document.fonts.ready;

    // Capture the letter element using its full scrollable height
    const canvas = await html2canvas(element, {
      scale: 3, // Increase scale for a high-resolution capture
      useCORS: true,
      letterRendering: true,
      height: element.scrollHeight,
      windowHeight: element.scrollHeight,
      backgroundColor: '#fef3c7', // Tailwind's bg-amber-100
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Initialize a new PDF in US Letter format (8.5 x 11 inches)
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'in',
      format: 'letter'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Set 1-inch margins
    const margin = 1;
    const contentWidth = pdfWidth - margin * 2;
    const contentHeight = pdfHeight - margin * 2;

    // Calculate the height of the image in the PDF to maintain its aspect ratio
    const pdfImgHeight = (imgHeight * contentWidth) / imgWidth;
    let heightRemaining = pdfImgHeight;

    // This is the y-coordinate of the top of the image on the PDF page.
    // It will be decreased for each subsequent page to "pan" down the image.
    let position = margin;

    // Add the first page.
    pdf.addImage(imgData, 'PNG', margin, position, contentWidth, pdfImgHeight);
    heightRemaining -= contentHeight;

    // Add subsequent pages if the content is taller than one page.
    while (heightRemaining > 0) {
      position -= contentHeight; // Move the image "up" for the next page.
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, contentWidth, pdfImgHeight);
      heightRemaining -= contentHeight;
    }
    
    // Trigger the download
    pdf.save(`love-letter-to-${recipientName}.pdf`);
  };

  return (
    <div className="animate-fade-in">
      <div 
        ref={letterRef}
        id="letter-content"
        className="bg-amber-100 p-8 md:p-12 rounded-lg max-h-[70vh] overflow-y-auto"
        style={{
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
        }}
      >
        <p className="font-['Dancing_Script'] text-3xl md:text-4xl text-gray-800 leading-relaxed whitespace-pre-wrap">
          {letterContent}
        </p>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleDownload}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          aria-label={`Download love letter to ${recipientName} as PDF`}
        >
          Download PDF
        </button>
        <button
          onClick={onGoBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-lg py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Write Another
        </button>
      </div>
    </div>
  );
};

export default LetterDisplay;