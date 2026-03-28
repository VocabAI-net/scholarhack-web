import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-black tracking-tighter text-gray-900">
              Scholar<span className="text-blue-600">Hack</span>
            </span>
            <p className="mt-4 text-gray-500 text-sm max-w-xs leading-relaxed">
              The #1 directory for international students looking to hack their way into US tech education with 100% funding.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">TikTok</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Discord</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-50 text-center text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} ScholarHack. All rights reserved. Built for the next generation of tech leaders.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
