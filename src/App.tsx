import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Sparkles, TrendingUp, DollarSign, Languages } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UniversityCard from './components/UniversityCard';
import AdBanner from './components/AdBanner';
import ComparisonModal from './components/ComparisonModal';
import SocialProof from './components/SocialProof';
import NotificationToast from './components/NotificationToast';
import universitiesData from './data/universities.json';
import { University } from './types';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showNoAppFee, setShowNoAppFee] = useState(false);
  const [showDuolingo, setShowDuolingo] = useState(false);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [footerEmail, setFooterEmail] = useState('');
  const [isFooterSubscribed, setIsFooterSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { db } = await import('./firebase');
        const { doc, getDocFromServer } = await import('firebase/firestore');
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Firebase connection test failed: The client is offline. Check your Firebase configuration.");
        }
      }
    };
    testConnection();
  }, []);

  const universities = universitiesData as University[];

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    universities.forEach(u => u.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [universities]);

  const filteredUniversities = useMemo(() => {
    return universities.filter(u => {
      const matchesSearch = u.university.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            u.scholarship_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            u.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || u.tags.includes(selectedTag);
      const matchesNoAppFee = !showNoAppFee || u.app_fee === '$0';
      const matchesDuolingo = !showDuolingo || (u.english_proficiency?.toLowerCase().includes('duolingo') ?? false);
      
      return matchesSearch && matchesTag && matchesNoAppFee && matchesDuolingo;
    });
  }, [searchTerm, selectedTag, showNoAppFee, showDuolingo, universities]);

  const toggleCompare = (id: number) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(item => item !== id);
      if (prev.length >= 4) {
        alert("You can only compare up to 4 universities at a time.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const comparedUniversities = universities.filter(u => compareList.includes(u.id));

  const handleFooterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const { subscribeToNewsletter } = await import('./firebase');
      await subscribeToNewsletter(footerEmail, 'footer');
      setIsFooterSubscribed(true);
      setFooterEmail('');
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar 
        compareCount={compareList.length} 
        onOpenCompare={() => setIsCompareOpen(true)} 
      />

      <main>
        {/* Hero Section */}
        <section className="relative pt-16 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
              <Sparkles className="w-3 h-3 mr-2" />
              Updated for Fall 2026 Admissions
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Find <span className="text-blue-600">100% Scholarships</span> <br className="hidden md:block" /> for International Students
            </h1>
            <p className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 font-medium px-4">
              Engineering & Tech programs with open deadlines. Stop paying full tuition and start your US tech career today.
            </p>

            {/* Search & Filter Bar */}
            <div className="max-w-3xl mx-auto px-2 sm:px-0">
              <div className="bg-white p-2 rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search university, state..."
                    className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium placeholder:text-gray-400 text-sm md:text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button className="flex-1 md:flex-none px-4 md:px-6 py-3 md:py-4 bg-white border border-gray-200 rounded-xl font-bold flex items-center justify-center hover:bg-gray-50 transition-colors text-sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex-1 md:flex-none px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95 text-sm">
                    Search
                  </button>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
                <button 
                  onClick={() => setShowNoAppFee(!showNoAppFee)}
                  className={`px-3 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center border ${showNoAppFee ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                >
                  <DollarSign className="w-3 h-3 mr-1" />
                  No Fee
                </button>
                <button 
                  onClick={() => setShowDuolingo(!showDuolingo)}
                  className={`px-3 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center border ${showDuolingo ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                >
                  <Languages className="w-3 h-3 mr-1" />
                  Duolingo
                </button>
                <div className="w-full md:w-auto h-px md:h-6 bg-gray-200 mx-2 hidden md:block"></div>
                <button 
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${!selectedTag ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'}`}
                >
                  All
                </button>
                {allTags.slice(0, 3).map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${selectedTag === tag ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ad Placement 1 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner />
        </div>

        {/* Main Content Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tight flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
              Featured Opportunities
              <span className="ml-3 text-sm font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                {filteredUniversities.length} Results
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredUniversities.map((uni, index) => (
              <React.Fragment key={uni.id}>
                <UniversityCard 
                  university={uni} 
                  isCompared={compareList.includes(uni.id)}
                  onToggleCompare={toggleCompare}
                />
                {/* Ad Placement after every 6th card */}
                {(index + 1) % 6 === 0 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <AdBanner />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-300 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No scholarships found</h3>
              <p className="text-gray-500">Try adjusting your search or filters to find more opportunities.</p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedTag(null); setShowNoAppFee(false); setShowDuolingo(false);}}
                className="mt-6 text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>

        {/* Social Proof Section */}
        <SocialProof />

        {/* Final CTA / Ad Placement */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
          <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] pointer-events-none"></div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 relative z-10">Don't Miss Out on Fall 2026</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto font-medium relative z-10">
              Join 5,000+ international students receiving weekly scholarship alerts and application hacks.
            </p>
            {isFooterSubscribed ? (
              <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md mx-auto animate-in fade-in zoom-in">
                <Sparkles className="w-10 h-10 mx-auto mb-4 text-blue-200" />
                <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
                <p className="text-blue-100 text-sm">Check your inbox for the first scholarship hack.</p>
              </div>
            ) : (
              <form onSubmit={handleFooterSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  required
                  className="px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-80"
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? 'Joining...' : 'Join Free'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <ComparisonModal 
        isOpen={isCompareOpen} 
        onClose={() => setIsCompareOpen(false)}
        universities={comparedUniversities}
        onRemove={(id) => setCompareList(prev => prev.filter(item => item !== id))}
      />

      <NotificationToast />
    </div>
  );
}
