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

// ✅ FIX 1: VIBRANT साईराम Logo
const Logo = ({ size = 'md', lang }) => {
  const scale = size === 'sm' ? 0.65 : size === 'lg' ? 1.4 : 1;
  
  const centers = {
    mr: 'महा-ई-सेवा केंद्र',
    en: 'Maha e-Seva Center',
    hi: 'महा ई-सेवा केंद्र'
  };
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      transform: `scale(${scale})`,
      transformOrigin: 'center'
    }}>
      {/* साईराम with vibrant gradient */}
      <svg width="260" height="100" viewBox="0 0 260 100" style={{ filter: 'drop-shadow(0 8px 20px rgba(255,0,100,0.5))' }}>
        <defs>
          <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#FF0080' }} />
            <stop offset="25%" style={{ stopColor: '#FF6B00' }} />
            <stop offset="50%" style={{ stopColor: '#FFD700' }} />
            <stop offset="75%" style={{ stopColor: '#00D4FF' }} />
            <stop offset="100%" style={{ stopColor: '#A855F7' }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* साईराम text */}
        <text 
          x="50%" 
          y="50" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fill="url(#rainbowGrad)" 
          fontSize="72" 
          filter="url(#glow)"
          style={{ 
            fontWeight: 900, 
            fontFamily: "'Tiro Devanagari Marathi', 'Noto Sans Devanagari', serif",
            letterSpacing: '-2px'
          }}
        >
          साईराम
        </text>
        
        {/* Decorative line */}
        <path d="M50 70 Q 130 85, 210 70" stroke="url(#rainbowGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
        
        {/* Animated dot */}
        <circle cx="208" cy="65" r="5" fill="#FFD700">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
      
      {/* महा-ई-सेवा केंद्र */}
      <div style={{ 
        marginTop: '-8px',
        background: 'linear-gradient(135deg, rgba(255,0,128,0.15), rgba(168,85,247,0.15))',
        backdropFilter: 'blur(10px)',
        padding: size === 'sm' ? '10px 24px' : '12px 32px',
        borderRadius: '20px',
        border: '3px solid rgba(255,0,128,0.3)',
        boxShadow: '0 8px 32px rgba(255,0,128,0.3)'
      }}>
        <p style={{ 
          fontSize: size === 'sm' ? '16px' : '20px',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #FF0080, #A855F7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          letterSpacing: '0.5px',
          textAlign: 'center'
        }}>
          {centers[lang]}
        </p>
      </div>
    </div>
  );
};

// ✅ FIX 2: Complete translations
const T = {
  mr: {
    home: 'होम', updates: 'अपडेट्स', contact: 'संपर्क', apply: 'अर्ज करा', close: 'बंद',
    notifications: 'सूचना', farmer: 'शेतकरी योजना', student: 'विद्यार्थी कक्ष', 
    jobs: 'नोकरी अलर्ट', eseva: 'महा-ई-सेवा', id: 'ओळखपत्र', other: 'इतर सेवा',
    start: 'सुरुवात', last: 'शेवटची तारीख', fee: 'शुल्क', docs: 'कागदपत्रे',
    qual: 'पात्रता', age: 'वय', seats: 'जागा', posts: 'पदे', benefit: 'लाभ',
    eligibility: 'पात्रता', dept: 'विभाग', director: 'संचालक', call: 'कॉल करा',
    whatsapp: 'WhatsApp', allServices: 'सर्व शासकीय सेवा एकाच ठिकाणी!',
    explore: 'सेवा पहा', loading: 'लोड होत आहे...', available: 'उपलब्ध',
    applyMsg: 'नमस्कार, मला', formInfo: 'या बद्दल माहिती हवी आहे. कृपया माहिती द्या.'
  },
  en: {
    home: 'Home', updates: 'Updates', contact: 'Contact', apply: 'Apply', close: 'Close',
    notifications: 'Notifications', farmer: 'Farmer', student: 'Student', jobs: 'Jobs',
    eseva: 'e-Services', id: 'ID Cards', other: 'Other', start: 'Start', last: 'Last Date',
    fee: 'Fee', docs: 'Documents', qual: 'Qualification', age: 'Age', seats: 'Seats',
    posts: 'Posts', benefit: 'Benefit', eligibility: 'Eligibility', dept: 'Department',
    director: 'Director', call: 'Call', whatsapp: 'WhatsApp', allServices: 'All Services!',
    explore: 'Explore', loading: 'Loading...', available: 'available',
    applyMsg: 'Hello, I need info about', formInfo: 'Please provide details.'
  },
  hi: {
    home: 'होम', updates: 'अपडेट्स', contact: 'संपर्क', apply: 'आवेदन', close: 'बंद',
    notifications: 'सूचनाएं', farmer: 'किसान', student: 'छात्र', jobs: 'नौकरी',
    eseva: 'ई-सेवाएं', id: 'पहचान पत्र', other: 'अन्य', start: 'शुरुआत', last: 'अंतिम',
    fee: 'शुल्क', docs: 'दस्तावेज', qual: 'योग्यता', age: 'आयु', seats: 'सीटें',
    posts: 'पद', benefit: 'लाभ', eligibility: 'पात्रता', dept: 'विभाग',
    director: 'निदेशक', call: 'कॉल', whatsapp: 'WhatsApp', allServices: 'सभी सेवाएं!',
    explore: 'देखें', loading: 'लोड...', available: 'उपलब्ध',
    applyMsg: 'नमस्ते, मुझे जानकारी चाहिए', formInfo: 'कृपया जानकारी दें।'
  }
};

