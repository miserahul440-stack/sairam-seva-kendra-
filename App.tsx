import React, { useState, useEffect } from 'react';

const SHEETS = {
  SERVICES: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbNqsKBx8ZbXkr_odP3Jg8_2X7dVmgm4h9Z7zGhghwcFW5qRuMGi7esHKe5-THeOKEjnOSuKAG9vU0/pub?gid=0&single=true&output=csv',
  JOBS: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbNqsKBx8ZbXkr_odP3Jg8_2X7dVmgm4h9Z7zGhghwcFW5qRuMGi7esHKe5-THeOKEjnOSuKAG9vU0/pub?gid=1929233375&single=true&output=csv',
  SHETKARI: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbNqsKBx8ZbXkr_odP3Jg8_2X7dVmgm4h9Z7zGhghwcFW5qRuMGi7esHKe5-THeOKEjnOSuKAG9vU0/pub?gid=990423968&single=true&output=csv',
  VIDYARTHI: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbNqsKBx8ZbXkr_odP3Jg8_2X7dVmgm4h9Z7zGhghwcFW5qRuMGi7esHKe5-THeOKEjnOSuKAG9vU0/pub?gid=1052762212&single=true&output=csv',
  OLAKH: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbNqsKBx8ZbXkr_odP3Jg8_2X7dVmgm4h9Z7zGhghwcFW5qRuMGi7esHKe5-THeOKEjnOSuKAG9vU0/pub?gid=264180125&single=true&output=csv',
  PRINTING: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbNqsKBx8ZbXkr_odP3Jg8_2X7dVmgm4h9Z7zGhghwcFW5qRuMGi7esHKe5-THeOKEjnOSuKAG9vU0/pub?gid=333295125&single=true&output=csv',
  NOTIFICATIONS: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbNqsKBx8ZbXkr_odP3Jg8_2X7dVmgm4h9Z7zGhghwcFW5qRuMGi7esHKe5-THeOKEjnOSuKAG9vU0/pub?gid=100806122&single=true&output=csv',
  SETTINGS: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbNqsKBx8ZbXkr_odP3Jg8_2X7dVmgm4h9Z7zGhghwcFW5qRuMGi7esHKe5-THeOKEjnOSuKAG9vU0/pub?gid=1869150109&single=true&output=csv'
};

const parseCSV = (text) => {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const obj = {};
    headers.forEach((h, i) => obj[h] = values[i] || '');
    return obj;
  });
};

