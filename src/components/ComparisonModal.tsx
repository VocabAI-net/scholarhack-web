import React from 'react';
import { X, Check, ExternalLink } from 'lucide-react';
import { University } from '../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  universities: University[];
  onRemove: (id: number) => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose, universities, onRemove }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full h-full sm:h-auto sm:max-w-5xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-full sm:max-h-[90vh]">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">Compare</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Side-by-side analysis</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="overflow-x-auto p-4 sm:p-6 flex-grow">
          {universities.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 font-medium italic">No universities added to comparison yet.</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-gray-50 rounded-tl-xl border-b-2 border-gray-100 min-w-[200px]">Features</th>
                  {universities.map(uni => (
                    <th key={uni.id} className="p-4 text-left bg-gray-50 border-b-2 border-gray-100 min-w-[250px] relative group">
                      <button 
                        onClick={() => onRemove(uni.id)}
                        className="absolute top-2 right-2 p-1 bg-red-50 text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="font-black text-gray-900 leading-tight">{uni.university}</div>
                      <div className="text-xs text-gray-500 font-bold uppercase mt-1">{uni.state}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Scholarship</td>
                  {universities.map(uni => (
                    <td key={uni.id} className="p-4 font-black text-green-600 text-lg">{uni.amount}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Test Policy</td>
                  {universities.map(uni => (
                    <td key={uni.id} className="p-4 text-gray-700 font-medium">{uni.test_policy}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">English Req.</td>
                  {universities.map(uni => (
                    <td key={uni.id} className="p-4 text-gray-700 font-medium">{uni.english_proficiency || 'Contact School'}</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">App Fee</td>
                  {universities.map(uni => (
                    <td key={uni.id} className="p-4 text-gray-700 font-medium">
                      {uni.app_fee === '$0' ? (
                        <span className="text-blue-600 font-bold flex items-center">
                          <Check className="w-4 h-4 mr-1" /> FREE
                        </span>
                      ) : (
                        uni.app_fee || 'Varies'
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-gray-400 uppercase tracking-widest text-[10px]">Deadline</td>
                  {universities.map(uni => (
                    <td key={uni.id} className="p-4 text-gray-700 font-medium">{uni.deadline}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4"></td>
                  {universities.map(uni => (
                    <td key={uni.id} className="p-4">
                      <a 
                        href={uni.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-bold text-xs hover:bg-black transition-colors"
                      >
                        Apply <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
