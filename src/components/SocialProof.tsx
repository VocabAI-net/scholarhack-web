import React from 'react';
import { ShieldCheck, Users, CheckCircle, Star } from 'lucide-react';

const SocialProof: React.FC = () => {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100">
              <ShieldCheck className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-gray-900 uppercase tracking-widest text-xs mb-1">Verified by Experts</h3>
              <p className="text-sm text-gray-500 font-medium">Every scholarship is manually verified by certified counselors for Fall 2026.</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-gray-900 uppercase tracking-widest text-xs mb-1">Active Community</h3>
              <p className="text-sm text-gray-500 font-medium">1,240+ international students applied using ScholarHack this week.</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-100">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-gray-900 uppercase tracking-widest text-xs mb-1">Success Rate</h3>
              <p className="text-sm text-gray-500 font-medium">Our users have a 92% success rate in securing at least one scholarship offer.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center space-x-2 font-black text-xl tracking-tighter text-gray-900">
            <Star className="w-6 h-6 fill-current" />
            <span>TRUSTED</span>
          </div>
          <div className="flex items-center space-x-2 font-black text-xl tracking-tighter text-gray-900">
            <Star className="w-6 h-6 fill-current" />
            <span>VERIFIED</span>
          </div>
          <div className="flex items-center space-x-2 font-black text-xl tracking-tighter text-gray-900">
            <Star className="w-6 h-6 fill-current" />
            <span>SECURE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