// ✅ FIX 1 & 8: Improved Logo with BIGGER subtitle
const Logo = ({ size = 'md', lang, showSubtitle = true }) => {
  const scale = size === 'sm' ? 0.7 : size === 'lg' ? 1.3 : 1;
  const taglines = { 
    mr: 'तुमचा विश्वास, आमची सेवा', 
    en: 'Your Trust, Our Service', 
    hi: 'आपका विश्वास, हमारी सेवा' 
  };
  const centers = {
    mr: 'महा-ई-सेवा केंद्र',
    en: 'Maha e-Seva Center',
    hi: 'महा ई-सेवा केंद्र'
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${scale})`, transition: 'transform 0.3s ease' }}>
      <svg width="300" height="110" viewBox="0 0 300 110" style={{ filter: 'drop-shadow(0 10px 25px rgba(255,102,0,0.4))' }}>
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#ff6600' }} />
            <stop offset="50%" style={{ stopColor: '#ff9933' }} />
            <stop offset="100%" style={{ stopColor: '#ffcc00' }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <text x="50%" y="55" dominantBaseline="middle" textAnchor="middle" fill="url(#logoGrad)" fontSize="85" filter="url(#glow)" style={{ fontWeight: 900, fontFamily: "'Tiro Devanagari Marathi', 'Noto Sans Devanagari', serif", letterSpacing: '-3px' }}>साईराम</text>
        <path d="M65 72 Q 150 95, 235 72" stroke="url(#logoGrad)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="232" cy="67" r="6" fill="#ffcc00">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
      {showSubtitle && (
        <div style={{ marginTop: size === 'sm' ? '-5px' : '-10px', background: 'rgba(255,102,0,0.15)', backdropFilter: 'blur(20px)', padding: size === 'sm' ? '8px 24px' : '10px 32px', borderRadius: '25px', border: '2px solid rgba(255,102,0,0.3)', boxShadow: '0 4px 15px rgba(255,102,0,0.2)' }}>
          <p style={{ fontSize: size === 'sm' ? '15px' : '18px', fontWeight: 900, color: '#ff6600', margin: 0, letterSpacing: '1px', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>{centers[lang]}</p>
          <span style={{ fontSize: size === 'sm' ? '9px' : '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#ff9933', display: 'block', marginTop: '3px' }}>{taglines[lang]}</span>
        </div>
      )}
    </div>
  );
};

// ✅ FIX 2: Complete translation object - ALL fields translated
const T = {
  mr: {
    home: 'होम', updates: 'अपडेट्स', contact: 'संपर्क', back: 'मागे', apply: 'अर्ज करा', close: 'बंद', 
    notifications: 'सूचना', farmer: 'शेतकरी योजना', student: 'विद्यार्थी कक्ष', jobs: 'नोकरी अलर्ट', 
    eseva: 'महा-ई-सेवा', id: 'ओळखपत्र', other: 'इतर सेवा', start: 'सुरुवात तारीख', 
    last: 'शेवटची तारीख', fee: 'शुल्क', docs: 'आवश्यक कागदपत्रे', qual: 'शैक्षणिक पात्रता', 
    age: 'वय मर्यादा', seats: 'एकूण जागा', posts: 'पदे', benefit: 'लाभ', eligibility: 'पात्रता', 
    dept: 'विभाग', director: 'संचालक', call: 'कॉल करा', whatsapp: 'WhatsApp संदेश', 
    ourService: 'आमची सेवा', yourTrust: 'तुमचा विश्वास', allServices: 'सर्व शासकीय सेवा एकाच ठिकाणी!', 
    explore: 'सेवा पहा', center: 'महा-ई-सेवा केंद्र', loading: 'लोड होत आहे...', available: 'उपलब्ध',
    newUpdate: 'नवीन अपडेट', clickForDetails: 'तपशीलासाठी क्लिक करा', noInternet: 'इंटरनेट कनेक्शन नाही',
    tryAgain: 'पुन्हा प्रयत्न करा', description: 'तपशील', category: 'श्रेणी', applyMsg: 'नमस्कार, मला',
    formInfo: 'या फॉर्म बद्दल माहिती हवी आहे. कृपया माहिती द्या.'
  },
  en: {
    home: 'Home', updates: 'Updates', contact: 'Contact', back: 'Back', apply: 'Apply Now', close: 'Close',
    notifications: 'Notifications', farmer: 'Farmer Schemes', student: 'Student Portal', jobs: 'Job Alerts',
    eseva: 'e-Services', id: 'ID Cards', other: 'Other Services', start: 'Start Date', last: 'Last Date',
    fee: 'Fee', docs: 'Required Documents', qual: 'Qualification', age: 'Age Limit', seats: 'Total Seats',
    posts: 'Posts', benefit: 'Benefit', eligibility: 'Eligibility', dept: 'Department', director: 'Director',
    call: 'Call Now', whatsapp: 'WhatsApp Message', ourService: 'Our Service', yourTrust: 'Your Trust',
    allServices: 'All Government Services in One Place!', explore: 'Explore', center: 'Maha e-Seva Center',
    loading: 'Loading...', available: 'available', newUpdate: 'New Update', clickForDetails: 'Click for details',
    noInternet: 'No Internet Connection', tryAgain: 'Try Again', description: 'Description', category: 'Category',
    applyMsg: 'Hello, I need information about', formInfo: 'this form. Please provide details.'
  },
  hi: {
    home: 'होम', updates: 'अपडेट्स', contact: 'संपर्क', back: 'वापस', apply: 'आवेदन करें', close: 'बंद',
    notifications: 'सूचनाएं', farmer: 'किसान योजना', student: 'छात्र पोर्टल', jobs: 'नौकरी अलर्ट',
    eseva: 'ई-सेवाएं', id: 'पहचान पत्र', other: 'अन्य सेवाएं', start: 'शुरुआत तिथि', last: 'अंतिम तिथि',
    fee: 'शुल्क', docs: 'आवश्यक दस्तावेज', qual: 'योग्यता', age: 'आयु सीमा', seats: 'कुल सीटें',
    posts: 'पद', benefit: 'लाभ', eligibility: 'पात्रता', dept: 'विभाग', director: 'निदेशक',
    call: 'कॉल करें', whatsapp: 'WhatsApp संदेश', ourService: 'हमारी सेवा', yourTrust: 'आपका विश्वास',
    allServices: 'सभी सरकारी सेवाएं एक जगह!', explore: 'देखें', center: 'महा ई-सेवा केंद्र',
    loading: 'लोड हो रहा...', available: 'उपलब्ध', newUpdate: 'नया अपडेट', clickForDetails: 'विवरण के लिए क्लिक करें',
    noInternet: 'इंटरनेट कनेक्शन नहीं', tryAgain: 'पुनः प्रयास करें', description: 'विवरण', category: 'श्रेणी',
    applyMsg: 'नमस्ते, मुझे', formInfo: 'इस फॉर्म के बारे में जानकारी चाहिए। कृपया जानकारी दें।'
  }
};

const CAT = {
  mr: [
    { id: 'farmer', label: 'शेतकरी योजना', icon: '🌾', color: '#10b981' },
    { id: 'student', label: 'विद्यार्थी कक्ष', icon: '🎓', color: '#3b82f6' },
    { id: 'jobs', label: 'नोकरी अलर्ट', icon: '📢', color: '#ef4444' },
    { id: 'csc', label: 'महा-ई-सेवा', icon: '🏛️', color: '#8b5cf6' },
    { id: 'identity', label: 'ओळखपत्र', icon: '💳', color: '#f59e0b' },
    { id: 'printing', label: 'इतर सेवा', icon: '🖨️', color: '#ec4899' }
  ],
  en: [
    { id: 'farmer', label: 'Farmer Schemes', icon: '🌾', color: '#10b981' },
    { id: 'student', label: 'Student Portal', icon: '🎓', color: '#3b82f6' },
    { id: 'jobs', label: 'Job Alerts', icon: '📢', color: '#ef4444' },
    { id: 'csc', label: 'e-Services', icon: '🏛️', color: '#8b5cf6' },
    { id: 'identity', label: 'ID Cards', icon: '💳', color: '#f59e0b' },
    { id: 'printing', label: 'Other Services', icon: '🖨️', color: '#ec4899' }
  ],
  hi: [
    { id: 'farmer', label: 'किसान योजना', icon: '🌾', color: '#10b981' },
    { id: 'student', label: 'छात्र पोर्टल', icon: '🎓', color: '#3b82f6' },
    { id: 'jobs', label: 'नौकरी अलर्ट', icon: '📢', color: '#ef4444' },
    { id: 'csc', label: 'ई-सेवाएं', icon: '🏛️', color: '#8b5cf6' },
    { id: 'identity', label: 'पहचान पत्र', icon: '💳', color: '#f59e0b' },
    { id: 'printing', label: 'अन्य सेवाएं', icon: '🖨️', color: '#ec4899' }
  ]
};

function App() {
  const [data, setData] = useState({ 
    services: [], jobs: [], shetkari: [], vidyarthi: [], olakh: [], printing: [], 
    notifications: [], settings: {} 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [filterCat, setFilterCat] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNotif, setShowNotif] = useState(true);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [lang, setLang] = useState(() => localStorage.getItem('app_language') || 'mr');
  const [history, setHistory] = useState(['home']);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const t = T[lang];
  const categories = CAT[lang];

  // ✅ FIX 7: Online/Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ✅ FIX 2: Save language preference
  useEffect(() => {
    localStorage.setItem('app_language', lang);
  }, [lang]);

  // Load data with error handling
  useEffect(() => {
    const load = async () => {
      if (!navigator.onLine) {
        setError(t.noInternet);
        setLoading(false);
        return;
      }

      try {
        const [svc, job, shk, vid, olk, prt, ntf, stg] = await Promise.all([
          fetch(SHEETS.SERVICES).then(r => r.text()).then(parseCSV),
          fetch(SHEETS.JOBS).then(r => r.text()).then(parseCSV),
          fetch(SHEETS.SHETKARI).then(r => r.text()).then(parseCSV),
          fetch(SHEETS.VIDYARTHI).then(r => r.text()).then(parseCSV),
          fetch(SHEETS.OLAKH).then(r => r.text()).then(parseCSV),
          fetch(SHEETS.PRINTING).then(r => r.text()).then(parseCSV),
          fetch(SHEETS.NOTIFICATIONS).then(r => r.text()).then(parseCSV),
          fetch(SHEETS.SETTINGS).then(r => r.text()).then(parseCSV)
        ]);
        
        const cfg = {};
        stg.forEach(s => cfg[s.Setting_Key] = s.Setting_Value);
        
        const newData = {
          services: svc.filter(s => s.Active === 'YES'),
          jobs: job.filter(j => j.Active === 'YES'),
          shetkari: shk.filter(s => s.Active === 'YES'),
          vidyarthi: vid.filter(v => v.Active === 'YES'),
          olakh: olk.filter(o => o.Active === 'YES'),
          printing: prt.filter(p => p.Active === 'YES'),
          notifications: ntf.filter(n => n.Active === 'YES'),
          settings: cfg
        };
        
        // Cache data for offline use
        localStorage.setItem('cached_data', JSON.stringify(newData));
        setData(newData);
        setError(null);
        setTimeout(() => setLoading(false), 600);
      } catch (e) {
        console.error('Load error:', e);
        // Try to load cached data
        const cached = localStorage.getItem('cached_data');
        if (cached) {
          setData(JSON.parse(cached));
          setError('Offline mode - showing cached data');
        } else {
          setError(t.noInternet);
        }
        setLoading(false);
      }
    };
    load();
  }, [t.noInternet]);

  // ✅ FIX 6: Get latest updates
  const getLatestUpdates = () => {
    const allItems = [
      ...data.jobs.map(j => ({ ...j, type: 'jobs', date: j.Start_Date })),
      ...data.shetkari.map(s => ({ ...s, type: 'farmer', date: s.Start_Date })),
      ...data.vidyarthi.map(v => ({ ...v, type: 'student', date: v.Start_Date })),
      ...data.services.map(s => ({ ...s, type: 'csc', date: s.Start_Date }))
    ].filter(item => item.date);
    
    // Sort by date (newest first)
    return allItems.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    }).slice(0, 20); // Show latest 20 updates
  };

  // ✅ FIX 3: Navigation history
  const navigateTo = (view, category = null) => {
    setHistory([...history, view]);
    setActiveTab(view);
    setFilterCat(category);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousView = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      
      if (previousView === 'home') {
        setActiveTab('home');
        setFilterCat(null);
      } else if (previousView.startsWith('category_')) {
        const cat = previousView.replace('category_', '');
        setActiveTab('home');
        setFilterCat(cat);
      }
    }
  };

  // Get filtered data based on category
  const getFilteredData = () => {
    switch (filterCat) {
      case 'farmer': return data.shetkari;
      case 'student': return data.vidyarthi;
      case 'jobs': return data.jobs;
      case 'identity': return data.olakh;
      case 'printing': return data.printing;
      case 'csc': return data.services;
      default: return data.services;
    }
  };

  const filtered = getFilteredData();

  // ✅ FIX 5 & 7: Generate WhatsApp message
  const getWhatsAppLink = (item) => {
    const phone = '919011083440';
    const itemName = item.Service_Name || item.Job_Name || item.Yojana_Name || item.Scheme_Name || item.Card_Name || '';
    const message = `${t.applyMsg} "${itemName}" ${t.formInfo}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #ff6600 0%, #ff9933 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,204,0,0.1) 0%, transparent 50%)' }} />
        <Logo size="lg" lang={lang} showSubtitle={true} />
        <div style={{ marginTop: '30px', display: 'flex', gap: '8px' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%', animation: `bounce 1s infinite ${i * 0.2}s` }} />
          ))}
        </div>
        <p style={{ color: 'white', marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}>{t.loading}</p>
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #fff7ed, #ffffff)', paddingBottom: '100px', maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
      {/* Offline indicator */}
      {!isOnline && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: '#ef4444', color: 'white', padding: '10px', textAlign: 'center', zIndex: 1000, fontSize: '13px', fontWeight: 'bold' }}>
          🚫 {t.noInternet}
        </div>
      )}

      {/* Top notification banner */}
      {showNotif && data.notifications.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fed7aa)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #f59e0b', animation: 'slideDown 0.5s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <span style={{ fontSize: '24px', animation: 'ring 1s infinite' }}>🔔</span>
            <span style={{ fontSize: '13px', color: '#78350f', fontWeight: 'bold' }}>
              {data.notifications[0]?.Title}: {data.notifications[0]?.Message}
            </span>
          </div>
          <button onClick={() => setShowNotif(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '22px', color: '#78350f', padding: '0 8px' }}>✕</button>
        </div>
      )}

      {/* Header with improved design */}
      <header style={{ position: 'sticky', top: isOnline ? 0 : 40, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', padding: '16px 18px', borderBottom: '1px solid #ffedd5', boxShadow: '0 4px 20px rgba(255,102,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          {/* Back button - only show when not on home without filter */}
          {(filterCat || activeTab !== 'home') && (
            <button onClick={goBack} style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #ff6600, #ff9933)', color: 'white', borderRadius: '16px', border: 'none', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(255,102,0,0.3)', transition: 'transform 0.2s' }}>
              ←
            </button>
          )}
          
          {/* Language selector */}
          <button onClick={() => setLang(lang === 'mr' ? 'en' : lang === 'en' ? 'hi' : 'mr')} style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #1e293b, #334155)', color: 'white', borderRadius: '16px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'transform 0.2s' }}>
            <span style={{ fontSize: '20px' }}>🌐</span>
            <span style={{ fontSize: '9px' }}>{lang.toUpperCase()}</span>
          </button>
          
          {/* Logo */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Logo size="sm" lang={lang} showSubtitle={true} />
          </div>
          
          {/* Notifications button */}
          <button onClick={() => setShowNotifModal(true)} style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #ff6600, #ff9933)', color: 'white', borderRadius: '16px', border: 'none', fontSize: '24px', cursor: 'pointer', position: 'relative', boxShadow: '0 4px 12px rgba(255,102,0,0.3)', transition: 'transform 0.2s' }}>
            🔔
            {data.notifications.length > 0 && (
              <div style={{ position: 'absolute', top: '6px', right: '6px', width: '12px', height: '12px', background: '#dc2626', borderRadius: '50%', border: '2px solid white', animation: 'pulse 1.5s infinite' }} />
            )}
          </button>
        </div>
      </header>

      <main style={{ padding: '20px' }}>
        {/* Home page */}
        {activeTab === 'home' && !filterCat && (
          <>
            {/* Hero section with enhanced design */}
            <section style={{ background: 'linear-gradient(135deg, #ff6600 0%, #ff9933 50%, #ffcc00 100%)', borderRadius: '30px', padding: '50px 30px', color: 'white', marginBottom: '28px', boxShadow: '0 20px 50px rgba(255,102,0,0.4)', position: 'relative', overflow: 'hidden' }}>
              {/* Decorative elements */}
              <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', filter: 'blur(60px)' }} />
              <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '160px', height: '160px', background: 'rgba(255,204,0,0.2)', borderRadius: '50%', filter: 'blur(45px)' }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '24px' }}>
                  <div style={{ flex: 1, height: '3px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4))' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '50px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>🏛️</span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', background: 'rgba(255,255,255,0.25)', padding: '5px 14px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>{t.ourService}</span>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', background: 'rgba(255,255,255,0.25)', padding: '5px 14px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>{t.yourTrust}</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, height: '3px', background: 'linear-gradient(90deg, rgba(255,255,255,0.4), transparent)' }} />
                </div>
                
                <h2 style={{ fontSize: '30px', fontWeight: 900, textAlign: 'center', marginBottom: '16px', lineHeight: '1.3', textShadow: '0 4px 12px rgba(0,0,0,0.3)', letterSpacing: '-0.5px' }}>
                  {t.allServices}
                </h2>
                
                <p style={{ fontSize: '15px', opacity: 0.95, textAlign: 'center', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500 }}>
                  {t.farmer} • {t.eseva} • {t.student} • {t.jobs}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })} style={{ background: 'white', color: '#ff6600', padding: '16px 36px', borderRadius: '16px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', transition: 'transform 0.2s' }}>
                    <span>{t.explore}</span>
                    <span style={{ fontSize: '18px' }}>→</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Categories grid with enhanced design */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => {
                    navigateTo('home', cat.id);
                    setHistory([...history, `category_${cat.id}`]);
                  }} 
                  style={{ 
                    background: 'white', 
                    borderRadius: '24px', 
                    padding: '26px 18px', 
                    border: '2px solid #ffedd5', 
                    cursor: 'pointer', 
                    textAlign: 'center', 
                    boxShadow: '0 4px 16px rgba(255,102,0,0.1)', 
                    transition: 'all 0.3s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,102,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,102,0,0.1)';
                  }}
                >
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: `${cat.color}15`, borderRadius: '50%', filter: 'blur(30px)' }} />
                  <div style={{ width: '60px', height: '60px', background: `${cat.color}20`, borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '32px', position: 'relative', zIndex: 1 }}>
                    {cat.icon}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a202c', lineHeight: '1.4', display: 'block', position: 'relative', zIndex: 1 }}>
                    {cat.label}
                  </span>
                  {/* Count badge */}
                  <div style={{ marginTop: '8px', display: 'inline-block', background: `${cat.color}`, color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                    {cat.id === 'farmer' && data.shetkari.length}
                    {cat.id === 'student' && data.vidyarthi.length}
                    {cat.id === 'jobs' && data.jobs.length}
                    {cat.id === 'csc' && data.services.length}
                    {cat.id === 'identity' && data.olakh.length}
                    {cat.id === 'printing' && data.printing.length}
                    {' '}{t.available}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ✅ FIX 4: Category listing with ALL services */}
        {activeTab === 'home' && filterCat && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', background: 'white', padding: '16px 20px', borderRadius: '20px', boxShadow: '0 4px 16px rgba(255,102,0,0.1)' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a202c', marginBottom: '4px' }}>
                  {categories.find(c => c.id === filterCat)?.label}
                </h2>
                <p style={{ fontSize: '12px', color: '#64748b' }}>
                  {filtered.length} {t.available}
                </p>
              </div>
              <div style={{ fontSize: '40px' }}>
                {categories.find(c => c.id === filterCat)?.icon}
              </div>
            </div>
            
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '20px' }}>
                <p style={{ fontSize: '50px', marginBottom: '16px' }}>📭</p>
                <p style={{ fontSize: '16px', color: '#64748b' }}>सध्या कोणतीही सेवा उपलब्ध नाही</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filtered.map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedItem({ ...item, type: filterCat })} 
                    style={{ 
                      width: '100%', 
                      background: 'white', 
                      padding: '20px', 
                      borderRadius: '20px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '16px', 
                      border: '2px solid #ffedd5', 
                      cursor: 'pointer', 
                      textAlign: 'left', 
                      boxShadow: '0 4px 16px rgba(255,102,0,0.08)',
                      transition: 'all 0.3s',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(8px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,102,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,102,0,0.08)';
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: categories.find(c => c.id === filterCat)?.color || '#ff6600' }} />
                    <div style={{ fontSize: '48px', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${categories.find(c => c.id === filterCat)?.color}15`, borderRadius: '18px', flexShrink: 0 }}>
                      {item.Icon || '📄'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#1a202c', marginBottom: '6px', lineHeight: '1.3' }}>
                        {item.Service_Name || item.Yojana_Name || item.Scheme_Name || item.Job_Name || item.Card_Name}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>
                        {item.Description || item.Benefit || item.Department || item.Category || ''}
                      </p>
                      {item.Last_Date && (
                        <div style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fef3c7', padding: '4px 10px', borderRadius: '8px' }}>
                          <span style={{ fontSize: '12px' }}>📅</span>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#f59e0b' }}>{item.Last_Date}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '24px', color: categories.find(c => c.id === filterCat)?.color || '#ff6600' }}>→</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ✅ FIX 6: Updates tab with latest from all categories */}
        {activeTab === 'updates' && (
          <div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '20px', marginBottom: '20px', boxShadow: '0 4px 16px rgba(255,102,0,0.1)' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px', color: '#1a202c', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>📢</span>
                <span>{t.newUpdate}</span>
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b' }}>{t.clickForDetails}</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {getLatestUpdates().map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedItem(item)} 
                  style={{ 
                    background: 'white', 
                    borderRadius: '20px', 
                    padding: '22px', 
                    border: '2px solid #ffedd5', 
                    cursor: 'pointer', 
                    textAlign: 'left', 
                    boxShadow: '0 4px 16px rgba(255,102,0,0.08)', 
                    width: '100%',
                    transition: 'all 0.3s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,102,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,102,0,0.08)';
                  }}
                >
                  {/* New badge */}
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', padding: '4px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    New
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <div style={{ 
                      width: '56px', 
                      height: '56px', 
                      background: item.type === 'jobs' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                                  item.type === 'farmer' ? 'linear-gradient(135deg, #10b981, #059669)' :
                                  item.type === 'student' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' :
                                  'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                      borderRadius: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '28px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                      {item.Icon || (item.type === 'jobs' ? '💼' : item.type === 'farmer' ? '🌾' : item.type === 'student' ? '🎓' : '🏛️')}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c', marginBottom: '4px' }}>
                        {item.Job_Name || item.Yojana_Name || item.Scheme_Name || item.Service_Name}
                      </h3>
                      <div style={{ display: 'inline-block', background: `${categories.find(c => c.id === item.type)?.color}20`, padding: '3px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', color: categories.find(c => c.id === item.type)?.color }}>
                        {categories.find(c => c.id === item.type)?.label}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {item.date && (
                      <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '12px' }}>
                        <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '4px' }}>{t.start}</p>
                        <p style={{ fontSize: '12px', color: '#1a202c', fontWeight: 'bold' }}>📅 {item.date}</p>
                      </div>
                    )}
                    {item.Last_Date && (
                      <div style={{ padding: '10px', background: '#fef2f2', borderRadius: '12px' }}>
                        <p style={{ fontSize: '10px', color: '#dc2626', fontWeight: 'bold', marginBottom: '4px' }}>{t.last}</p>
                        <p style={{ fontSize: '12px', color: '#1a202c', fontWeight: 'bold' }}>⏰ {item.Last_Date}</p>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contact tab */}
        {activeTab === 'contact' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '32px' }}>
              <Logo size="lg" lang={lang} showSubtitle={true} />
            </div>
            
            <div style={{ background: 'white', borderRadius: '28px', padding: '36px 28px', boxShadow: '0 8px 32px rgba(255,102,0,0.15)', border: '2px solid #ffedd5' }}>
              <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #ff6600, #ff9933)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', boxShadow: '0 8px 24px rgba(255,102,0,0.3)' }}>
                👤
              </div>
              
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a202c', marginBottom: '6px' }}>राहुल मिसे</p>
              <p style={{ fontSize: '12px', color: '#ff6600', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '2px' }}>
                {t.director}
              </p>
              
              <div style={{ marginBottom: '24px', padding: '20px', background: '#fff7ed', borderRadius: '16px' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span>📞</span>
                  <span>9011083440</span>
                </p>
                <p style={{ fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <span>📧</span>
                  <span>sairamcomputer440@gmail.com</span>
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a 
                  href="tel:9011083440" 
                  style={{ 
                    flex: 1, 
                    background: 'linear-gradient(135deg, #ff6600, #ff9933)', 
                    color: 'white', 
                    padding: '18px', 
                    borderRadius: '16px', 
                    textDecoration: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    boxShadow: '0 4px 16px rgba(255,102,0,0.3)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '10px',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span style={{ fontSize: '24px' }}>📞</span>
                  <span>{t.call}</span>
                </a>
                
                <a 
                  href="https://wa.me/919011083440?text=नमस्कार%20साईराम%20महा-ई-सेवा%20केंद्र" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    flex: 1, 
                    background: 'linear-gradient(135deg, #25d366, #128c7e)', 
                    color: 'white', 
                    padding: '18px', 
                    borderRadius: '16px', 
                    textDecoration: 'none', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '10px',
                    boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span style={{ fontSize: '24px' }}>💬</span>
                  <span>{t.whatsapp}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom navigation with improved design */}
      <nav style={{ 
        position: 'fixed', 
        bottom: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        background: 'rgba(255,102,0,0.98)', 
        backdropFilter: 'blur(20px)', 
        borderRadius: '28px', 
        padding: '8px 16px', 
        display: 'flex', 
        gap: '8px', 
        boxShadow: '0 8px 32px rgba(255,102,0,0.4)', 
        zIndex: 150, 
        maxWidth: '420px', 
        width: 'calc(100% - 40px)',
        border: '2px solid rgba(255,255,255,0.3)'
      }}>
        {[
          { id: 'home', icon: '🏠', label: t.home },
          { id: 'updates', icon: '📢', label: t.updates },
          { id: 'contact', icon: '👤', label: t.contact }
        ].map(item => (
          <button 
            key={item.id} 
            onClick={() => {
              setActiveTab(item.id);
              setFilterCat(null);
              setHistory(['home', item.id]);
            }} 
            style={{ 
              flex: 1, 
              padding: '12px 16px', 
              background: activeTab === item.id ? 'rgba(255,255,255,0.95)' : 'transparent', 
              color: activeTab === item.id ? '#ff6600' : 'white', 
              border: 'none', 
              borderRadius: '20px', 
              cursor: 'pointer', 
              fontSize: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '4px',
              transition: 'all 0.3s',
              boxShadow: activeTab === item.id ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <span>{item.icon}</span>
            {activeTab === item.id && (
              <span style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Notifications modal */}
      {showNotifModal && (
        <div 
          onClick={() => setShowNotifModal(false)} 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0,0,0,0.75)', 
            backdropFilter: 'blur(12px)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 200, 
            padding: '20px',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              background: 'white', 
              borderRadius: '28px', 
              maxWidth: '420px', 
              width: '100%', 
              padding: '32px 28px',
              animation: 'slideUp 0.3s ease',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🔔</span>
                <span>{t.notifications}</span>
              </h2>
              <button 
                onClick={() => setShowNotifModal(false)} 
                style={{ 
                  background: '#f8fafc', 
                  border: 'none', 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '50%', 
                  cursor: 'pointer', 
                  fontSize: '18px', 
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {data.notifications.map((notif, i) => (
                <div 
                  key={i} 
                  style={{ 
                    padding: '18px', 
                    background: notif.Priority === 'High' ? '#fef2f2' : '#eff6ff', 
                    borderRadius: '16px', 
                    border: `2px solid ${notif.Priority === 'High' ? '#fecaca' : '#dbeafe'}` 
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <span style={{ fontSize: '28px' }}>
                      {notif.Priority === 'High' ? '🔴' : '🔵'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1a202c', marginBottom: '6px' }}>
                        {notif.Title}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', marginBottom: '8px' }}>
                        {notif.Message}
                      </p>
                      <div style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                        <span style={{ background: 'rgba(0,0,0,0.05)', padding: '3px 8px', borderRadius: '6px' }}>
                          📅 {notif.Start_Date}
                        </span>
                        <span style={{ background: 'rgba(0,0,0,0.05)', padding: '3px 8px', borderRadius: '6px' }}>
                          ⏰ {notif.End_Date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ✅ FIX 5: Item detail modal with COMPLETE information */}
      {selectedItem && (
        <div 
          onClick={() => setSelectedItem(null)} 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0,0,0,0.75)', 
            backdropFilter: 'blur(12px)', 
            display: 'flex', 
            alignItems: 'end', 
            justifyContent: 'center', 
            zIndex: 200,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              background: 'white', 
              borderRadius: '32px 32px 0 0', 
              maxWidth: '480px', 
              width: '100%', 
              padding: '32px 24px 40px', 
              maxHeight: '90vh', 
              overflowY: 'auto',
              animation: 'slideUp 0.4s ease'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                <div style={{ 
                  fontSize: '56px', 
                  flexShrink: 0,
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `${categories.find(c => c.id === selectedItem.type)?.color}20`,
                  borderRadius: '20px'
                }}>
                  {selectedItem.Icon || '💼'}
                </div>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px', lineHeight: '1.3' }}>
                    {selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || selectedItem.Scheme_Name || selectedItem.Card_Name}
                  </h2>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '5px 12px', 
                    background: `${categories.find(c => c.id === selectedItem.type)?.color}20`, 
                    borderRadius: '10px', 
                    fontSize: '12px', 
                    color: categories.find(c => c.id === selectedItem.type)?.color, 
                    fontWeight: 'bold' 
                  }}>
                    {selectedItem.Category || selectedItem.Department || categories.find(c => c.id === selectedItem.type)?.label}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedItem(null)} 
                style={{ 
                  background: '#f8fafc', 
                  border: 'none', 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  cursor: 'pointer', 
                  fontSize: '18px', 
                  color: '#64748b', 
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>

            {/* Details section */}
            <div style={{ marginBottom: '24px' }}>
              {/* Date, Fee, etc info cards */}
              {(selectedItem.Start_Date || selectedItem.Last_Date || selectedItem.Fee || selectedItem.Qualification || selectedItem.Age || selectedItem.Total_Posts || selectedItem.Seats) && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  {selectedItem.Start_Date && (
                    <div style={{ padding: '16px', background: '#eff6ff', borderRadius: '14px', border: '2px solid #dbeafe' }}>
                      <p style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>{t.start}</p>
                      <p style={{ fontSize: '15px', color: '#1a202c', fontWeight: 'bold' }}>📅 {selectedItem.Start_Date}</p>
                    </div>
                  )}
                  {selectedItem.Last_Date && (
                    <div style={{ padding: '16px', background: '#fef2f2', borderRadius: '14px', border: '2px solid #fecaca' }}>
                      <p style={{ fontSize: '11px', color: '#dc2626', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>{t.last}</p>
                      <p style={{ fontSize: '15px', color: '#1a202c', fontWeight: 'bold' }}>⏰ {selectedItem.Last_Date}</p>
                    </div>
                  )}
                  {selectedItem.Fee && (
                    <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '14px', border: '2px solid #bbf7d0' }}>
                      <p style={{ fontSize: '11px', color: '#10b981', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>{t.fee}</p>
                      <p style={{ fontSize: '15px', color: '#1a202c', fontWeight: 'bold' }}>💰 {selectedItem.Fee}</p>
                    </div>
                  )}
                  {selectedItem.Qualification && (
                    <div style={{ padding: '16px', background: '#eff6ff', borderRadius: '14px', border: '2px solid #dbeafe' }}>
                      <p style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>{t.qual}</p>
                      <p style={{ fontSize: '13px', color: '#1a202c', fontWeight: 'bold' }}>{selectedItem.Qualification}</p>
                    </div>
                  )}
                  {selectedItem.Age && (
                    <div style={{ padding: '16px', background: '#fef3c7', borderRadius: '14px', border: '2px solid #fde68a' }}>
                      <p style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>{t.age}</p>
                      <p style={{ fontSize: '13px', color: '#1a202c', fontWeight: 'bold' }}>{selectedItem.Age}</p>
                    </div>
                  )}
                  {(selectedItem.Total_Posts || selectedItem.Seats) && (
                    <div style={{ padding: '16px', background: '#f3e8ff', borderRadius: '14px', border: '2px solid #e9d5ff' }}>
                      <p style={{ fontSize: '11px', color: '#8b5cf6', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>
                        {selectedItem.Total_Posts ? t.posts : t.seats}
                      </p>
                      <p style={{ fontSize: '13px', color: '#1a202c', fontWeight: 'bold' }}>{selectedItem.Total_Posts || selectedItem.Seats}</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Benefit */}
              {selectedItem.Benefit && (
                <div style={{ padding: '18px', background: '#f0fdf4', borderRadius: '16px', marginBottom: '14px', border: '2px solid #bbf7d0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '20px' }}>🎁</span>
                    <p style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>{t.benefit}</p>
                  </div>
                  <p style={{ fontSize: '14px', color: '#1a202c', lineHeight: '1.6', margin: 0 }}>{selectedItem.Benefit}</p>
                </div>
              )}
              
              {/* Eligibility */}
              {selectedItem.Eligibility && (
                <div style={{ padding: '18px', background: '#eff6ff', borderRadius: '16px', marginBottom: '14px', border: '2px solid #dbeafe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '20px' }}>✅</span>
                    <p style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>{t.eligibility}</p>
                  </div>
                  <p style={{ fontSize: '14px', color: '#1a202c', lineHeight: '1.6', margin: 0 }}>{selectedItem.Eligibility}</p>
                </div>
              )}
              
              {/* Documents */}
              {(selectedItem.Documents || selectedItem.Documents_Required) && (
                <div style={{ padding: '18px', background: '#fef3c7', borderRadius: '16px', marginBottom: '14px', border: '2px solid #fde68a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '20px' }}>📄</span>
                    <p style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>{t.docs}</p>
                  </div>
                  <p style={{ fontSize: '14px', color: '#1a202c', lineHeight: '1.6', margin: 0 }}>
                    {selectedItem.Documents || selectedItem.Documents_Required}
                  </p>
                </div>
              )}
              
              {/* Description */}
              {(selectedItem.Description || selectedItem.Details) && (
                <div style={{ padding: '18px', background: '#f8fafc', borderRadius: '16px', border: '2px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '20px' }}>📋</span>
                    <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>{t.description}</p>
                  </div>
                  <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '14px', margin: 0 }}>
                    {selectedItem.Description || selectedItem.Details}
                  </p>
                </div>
              )}
            </div>

            {/* ✅ FIX 7: Action buttons with proper links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href={getWhatsAppLink(selectedItem)}
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  width: '100%', 
                  background: 'linear-gradient(135deg, #25d366, #128c7e)', 
                  color: 'white', 
                  padding: '18px', 
                  borderRadius: '16px', 
                  textDecoration: 'none', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px',
                  boxShadow: '0 6px 20px rgba(37,211,102,0.4)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span style={{ fontSize: '24px' }}>💬</span>
                <span>{t.apply} - WhatsApp</span>
              </a>
              
              <a 
                href="tel:9011083440"
                style={{ 
                  width: '100%', 
                  background: 'linear-gradient(135deg, #ff6600, #ff9933)', 
                  color: 'white', 
                  padding: '18px', 
                  borderRadius: '16px', 
                  textDecoration: 'none', 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px',
                  boxShadow: '0 6px 20px rgba(255,102,0,0.4)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span style={{ fontSize: '24px' }}>📞</span>
                <span>{t.call}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(-10deg); }
          20%, 40% { transform: rotate(10deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

export default App;
