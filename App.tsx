
import React, { useState, useEffect, useMemo } from 'react';
import { SERVICES } from './constants';
import { Language, AppState, Service, NotificationPrefs } from './types';

const UI_LABELS = {
  home: { mr: 'होम', hi: 'होम', en: 'Home' },
  updates: { mr: 'अपडेट्स', hi: 'अपडेट्स', en: 'Updates' },
  contact: { mr: 'संपर्क', hi: 'संपर्क', en: 'Contact' },
  allServices: { mr: 'उपलब्ध सेवा', hi: 'उपलब्ध सेवाएं', en: 'Available Services' },
  newUpdates: { mr: 'नवीन अपडेट्स', hi: 'नई अपडेट्स', en: 'New Updates' },
  liveUpdates: { mr: 'लाईव्ह अपडेट्स', hi: 'लाइव अपडेट्स', en: 'Live Updates' },
  callNow: { mr: 'आत्ताच कॉल करा', hi: 'अभी कॉल करें', en: 'Call Now' },
  viewServices: { mr: 'सर्व सेवा पहा', hi: 'सभी सेवाएं देखें', en: 'View All Services' },
  heroTitle: { mr: 'सर्व शासकीय सेवा एकाच ठिकाणी!', hi: 'सभी सरकारी सेवाएं एक ही स्थान पर!', en: 'All Govt Services in One Place!' },
  heroSub: { mr: 'शेतकरी योजना, महा-ई-सेवा, स्कॉलरशिप आणि बरंच काही...', hi: 'किसान योजना, महा-ई-सेवा, छात्रवृत्ति और बहुत कुछ...', en: 'Farmer Schemes, CSC, Scholarship and more...' },
  whatsappMsg: { mr: 'मेसेज करा (WhatsApp)', hi: 'संदेश भेजें (WhatsApp)', en: 'Message (WhatsApp)' },
  docsRequired: { mr: 'आवश्यक कागदपत्रे:', hi: 'आवश्यक दस्तावेज:', en: 'Required Documents:' },
  eligibility: { mr: 'पात्रता (Patrata):', hi: 'पात्रता:', en: 'Eligibility:' },
  ageLimit: { mr: 'वयोमर्यादा (Vay):', hi: 'आयु सीमा:', en: 'Age Limit:' },
  startDate: { mr: 'सुरुवात तारीख:', hi: 'प्रारंभ तिथि:', en: 'Start Date:' },
  endDate: { mr: 'अंतिम तारीख:', hi: 'अंतिम तिथि:', en: 'End Date:' },
  fillingFee: { mr: 'फॉर्म फी (आमची):', hi: 'भरने का शुल्क:', en: 'Form Filling Fee:' },
  govtFee: { mr: 'शासकीय फी:', hi: 'सरकारी शुल्क:', en: 'Govt Fee:' },
  ownerName: { mr: 'राहुल मिसे', hi: 'राहुल मिसे', en: 'Rahul Mise' },
  ownerTitle: { mr: 'संचालक, साईराम महा-ई-सेवा केंद्र', hi: 'संचालक, साईराम महा-ई-सेवा केंद्र', en: 'Director, Sairam Maha-E-Seva' }
};

const CATEGORIES = [
  { id: 'farmer', label: { mr: 'शेतकरी योजना', hi: 'किसान योजना', en: 'Farmers' }, icon: '🚜', color: 'from-orange-500 to-orange-700' },
  { id: 'student', label: { mr: 'विद्यार्थी कक्ष', hi: 'छात्र कक्ष', en: 'Students' }, icon: '🎓', color: 'from-blue-600 to-blue-800' },
  { id: 'jobs', label: { mr: 'नोकरी अलर्ट', hi: 'नौकरी अपडेट', en: 'Job Alerts' }, icon: '📢', color: 'from-red-600 to-red-800' },
  { id: 'csc', label: { mr: 'महा-ई-सेवा', hi: 'महा-ई-सेवा', en: 'CSC Services' }, icon: '🏛️', color: 'from-indigo-600 to-indigo-800' },
  { id: 'identity', label: { mr: 'ओळखपत्र', hi: 'पहचान', en: 'Identity' }, icon: '💳', color: 'from-emerald-600 to-emerald-800' },
  { id: 'printing', label: { mr: 'इतर सेवा', hi: 'अन्य सेवाएं', en: 'Others' }, icon: '🖨️', color: 'from-pink-600 to-pink-800' }
];

