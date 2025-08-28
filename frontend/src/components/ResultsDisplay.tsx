import React from 'react';

interface AnalysisResult {
  text: string;
  model: string;
  timestamp: number;
}

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading }) => {
  if (!result && !isLoading) {
    return null;
  }

  return (
    <div className="glass p-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-xl font-light">Analysis Result</h3>
          {result && (
            <span className="text-white/60 text-sm">
              {result.model} • {new Date(result.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
        
        <div className="min-h-[120px] flex items-center">
          {isLoading ? (
            <div className="flex items-center justify-center w-full space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/20 border-t-white/60"></div>
              <span className="text-white/80 font-light">Analyzing image...</span>
            </div>
          ) : result ? (
            <div className="w-full">
              <div className="glass-dark p-6 rounded-lg">
                <p className="text-white/90 leading-relaxed font-light text-lg">
                  {result.text}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;