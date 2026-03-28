import React, { useMemo } from 'react';
import { MapPin, Calendar, ExternalLink, ClipboardCheck, Plus, Check, DollarSign, Languages } from 'lucide-react';
import { University } from '../types';

interface UniversityCardProps {
  university: University;
  isCompared: boolean;
  onToggleCompare: (id: number) => void;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university, isCompared, onToggleCompare }) => {
  const daysLeft = useMemo(() => {
    if (!university.deadline_date) return null;
    const deadline = new Date(university.deadline_date);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : null;
  }, [university.deadline_date]);

  const isUrgent = daysLeft !== null && daysLeft <= 60;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full group relative">
      {/* Top Section */}
      <div className="p-5 pb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center text-gray-500 text-xs font-medium uppercase tracking-wider">
            <MapPin className="w-3 h-3 mr-1" />
            {university.state}, USA
          </div>
          <div className="flex flex-col items-end space-y-1">
            {daysLeft !== null && (
              <span className={`px-2 py-1 ${daysLeft <= 30 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-orange-50 text-orange-600 border-orange-100'} text-[10px] font-bold rounded-full uppercase tracking-tight border animate-pulse`}>
                {daysLeft} Days Left
              </span>
            )}
            {university.deadline.toLowerCase().includes('rolling') && (
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-tight border border-blue-100">
                Rolling
              </span>
            )}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
          {university.university}
        </h3>
        <p className="text-sm text-gray-500 font-medium">
          {university.scholarship_name}
        </p>
      </div>

      {/* Body Section */}
      <div className="px-5 py-4 bg-gray-50/50 flex-grow">
        <div className="mb-4">
          <span className="text-xs text-gray-400 uppercase font-bold tracking-widest block mb-1">Scholarship Amount</span>
          <div className="text-2xl font-black text-green-600 tracking-tight">
            {university.amount}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-[11px] text-gray-600 font-bold uppercase tracking-tight">
            <ClipboardCheck className="w-3 h-3 mr-1.5 text-blue-500" />
            {university.test_policy}
          </div>
          <div className="flex items-center text-[11px] text-gray-600 font-bold uppercase tracking-tight">
            <DollarSign className="w-3 h-3 mr-1.5 text-green-500" />
            App Fee: {university.app_fee || 'Varies'}
          </div>
          <div className="flex items-center text-[11px] text-gray-600 font-bold uppercase tracking-tight col-span-2">
            <Languages className="w-3 h-3 mr-1.5 text-purple-500" />
            {university.english_proficiency || 'IELTS/Duolingo Req.'}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {university.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-white border border-gray-200 text-gray-500 text-[10px] font-bold rounded-md uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-5 pt-0 flex flex-col space-y-2">
        <button 
          onClick={() => onToggleCompare(university.id)}
          className={`w-full py-2 rounded-lg font-bold text-xs flex items-center justify-center transition-all border ${isCompared ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
        >
          {isCompared ? (
            <>
              <Check className="w-3 h-3 mr-2" /> Added to Compare
            </>
          ) : (
            <>
              <Plus className="w-3 h-3 mr-2" /> Add to Compare
            </>
          )}
        </button>
        <a 
          href={university.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-center flex items-center justify-center transition-colors group"
        >
          Apply Now
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default UniversityCard;