// ✅ FIX 3: VIBRANT categories
const CAT = {
  mr: [
    { id: 'farmer', label: 'शेतकरी योजना', icon: '🌾', color: '#10b981', bg: '#d1fae5' },
    { id: 'student', label: 'विद्यार्थी कक्ष', icon: '🎓', color: '#3b82f6', bg: '#dbeafe' },
    { id: 'jobs', label: 'नोकरी अलर्ट', icon: '📢', color: '#ef4444', bg: '#fee2e2' },
    { id: 'csc', label: 'महा-ई-सेवा', icon: '🏛️', color: '#8b5cf6', bg: '#ede9fe' },
    { id: 'identity', label: 'ओळखपत्र', icon: '💳', color: '#f59e0b', bg: '#fef3c7' },
    { id: 'printing', label: 'इतर सेवा', icon: '🖨️', color: '#ec4899', bg: '#fce7f3' }
  ],
  en: [
    { id: 'farmer', label: 'Farmer', icon: '🌾', color: '#10b981', bg: '#d1fae5' },
    { id: 'student', label: 'Student', icon: '🎓', color: '#3b82f6', bg: '#dbeafe' },
    { id: 'jobs', label: 'Jobs', icon: '📢', color: '#ef4444', bg: '#fee2e2' },
    { id: 'csc', label: 'e-Services', icon: '🏛️', color: '#8b5cf6', bg: '#ede9fe' },
    { id: 'identity', label: 'ID Cards', icon: '💳', color: '#f59e0b', bg: '#fef3c7' },
    { id: 'printing', label: 'Other', icon: '🖨️', color: '#ec4899', bg: '#fce7f3' }
  ],
  hi: [
    { id: 'farmer', label: 'किसान', icon: '🌾', color: '#10b981', bg: '#d1fae5' },
    { id: 'student', label: 'छात्र', icon: '🎓', color: '#3b82f6', bg: '#dbeafe' },
    { id: 'jobs', label: 'नौकरी', icon: '📢', color: '#ef4444', bg: '#fee2e2' },
    { id: 'csc', label: 'ई-सेवाएं', icon: '🏛️', color: '#8b5cf6', bg: '#ede9fe' },
    { id: 'identity', label: 'पहचान', icon: '💳', color: '#f59e0b', bg: '#fef3c7' },
    { id: 'printing', label: 'अन्य', icon: '🖨️', color: '#ec4899', bg: '#fce7f3' }
  ]
};

