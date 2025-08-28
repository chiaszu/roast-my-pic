import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ResultsDisplay from './components/ResultsDisplay';
import Header from './components/Header';

interface AnalysisResult {
  text: string;
  model: string;
  timestamp: number;
}

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = (analysisResult: AnalysisResult) => {
    setResult(analysisResult);
    setIsLoading(false);
  };

  const handleAnalysisStart = () => {
    setIsLoading(true);
    setResult(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <main className="mt-8 space-y-8">
          <ImageUpload 
            onAnalysisStart={handleAnalysisStart}
            onAnalysisComplete={handleAnalysisComplete}
            isLoading={isLoading}
          />
          
          <ResultsDisplay 
            result={result}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
