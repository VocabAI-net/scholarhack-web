import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Send } from 'lucide-react';

const NotificationToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Show after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Show again after 2 minutes if not subscribed
    if (!isSubscribed) {
      setTimeout(() => {
        setIsVisible(true);
      }, 120000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const { subscribeToNewsletter } = await import('../firebase');
        await subscribeToNewsletter(email, 'popup');
        setIsSubscribed(true);
        setTimeout(() => setIsVisible(false), 3000);
      } catch (error) {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed bottom-6 right-6 z-[100] w-full max-w-[380px] px-4 sm:px-0"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden relative">
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6">
              {!isSubscribed ? (
                <>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black tracking-tight text-gray-900 uppercase">
                        Don't Miss Out on Fall 2026
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    Join <span className="font-bold text-gray-900">5,000+</span> international students receiving weekly scholarship alerts and application hacks.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center"
                    >
                      Join Free
                      <Send className="w-4 h-4 ml-2" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">You're on the list!</h3>
                  <p className="text-sm text-gray-500">Check your inbox for the first hack.</p>
                </div>
              )}
            </div>
            
            <div className="h-1 bg-blue-600 w-full animate-pulse"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