function App() {
  const [data, setData] = useState({ 
    services: [], jobs: [], shetkari: [], vidyarthi: [], olakh: [], printing: [], 
    notifications: [], settings: {} 
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [filterCat, setFilterCat] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [lang, setLang] = useState(() => localStorage.getItem('app_language') || 'mr');

  const t = T[lang];
  const categories = CAT[lang];

  useEffect(() => {
    localStorage.setItem('app_language', lang);
  }, [lang]);

  useEffect(() => {
    const load = async () => {
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
        
        setData({
          services: svc.filter(s => s.Active === 'YES'),
          jobs: job.filter(j => j.Active === 'YES'),
          shetkari: shk.filter(s => s.Active === 'YES'),
          vidyarthi: vid.filter(v => v.Active === 'YES'),
          olakh: olk.filter(o => o.Active === 'YES'),
          printing: prt.filter(p => p.Active === 'YES'),
          notifications: ntf.filter(n => n.Active === 'YES'),
          settings: cfg
        });
        
        setTimeout(() => setLoading(false), 500);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    load();
  }, []);

  const getFilteredData = () => {
    switch (filterCat) {
      case 'farmer': return data.shetkari;
      case 'student': return data.vidyarthi;
      case 'jobs': return data.jobs;
      case 'identity': return data.olakh;
      case 'printing': return data.printing;
      case 'csc': return data.services;
      default: return [];
    }
  };

  const filtered = getFilteredData();

  const getWhatsAppLink = (item) => {
    const itemName = item.Service_Name || item.Job_Name || item.Yojana_Name || item.Scheme_Name || item.Card_Name || '';
    const message = `${t.applyMsg} "${itemName}" ${t.formInfo}`;
    return `https://wa.me/919011083440?text=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FF0080 0%, #FF6B00 50%, #A855F7 100%)'
      }}>
        <Logo size="lg" lang={lang} />
        <p style={{ color: 'white', marginTop: '24px', fontSize: '18px', fontWeight: 'bold' }}>{t.loading}</p>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fef3c7, #ffffff)',
      paddingBottom: '90px'
    }}>
      {/* ✅ FIX 4: Header WITHOUT back button - mobile चा back button काम करेल */}
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        padding: '12px 16px',
        borderBottom: '2px solid',
        borderImage: 'linear-gradient(90deg, #FF0080, #FF6B00, #A855F7) 1',
        boxShadow: '0 4px 20px rgba(255,0,128,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          {/* Language button */}
          <button 
            onClick={() => setLang(lang === 'mr' ? 'en' : lang === 'en' ? 'hi' : 'mr')} 
            style={{ 
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #1e293b, #334155)',
              color: 'white',
              borderRadius: '12px',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            🌐
          </button>
          
          {/* Logo */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Logo size="sm" lang={lang} />
          </div>
          
          {/* Notifications */}
          <button 
            onClick={() => setShowNotifModal(true)} 
            style={{ 
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #FF0080, #A855F7)',
              color: 'white',
              borderRadius: '12px',
              border: 'none',
              fontSize: '22px',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: '0 4px 12px rgba(255,0,128,0.3)'
            }}
          >
            🔔
            {data.notifications.length > 0 && (
              <div style={{ 
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '10px',
                height: '10px',
                background: '#FFD700',
                borderRadius: '50%',
                border: '2px solid white'
              }} />
            )}
          </button>
        </div>
      </header>

      <main style={{ padding: '16px' }}>
        {/* Home */}
        {activeTab === 'home' && !filterCat && (
          <>
            {/* Hero with vibrant colors */}
            <section style={{ 
              background: 'linear-gradient(135deg, #FF0080 0%, #FF6B00 50%, #A855F7 100%)',
              borderRadius: '24px',
              padding: '40px 24px',
              color: 'white',
              marginBottom: '20px',
              boxShadow: '0 16px 40px rgba(255,0,128,0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '50px', marginBottom: '16px' }}>🏛️</div>
                <h2 style={{ fontSize: '26px', fontWeight: 900, marginBottom: '12px', textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                  {t.allServices}
                </h2>
                <button 
                  onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })} 
                  style={{ 
                    background: 'white',
                    color: '#FF0080',
                    padding: '14px 32px',
                    borderRadius: '14px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                  }}
                >
                  {t.explore} →
                </button>
              </div>
            </section>

            {/* Categories - Vibrant colors */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setFilterCat(cat.id)}
                  style={{ 
                    background: cat.bg,
                    borderRadius: '20px',
                    padding: '24px 16px',
                    border: `3px solid ${cat.color}40`,
                    cursor: 'pointer',
                    textAlign: 'center',
                    boxShadow: `0 8px 20px ${cat.color}30`
                  }}
                >
                  <div style={{ fontSize: '44px', marginBottom: '8px' }}>{cat.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: cat.color, marginBottom: '6px' }}>
                    {cat.label}
                  </div>
                  <div style={{ 
                    display: 'inline-block',
                    background: cat.color,
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {cat.id === 'farmer' && data.shetkari.length}
                    {cat.id === 'student' && data.vidyarthi.length}
                    {cat.id === 'jobs' && data.jobs.length}
                    {cat.id === 'csc' && data.services.length}
                    {cat.id === 'identity' && data.olakh.length}
                    {cat.id === 'printing' && data.printing.length}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Category listing */}
        {activeTab === 'home' && filterCat && (
          <div>
            <div style={{ 
              background: categories.find(c => c.id === filterCat)?.bg,
              padding: '16px',
              borderRadius: '16px',
              marginBottom: '16px',
              border: `3px solid ${categories.find(c => c.id === filterCat)?.color}40`
            }}>
              <h2 style={{ 
                fontSize: '22px',
                fontWeight: 'bold',
                color: categories.find(c => c.id === filterCat)?.color,
                margin: 0
              }}>
                {categories.find(c => c.id === filterCat)?.icon} {categories.find(c => c.id === filterCat)?.label}
              </h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.map((item, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedItem({ ...item, type: filterCat })}
                  style={{ 
                    width: '100%',
                    background: 'white',
                    padding: '18px',
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    border: `3px solid ${categories.find(c => c.id === filterCat)?.color}20`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: `0 4px 16px ${categories.find(c => c.id === filterCat)?.color}20`
                  }}
                >
                  <div style={{ 
                    fontSize: '40px',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: categories.find(c => c.id === filterCat)?.bg,
                    borderRadius: '14px'
                  }}>
                    {item.Icon || '📄'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#1a202c',
                      marginBottom: '4px'
                    }}>
                      {item.Service_Name || item.Yojana_Name || item.Scheme_Name || item.Job_Name || item.Card_Name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                      {item.Description || item.Benefit || item.Department || ''}
                    </p>
                  </div>
                  <div style={{ fontSize: '20px', color: categories.find(c => c.id === filterCat)?.color }}>→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Updates */}
        {activeTab === 'updates' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1a202c' }}>
              📢 {t.updates}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[...data.jobs, ...data.shetkari, ...data.vidyarthi].slice(0, 15).map((item, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedItem(item)}
                  style={{ 
                    background: 'white',
                    borderRadius: '16px',
                    padding: '18px',
                    border: '2px solid #e2e8f0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
                    {item.Job_Name || item.Yojana_Name || item.Scheme_Name}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>
                    {item.Department || item.Benefit || ''}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contact */}
        {activeTab === 'contact' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '24px' }}>
              <Logo size="lg" lang={lang} />
            </div>
            
            <div style={{ 
              background: 'white',
              borderRadius: '24px',
              padding: '32px 24px',
              boxShadow: '0 8px 32px rgba(255,0,128,0.15)'
            }}>
              <div style={{ 
                width: '90px',
                height: '90px',
                background: 'linear-gradient(135deg, #FF0080, #A855F7)',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '44px'
              }}>
                👤
              </div>
              
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
                राहुल मिसे
              </p>
              <p style={{ fontSize: '11px', color: '#FF0080', fontWeight: 'bold', marginBottom: '20px' }}>
                {t.director}
              </p>
              
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c', marginBottom: '6px' }}>
                  📞 9011083440
                </p>
                <p style={{ fontSize: '13px', color: '#64748b' }}>
                  📧 sairamcomputer440@gmail.com
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a 
                  href="tel:9011083440"
                  style={{ 
                    background: 'linear-gradient(135deg, #FF0080, #FF6B00)',
                    color: 'white',
                    padding: '16px',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    boxShadow: '0 6px 20px rgba(255,0,128,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: '22px' }}>📞</span>
                  <span>{t.call}</span>
                </a>
                
                <a 
                  href="https://wa.me/919011083440?text=नमस्कार%20साईराम%20महा-ई-सेवा%20केंद्र"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    background: 'linear-gradient(135deg, #25d366, #128c7e)',
                    color: 'white',
                    padding: '16px',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 20px rgba(37,211,102,0.3)'
                  }}
                >
                  <span style={{ fontSize: '22px' }}>💬</span>
                  <span>{t.whatsapp}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ✅ FIX 5: Bottom nav - Vibrant colors */}
      <nav style={{ 
        position: 'fixed',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(135deg, #FF0080, #FF6B00, #A855F7)',
        borderRadius: '24px',
        padding: '6px 10px',
        display: 'flex',
        gap: '6px',
        boxShadow: '0 8px 32px rgba(255,0,128,0.5)',
        zIndex: 150,
        width: 'calc(100% - 32px)',
        maxWidth: '400px'
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
            }}
            style={{ 
              flex: 1,
              padding: '10px',
              background: activeTab === item.id ? 'rgba(255,255,255,0.95)' : 'transparent',
              color: activeTab === item.id ? '#FF0080' : 'white',
              border: 'none',
              borderRadius: '18px',
              cursor: 'pointer',
              fontSize: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              boxShadow: activeTab === item.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            <span>{item.icon}</span>
            {activeTab === item.id && (
              <span style={{ fontSize: '8px', fontWeight: 'bold' }}>{item.label}</span>
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
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              background: 'white',
              borderRadius: '24px',
              maxWidth: '400px',
              width: '100%',
              padding: '28px 24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a202c', margin: 0 }}>
                🔔 {t.notifications}
              </h2>
              <button 
                onClick={() => setShowNotifModal(false)}
                style={{ 
                  background: '#f8fafc',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>
            
            {data.notifications.map((n, i) => (
              <div 
                key={i}
                style={{ 
                  padding: '16px',
                  background: '#f8fafc',
                  borderRadius: '14px',
                  marginBottom: '12px'
                }}
              >
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '6px' }}>{n.Title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b' }}>{n.Message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ FIX 6: Detail modal with proper WhatsApp/Call links */}
      {selectedItem && (
        <div 
          onClick={() => setSelectedItem(null)}
          style={{ 
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'center',
            zIndex: 200
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              background: 'white',
              borderRadius: '28px 28px 0 0',
              width: '100%',
              maxWidth: '480px',
              padding: '28px 20px 36px',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
                  {selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || selectedItem.Scheme_Name || selectedItem.Card_Name}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                style={{ 
                  background: '#f8fafc',
                  border: 'none',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>

            {/* Details */}
            <div style={{ marginBottom: '20px' }}>
              {selectedItem.Start_Date && (
                <div style={{ padding: '12px', background: '#eff6ff', borderRadius: '12px', marginBottom: '10px' }}>
                  <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '4px' }}>{t.start}</p>
                  <p style={{ fontSize: '14px', color: '#1a202c', fontWeight: 'bold', margin: 0 }}>📅 {selectedItem.Start_Date}</p>
                </div>
              )}
              
              {selectedItem.Last_Date && (
                <div style={{ padding: '12px', background: '#fef2f2', borderRadius: '12px', marginBottom: '10px' }}>
                  <p style={{ fontSize: '10px', color: '#dc2626', fontWeight: 'bold', marginBottom: '4px' }}>{t.last}</p>
                  <p style={{ fontSize: '14px', color: '#1a202c', fontWeight: 'bold', margin: 0 }}>⏰ {selectedItem.Last_Date}</p>
                </div>
              )}
              
              {selectedItem.Fee && (
                <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '12px', marginBottom: '10px' }}>
                  <p style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold', marginBottom: '4px' }}>{t.fee}</p>
                  <p style={{ fontSize: '14px', color: '#1a202c', fontWeight: 'bold', margin: 0 }}>💰 {selectedItem.Fee}</p>
                </div>
              )}
              
              {(selectedItem.Documents || selectedItem.Documents_Required) && (
                <div style={{ padding: '14px', background: '#fef3c7', borderRadius: '12px', marginBottom: '10px' }}>
                  <p style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '6px' }}>📄 {t.docs}</p>
                  <p style={{ fontSize: '13px', color: '#1a202c', lineHeight: '1.5', margin: 0 }}>
                    {selectedItem.Documents || selectedItem.Documents_Required}
                  </p>
                </div>
              )}
              
              {(selectedItem.Description || selectedItem.Benefit) && (
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', padding: '12px', background: '#f8fafc', borderRadius: '12px', margin: 0 }}>
                  {selectedItem.Description || selectedItem.Benefit}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a 
                href={getWhatsAppLink(selectedItem)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  width: '100%',
                  background: 'linear-gradient(135deg, #25d366, #128c7e)',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(37,211,102,0.4)'
                }}
              >
                <span style={{ fontSize: '22px' }}>💬</span>
                <span>{t.whatsapp}</span>
              </a>
              
              <a 
                href="tel:9011083440"
                style={{ 
                  width: '100%',
                  background: 'linear-gradient(135deg, #FF0080, #FF6B00)',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(255,0,128,0.4)'
                }}
              >
                <span style={{ fontSize: '22px' }}>📞</span>
                <span>{t.call}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