const ProfessionalLogo: React.FC<{ size?: 'sm' | 'lg' | 'splash' }> = ({ size = 'lg' }) => {
  const isSplash = size === 'splash';
  const isSm = size === 'sm';

  return (
    <div className="logo-visibility-wrapper animate-logo-final">
      <h1 className={`font-sairam-main text-logo-jabardast whitespace-nowrap ${
        isSplash ? 'text-7xl' : 
        size === 'lg' ? 'text-6xl' : 
        'text-5xl'
      }`}>
        साईराम
      </h1>
      
      {!isSm && <div className="logo-underline-premium"></div>}
      
      <p className={`font-kalam text-gray-800 leading-none whitespace-nowrap ${
        isSplash ? 'text-3xl mt-2 pb-2' : 
        size === 'lg' ? 'text-2xl mt-1 pb-1' : 
        'text-lg mt-0.5'
      }`}>
        महा-ई-सेवा केंद्र
      </p>
    </div>
  );
};

const ServiceCard: React.FC<{ service: Service; lang: Language; onClick: () => void }> = ({ service, lang, onClick }) => (
  <button 
    onClick={onClick}
    className="glass-morphism w-full p-5 rounded-[2rem] flex items-center space-x-5 hover:bg-white transition-all border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-100 fade-in-up"
  >
    <div className="text-3xl bg-white p-4 rounded-2xl shadow-inner flex items-center justify-center min-w-[64px] h-[64px] border border-gray-50/50">
      {service.icon}
    </div>
    <div className="flex-1 text-left">
      <div className="flex items-center space-x-2">
        <h3 className="font-bold text-gray-900 text-lg leading-tight">{service.title[lang]}</h3>
        {service.isNew && <span className="bg-red-100 text-red-600 text-[9px] font-black px-1.5 py-0.5 rounded-full animate-pulse uppercase">New</span>}
      </div>
      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{service.description[lang]}</p>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-orange-600 font-bold text-xl">₹{service.fees.filling}</span>
    </div>
  </button>
);

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('appState');
    return saved ? JSON.parse(saved) : {
      language: 'mr',
      notifications: { farmer: true, student: true, jobs: true, schemes: true },
      hasSeenWelcome: false
    };
  });

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'updates' | 'contact'>('home');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(true);
  const [showNotifModal, setShowNotifModal] = useState(false);

  const lang = state.language;

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
    const timer = setTimeout(() => setIsOpening(false), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  const toggleLanguage = () => {
    const langs: Language[] = ['mr', 'en', 'hi'];
    const currentIdx = langs.indexOf(state.language);
    setState(prev => ({ ...prev, language: langs[(currentIdx + 1) % 3] }));
  };

  const handleNotificationToggle = (key: keyof NotificationPrefs) => {
    setState(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: !prev.notifications[key] }
    }));
  };

  const isAnyNotifOn = Object.values(state.notifications).some(v => v);

  const sendWhatsApp = (serviceName: string) => {
    // UPDATED MESSAGE FORMAT AS REQUESTED
    const message = encodeURIComponent(`नमस्कार साईराम महा-ई-सेवा केंद्र, मला "${serviceName}" या फॉर्म भरायचा आहे मला माहिती हवी आहे.`);
    window.open(`https://wa.me/919011083440?text=${message}`, '_blank');
  };

  const currentCategoryLabel = useMemo(() => {
    if (!filterCategory) return UI_LABELS.allServices[lang];
    const cat = CATEGORIES.find(c => c.id === filterCategory);
    return cat ? cat.label[lang] : UI_LABELS.allServices[lang];
  }, [filterCategory, lang]);

  const filteredServices = useMemo(() => {
    if (!filterCategory) return SERVICES;
    return SERVICES.filter(s => s.category === filterCategory);
  }, [filterCategory]);

  const newUpdates = useMemo(() => {
    return SERVICES.filter(s => s.isNew || s.importantDates?.end).sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
  }, []);

  if (isOpening) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100] p-10">
        <ProfessionalLogo size="splash" />
        <div className="absolute bottom-16 flex flex-col items-center space-y-4">
            <div className="h-1 w-32 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 animate-[shimmer-line_2s_infinite_linear]"></div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fafafa] pb-32 relative overflow-x-hidden">
      <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-2xl px-4 h-32 border-b border-gray-100 header-premium-glow flex items-center justify-between overflow-visible">
         <button 
            onClick={toggleLanguage}
            className="w-12 h-12 flex flex-col items-center justify-center bg-gray-900 text-white rounded-xl text-[10px] font-bold uppercase shadow-md active:scale-90 transition-transform flex-shrink-0 z-50"
          >
            <span className="text-xl">🌐</span>
            {lang}
          </button>

          <div className="flex-1 flex justify-center items-center overflow-visible">
             <ProfessionalLogo size="sm" />
          </div>

          <button 
            onClick={() => setShowNotifModal(true)}
            className={`w-12 h-12 flex flex-col items-center justify-center rounded-xl shadow-md active:scale-90 transition-all relative flex-shrink-0 z-50 ${isAnyNotifOn ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-400'}`}
          >
            <span className="text-2xl">🔔</span>
            {isAnyNotifOn && <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>}
          </button>
      </header>

      <main className="px-5 py-6 space-y-10">
        {activeTab === 'home' && !filterCategory && (
          <>
            <section className="relative rounded-[2.5rem] overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 to-black p-8 text-white min-h-[260px] flex flex-col justify-end fade-in-up">
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center space-x-2 bg-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    <span>Direct Seva Portal</span>
                </div>
                <h2 className="text-3xl font-black leading-tight tracking-tight">{UI_LABELS.heroTitle[lang]}</h2>
                <p className="text-sm opacity-80 leading-relaxed">{UI_LABELS.heroSub[lang]}</p>
                <div className="flex pt-4">
                   <button onClick={() => setActiveTab('updates')} className="bg-white text-black px-8 py-4 rounded-2xl text-xs font-bold shadow-lg active:scale-95 transition-transform flex-1">
                    {UI_LABELS.updates[lang]} पहा
                   </button>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-5 fade-in-up">
               {CATEGORIES.map(cat => (
                 <button 
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className="glass-morphism p-6 rounded-[2rem] flex flex-col items-center space-y-4 hover:scale-[1.03] transition-all border border-gray-100"
                 >
                   <div className={`bg-gradient-to-br ${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg`}>
                     {cat.icon}
                   </div>
                   <span className="text-sm font-bold text-gray-900 text-center">{cat.label[lang]}</span>
                 </button>
               ))}
               <button 
                  onClick={() => setFilterCategory(null)}
                  className="glass-morphism p-6 rounded-[2rem] flex flex-col items-center justify-center space-y-4 border border-gray-100 col-span-2 bg-gray-50/50"
                 >
                   <span className="text-sm font-bold text-gray-900">{UI_LABELS.viewServices[lang]}</span>
               </button>
            </div>
          </>
        )}

        {/* Filtered Category View */}
        {activeTab === 'home' && filterCategory && (
            <div className="space-y-6 animate-reveal">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 border-l-[8px] border-orange-600 pl-4 py-1">{currentCategoryLabel}</h2>
                    <button onClick={() => setFilterCategory(null)} className="text-sm font-bold text-orange-600 px-4 py-1 bg-orange-50 rounded-full">मागे जा</button>
                </div>
                <div className="space-y-4">
                    {filteredServices.map(s => (
                        <ServiceCard key={s.id} service={s} lang={lang} onClick={() => setSelectedService(s)} />
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'updates' && (
          <div className="space-y-8 animate-reveal">
            <h2 className="text-2xl font-bold text-gray-900 border-l-[8px] border-orange-600 pl-4 py-1">{UI_LABELS.updates[lang]}</h2>
            <div className="space-y-4">
              {newUpdates.map(s => (
                <ServiceCard key={s.id} service={s} lang={lang} onClick={() => setSelectedService(s)} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-12 py-6 animate-reveal">
            <ProfessionalLogo size="lg" />
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 space-y-8 text-center">
               <div className="space-y-2">
                 <p className="font-sairam-main text-5xl text-gray-900">{UI_LABELS.ownerName[lang]}</p>
                 <p className="text-[10px] text-orange-600 font-bold uppercase tracking-widest">{UI_LABELS.ownerTitle[lang]}</p>
               </div>
               <div className="space-y-4">
                 <button onClick={() => window.open('tel:9011083440')} className="w-full flex items-center justify-center space-x-4 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                    <span className="text-3xl">📞</span>
                    <span className="font-black text-2xl text-gray-800">9011083440</span>
                 </button>
               </div>
               <button onClick={() => window.open('tel:9011083440')} className="w-full bg-orange-600 text-white py-6 rounded-[2rem] font-bold text-xl shadow-lg shadow-orange-100 active:scale-95 transition-transform">
                 {UI_LABELS.callNow[lang]}
               </button>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-gray-900/95 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-around py-5 px-8 z-[150] shadow-2xl border border-white/10">
        <button 
          onClick={() => { setActiveTab('home'); setFilterCategory(null); }}
          className={`flex flex-col items-center space-y-1 transition-all ${activeTab === 'home' ? 'text-orange-500 scale-110' : 'text-gray-500'}`}
        >
          <span className="text-2xl">🏠</span>
          <span className={`text-[8px] font-bold uppercase tracking-widest ${activeTab === 'home' ? 'opacity-100' : 'opacity-0'}`}>{UI_LABELS.home[lang]}</span>
        </button>
        <button 
          onClick={() => setActiveTab('updates')}
          className={`flex flex-col items-center space-y-1 transition-all ${activeTab === 'updates' ? 'text-orange-500 scale-110' : 'text-gray-500'}`}
        >
          <span className="text-2xl">📢</span>
          <span className={`text-[8px] font-bold uppercase tracking-widest ${activeTab === 'updates' ? 'opacity-100' : 'opacity-0'}`}>{UI_LABELS.updates[lang]}</span>
        </button>
        <button 
          onClick={() => setActiveTab('contact')}
          className={`flex flex-col items-center space-y-1 transition-all ${activeTab === 'contact' ? 'text-orange-500 scale-110' : 'text-gray-500'}`}
        >
          <span className="text-2xl">👤</span>
          <span className={`text-[8px] font-bold uppercase tracking-widest ${activeTab === 'contact' ? 'opacity-100' : 'opacity-0'}`}>{UI_LABELS.contact[lang]}</span>
        </button>
      </nav>

      {/* Notification Toggle Modal */}
      {showNotifModal && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-xl flex items-center justify-center p-8">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 space-y-6">
              <h2 className="text-2xl font-black text-gray-900 border-b pb-4">Notifications</h2>
              <div className="space-y-4">
                {[
                  { key: 'farmer', label: 'शेतकरी योजना', icon: '🚜' },
                  { key: 'student', label: 'विद्यार्थी कक्ष', icon: '🎓' },
                  { key: 'jobs', label: 'नोकरी अलर्ट', icon: '📢' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border">
                    <div className="flex items-center space-x-3">
                       <span className="text-2xl">{item.icon}</span>
                       <span className="font-bold text-gray-800">{item.label}</span>
                    </div>
                    <button 
                      onClick={() => handleNotificationToggle(item.key as any)}
                      className={`w-12 h-6 rounded-full relative transition-all ${state.notifications[item.key as any] ? 'bg-orange-600' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${state.notifications[item.key as any] ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowNotifModal(false)} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold">
                Close
              </button>
           </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[210] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-lg p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] p-8 space-y-8 animate-in slide-in-from-bottom max-h-[94vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-5">
                <div className="text-6xl bg-orange-50 p-4 rounded-2xl shadow-inner">{selectedService.icon}</div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 leading-tight">{selectedService.title[lang]}</h2>
                  <div className="flex flex-col mt-1">
                    <span className="text-orange-600 font-bold text-sm">{UI_LABELS.fillingFee[lang]} ₹{selectedService.fees.filling}</span>
                    {selectedService.fees.govt && <span className="text-gray-500 text-[11px] font-bold">{UI_LABELS.govtFee[lang]} {selectedService.fees.govt}</span>}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedService(null)} className="p-3 bg-gray-100 rounded-full text-gray-400">✕</button>
            </div>

            {/* Detailed Info Grid */}
            <div className="grid grid-cols-2 gap-4">
                {selectedService.eligibility && (
                    <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                        <p className="text-[10px] uppercase font-black text-orange-600">{UI_LABELS.eligibility[lang]}</p>
                        <p className="text-sm font-bold text-gray-800">{selectedService.eligibility[lang]}</p>
                    </div>
                )}
                {selectedService.ageLimit && (
                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                        <p className="text-[10px] uppercase font-black text-blue-600">{UI_LABELS.ageLimit[lang]}</p>
                        <p className="text-sm font-bold text-gray-800">{selectedService.ageLimit[lang]}</p>
                    </div>
                )}
                {selectedService.importantDates?.start && (
                    <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                        <p className="text-[10px] uppercase font-black text-emerald-600">{UI_LABELS.startDate[lang]}</p>
                        <p className="text-sm font-bold text-gray-800">{selectedService.importantDates.start}</p>
                    </div>
                )}
                {selectedService.importantDates?.end && (
                    <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100">
                        <p className="text-[10px] uppercase font-black text-red-600">{UI_LABELS.endDate[lang]}</p>
                        <p className="text-sm font-bold text-gray-800">{selectedService.importantDates.end}</p>
                    </div>
                )}
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-3">
                   <span className="w-2 h-6 bg-orange-600 rounded-full"></span>
                   {UI_LABELS.docsRequired[lang]}
                </h4>
                <ul className="space-y-3">
                  {(selectedService.documents?.[lang] || []).map((doc, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm font-bold text-gray-700">
                      <div className="min-w-[8px] h-[8px] bg-orange-500 rounded-full mt-1.5"></div>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button 
              onClick={() => sendWhatsApp(selectedService.title[lang])}
              className="w-full bg-green-600 text-white py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center space-x-3 shadow-xl active:scale-95 transition-all"
            >
              <span className="text-2xl">💬</span>
              <span>{UI_LABELS.whatsappMsg[lang]}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
