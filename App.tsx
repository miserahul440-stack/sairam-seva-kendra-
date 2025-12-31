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

// ✅ FIX 1: साईराम Logo - Clean, Simple, Visible
const Logo = ({ size = 'md', lang }) => {
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
      padding: size === 'lg' ? '20px' : '10px'
    }}>
      {/* साईराम - Simple, clear, visible */}
      <div style={{
        fontSize: size === 'lg' ? '48px' : size === 'sm' ? '28px' : '36px',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontFamily: "'Tiro Devanagari Marathi', 'Noto Sans Devanagari', serif",
        textShadow: '0 2px 10px rgba(255,107,53,0.3)',
        marginBottom: '8px',
        letterSpacing: '-1px'
      }}>
        साईराम
      </div>
      
      {/* महा-ई-सेवा केंद्र - Clear subtitle */}
      <div style={{
        fontSize: size === 'lg' ? '18px' : size === 'sm' ? '13px' : '16px',
        fontWeight: 700,
        color: '#FF6B35',
        background: 'white',
        padding: size === 'sm' ? '6px 16px' : '8px 20px',
        borderRadius: '20px',
        border: '2px solid #FF6B35',
        boxShadow: '0 2px 8px rgba(255,107,53,0.2)'
      }}>
        {centers[lang]}
      </div>
    </div>
  );
};

// ✅ FIX 2: Translations
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

// ✅ FIX 3: Professional SOFT colors - सगळे match होतात
const CAT = {
  mr: [
    { id: 'farmer', label: 'शेतकरी योजना', icon: '🌾', color: '#10B981', bg: '#ECFDF5', shadow: 'rgba(16,185,129,0.2)' },
    { id: 'student', label: 'विद्यार्थी कक्ष', icon: '🎓', color: '#3B82F6', bg: '#EFF6FF', shadow: 'rgba(59,130,246,0.2)' },
    { id: 'jobs', label: 'नोकरी अलर्ट', icon: '📢', color: '#EF4444', bg: '#FEF2F2', shadow: 'rgba(239,68,68,0.2)' },
    { id: 'csc', label: 'महा-ई-सेवा', icon: '🏛️', color: '#8B5CF6', bg: '#F5F3FF', shadow: 'rgba(139,92,246,0.2)' },
    { id: 'identity', label: 'ओळखपत्र', icon: '💳', color: '#F59E0B', bg: '#FFFBEB', shadow: 'rgba(245,158,11,0.2)' },
    { id: 'printing', label: 'इतर सेवा', icon: '🖨️', color: '#EC4899', bg: '#FDF2F8', shadow: 'rgba(236,72,153,0.2)' }
  ],
  en: [
    { id: 'farmer', label: 'Farmer', icon: '🌾', color: '#10B981', bg: '#ECFDF5', shadow: 'rgba(16,185,129,0.2)' },
    { id: 'student', label: 'Student', icon: '🎓', color: '#3B82F6', bg: '#EFF6FF', shadow: 'rgba(59,130,246,0.2)' },
    { id: 'jobs', label: 'Jobs', icon: '📢', color: '#EF4444', bg: '#FEF2F2', shadow: 'rgba(239,68,68,0.2)' },
    { id: 'csc', label: 'e-Services', icon: '🏛️', color: '#8B5CF6', bg: '#F5F3FF', shadow: 'rgba(139,92,246,0.2)' },
    { id: 'identity', label: 'ID Cards', icon: '💳', color: '#F59E0B', bg: '#FFFBEB', shadow: 'rgba(245,158,11,0.2)' },
    { id: 'printing', label: 'Other', icon: '🖨️', color: '#EC4899', bg: '#FDF2F8', shadow: 'rgba(236,72,153,0.2)' }
  ],
  hi: [
    { id: 'farmer', label: 'किसान', icon: '🌾', color: '#10B981', bg: '#ECFDF5', shadow: 'rgba(16,185,129,0.2)' },
    { id: 'student', label: 'छात्र', icon: '🎓', color: '#3B82F6', bg: '#EFF6FF', shadow: 'rgba(59,130,246,0.2)' },
    { id: 'jobs', label: 'नौकरी', icon: '📢', color: '#EF4444', bg: '#FEF2F2', shadow: 'rgba(239,68,68,0.2)' },
    { id: 'csc', label: 'ई-सेवाएं', icon: '🏛️', color: '#8B5CF6', bg: '#F5F3FF', shadow: 'rgba(139,92,246,0.2)' },
    { id: 'identity', label: 'पहचान', icon: '💳', color: '#F59E0B', bg: '#FFFBEB', shadow: 'rgba(245,158,11,0.2)' },
    { id: 'printing', label: 'अन्य', icon: '🖨️', color: '#EC4899', bg: '#FDF2F8', shadow: 'rgba(236,72,153,0.2)' }
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
        
        setTimeout(() => setLoading(false), 400);
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
        background: 'linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 100%)'
      }}>
        <Logo size="lg" lang={lang} />
        <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ 
              width: '10px', 
              height: '10px', 
              background: '#FF6B35', 
              borderRadius: '50%',
              animation: `bounce 1s infinite ${i * 0.15}s`
            }} />
          ))}
        </div>
        <p style={{ color: '#FF6B35', marginTop: '16px', fontSize: '16px', fontWeight: 600 }}>{t.loading}</p>
        <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #FFF7ED, #FFFFFF)',
      paddingBottom: '80px'
    }}>
      {/* ✅ Header - Clean design */}
      <header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(20px)',
        padding: '12px 16px',
        borderBottom: '1px solid #FED7AA',
        boxShadow: '0 2px 12px rgba(255,107,53,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <button 
            onClick={() => setLang(lang === 'mr' ? 'en' : lang === 'en' ? 'hi' : 'mr')} 
            style={{ 
              width: '40px',
              height: '40px',
              background: 'white',
              color: '#FF6B35',
              borderRadius: '10px',
              border: '2px solid #FED7AA',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(255,107,53,0.1)'
            }}
          >
            🌐
          </button>
          
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Logo size="sm" lang={lang} />
          </div>
          
          <button 
            onClick={() => setShowNotifModal(true)} 
            style={{ 
              width: '40px',
              height: '40px',
              background: '#FF6B35',
              color: 'white',
              borderRadius: '10px',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: '0 2px 8px rgba(255,107,53,0.3)'
            }}
          >
            🔔
            {data.notifications.length > 0 && (
              <div style={{ 
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                background: '#22C55E',
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
            {/* Hero - Professional orange gradient */}
            <section style={{ 
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              borderRadius: '20px',
              padding: '32px 24px',
              color: 'white',
              marginBottom: '20px',
              boxShadow: '0 8px 24px rgba(255,107,53,0.3)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '44px', marginBottom: '12px' }}>🏛️</div>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: 800, 
                marginBottom: '12px',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}>
                {t.allServices}
              </h2>
              <button 
                onClick={() => window.scrollTo({ top: 280, behavior: 'smooth' })} 
                style={{ 
                  background: 'white',
                  color: '#FF6B35',
                  padding: '12px 28px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  marginTop: '8px'
                }}
              >
                {t.explore} →
              </button>
            </section>

            {/* Categories - Professional colors */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setFilterCat(cat.id)}
                  style={{ 
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px 14px',
                    border: `2px solid ${cat.color}20`,
                    cursor: 'pointer',
                    textAlign: 'center',
                    boxShadow: `0 4px 12px ${cat.shadow}`,
                    transition: 'transform 0.2s'
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ 
                    width: '56px',
                    height: '56px',
                    background: cat.bg,
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    margin: '0 auto 10px'
                  }}>
                    {cat.icon}
                  </div>
                  <div style={{ 
                    fontSize: '13px',
                    fontWeight: 700,
                    color: cat.color,
                    marginBottom: '6px'
                  }}>
                    {cat.label}
                  </div>
                  <div style={{ 
                    display: 'inline-block',
                    background: cat.color,
                    color: 'white',
                    padding: '3px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 600
                  }}>
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

        {/* Category listing */}
        {activeTab === 'home' && filterCat && (
          <div>
            <div style={{ 
              background: categories.find(c => c.id === filterCat)?.bg,
              padding: '14px 16px',
              borderRadius: '14px',
              marginBottom: '16px',
              border: `2px solid ${categories.find(c => c.id === filterCat)?.color}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{ 
                fontSize: '20px',
                fontWeight: 700,
                color: categories.find(c => c.id === filterCat)?.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '28px' }}>{categories.find(c => c.id === filterCat)?.icon}</span>
                <span>{categories.find(c => c.id === filterCat)?.label}</span>
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
                    padding: '16px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    border: `2px solid ${categories.find(c => c.id === filterCat)?.color}15`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: `0 2px 12px ${categories.find(c => c.id === filterCat)?.shadow}`
                  }}
                >
                  <div style={{ 
                    fontSize: '36px',
                    width: '56px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: categories.find(c => c.id === filterCat)?.bg,
                    borderRadius: '12px',
                    flexShrink: 0
                  }}>
                    {item.Icon || '📄'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#1F2937',
                      marginBottom: '4px'
                    }}>
                      {item.Service_Name || item.Yojana_Name || item.Scheme_Name || item.Job_Name || item.Card_Name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                      {item.Description || item.Benefit || item.Department || ''}
                    </p>
                  </div>
                  <div style={{ fontSize: '18px', color: categories.find(c => c.id === filterCat)?.color }}>→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Updates */}
        {activeTab === 'updates' && (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', color: '#1F2937' }}>
              📢 {t.updates}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[...data.jobs, ...data.shetkari, ...data.vidyarthi].slice(0, 15).map((item, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedItem(item)}
                  style={{ 
                    background: 'white',
                    borderRadius: '14px',
                    padding: '16px',
                    border: '2px solid #F3F4F6',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                  }}
                >
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', marginBottom: '6px' }}>
                    {item.Job_Name || item.Yojana_Name || item.Scheme_Name}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                    {item.Department || item.Benefit || ''}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ✅ FIX 4: Contact - तुमचा photo येथे */}
        {activeTab === 'contact' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '20px' }}>
              <Logo size="lg" lang={lang} />
            </div>
            
            <div style={{ 
              background: 'white',
              borderRadius: '20px',
              padding: '28px 20px',
              boxShadow: '0 4px 20px rgba(255,107,53,0.15)',
              border: '2px solid #FED7AA'
            }}>
              {/* ✅ तुमचा photo येथे add करा */}
              <div style={{ 
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
                borderRadius: '50%',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(255,107,53,0.3)',
                border: '4px solid white',
                overflow: 'hidden'
              }}>
                {/* 
                  ✅ येथे तुमचा photo add करा:
                  <img src="your-photo.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" />
                  
                  Photo नसेल तर emoji दिसेल:
                */}
                <span style={{ fontSize: '48px' }}>👤</span>
              </div>
              
              <p style={{ fontSize: '26px', fontWeight: 800, color: '#1F2937', marginBottom: '6px' }}>
                राहुल मिसे
              </p>
              <p style={{ fontSize: '12px', color: '#FF6B35', fontWeight: 600, marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {t.director}
              </p>
              
              <div style={{ marginBottom: '20px', padding: '16px', background: '#FFF7ED', borderRadius: '12px' }}>
                <p style={{ fontSize: '17px', fontWeight: 700, color: '#1F2937', marginBottom: '6px' }}>
                  📞 9011083440
                </p>
                <p style={{ fontSize: '13px', color: '#6B7280' }}>
                  📧 sairamcomputer440@gmail.com
                </p>
              </div>
              
              {/* ✅ FIX 5: Working WhatsApp & Call buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a 
                  href="tel:9011083440"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'tel:9011083440';
                  }}
                  style={{ 
                    background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
                    color: 'white',
                    padding: '14px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 700,
                    boxShadow: '0 4px 16px rgba(255,107,53,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>📞</span>
                  <span>{t.call}</span>
                </a>
                
                <a 
                  href="https://wa.me/919011083440?text=नमस्कार%20साईराम%20महा-ई-सेवा%20केंद्र"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://wa.me/919011083440?text=नमस्कार%20साईराम%20महा-ई-सेवा%20केंद्र', '_blank');
                  }}
                  style={{ 
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    color: 'white',
                    padding: '14px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 16px rgba(37,211,102,0.3)'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>💬</span>
                  <span>{t.whatsapp}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ✅ Bottom nav - Professional */}
      <nav style={{ 
        position: 'fixed',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'white',
        borderRadius: '20px',
        padding: '6px 8px',
        display: 'flex',
        gap: '6px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        zIndex: 150,
        width: 'calc(100% - 32px)',
        maxWidth: '380px',
        border: '2px solid #FED7AA'
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
              background: activeTab === item.id ? '#FF6B35' : 'transparent',
              color: activeTab === item.id ? 'white' : '#9CA3AF',
              border: 'none',
              borderRadius: '14px',
              cursor: 'pointer',
              fontSize: '22px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              transition: 'all 0.2s'
            }}
          >
            <span>{item.icon}</span>
            {activeTab === item.id && (
              <span style={{ fontSize: '8px', fontWeight: 700 }}>{item.label}</span>
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
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
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
              borderRadius: '20px',
              maxWidth: '380px',
              width: '100%',
              padding: '24px 20px',
              maxHeight: '70vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1F2937', margin: 0 }}>
                🔔 {t.notifications}
              </h2>
              <button 
                onClick={() => setShowNotifModal(false)}
                style={{ 
                  background: '#F3F4F6',
                  border: 'none',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#6B7280'
                }}
              >
                ✕
              </button>
            </div>
            
            {data.notifications.map((n, i) => (
              <div 
                key={i}
                style={{ 
                  padding: '14px',
                  background: '#F9FAFB',
                  borderRadius: '12px',
                  marginBottom: '10px',
                  border: '1px solid #E5E7EB'
                }}
              >
                <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px', color: '#1F2937' }}>{n.Title}</h3>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{n.Message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Detail modal */}
      {selectedItem && (
        <div 
          onClick={() => setSelectedItem(null)}
          style={{ 
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
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
              borderRadius: '24px 24px 0 0',
              width: '100%',
              maxWidth: '480px',
              padding: '24px 18px 32px',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1F2937', flex: 1, margin: 0 }}>
                {selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || selectedItem.Scheme_Name || selectedItem.Card_Name}
              </h2>
              <button 
                onClick={() => setSelectedItem(null)}
                style={{ 
                  background: '#F3F4F6',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '14px',
                  flexShrink: 0
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '18px' }}>
              {selectedItem.Start_Date && (
                <div style={{ padding: '12px', background: '#EFF6FF', borderRadius: '10px', marginBottom: '8px' }}>
                  <p style={{ fontSize: '10px', color: '#3B82F6', fontWeight: 600, marginBottom: '3px' }}>{t.start}</p>
                  <p style={{ fontSize: '13px', color: '#1F2937', fontWeight: 600, margin: 0 }}>📅 {selectedItem.Start_Date}</p>
                </div>
              )}
              
              {selectedItem.Last_Date && (
                <div style={{ padding: '12px', background: '#FEF2F2', borderRadius: '10px', marginBottom: '8px' }}>
                  <p style={{ fontSize: '10px', color: '#EF4444', fontWeight: 600, marginBottom: '3px' }}>{t.last}</p>
                  <p style={{ fontSize: '13px', color: '#1F2937', fontWeight: 600, margin: 0 }}>⏰ {selectedItem.Last_Date}</p>
                </div>
              )}
              
              {selectedItem.Fee && (
                <div style={{ padding: '12px', background: '#F0FDF4', borderRadius: '10px', marginBottom: '8px' }}>
                  <p style={{ fontSize: '10px', color: '#10B981', fontWeight: 600, marginBottom: '3px' }}>{t.fee}</p>
                  <p style={{ fontSize: '13px', color: '#1F2937', fontWeight: 600, margin: 0 }}>💰 {selectedItem.Fee}</p>
                </div>
              )}
              
              {(selectedItem.Documents || selectedItem.Documents_Required) && (
                <div style={{ padding: '12px', background: '#FFFBEB', borderRadius: '10px', marginBottom: '8px' }}>
                  <p style={{ fontSize: '10px', color: '#F59E0B', fontWeight: 600, marginBottom: '6px' }}>📄 {t.docs}</p>
                  <p style={{ fontSize: '12px', color: '#1F2937', lineHeight: '1.5', margin: 0 }}>
                    {selectedItem.Documents || selectedItem.Documents_Required}
                  </p>
                </div>
              )}
              
              {(selectedItem.Description || selectedItem.Benefit) && (
                <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: '1.6', padding: '12px', background: '#F9FAFB', borderRadius: '10px', margin: 0 }}>
                  {selectedItem.Description || selectedItem.Benefit}
                </p>
              )}
            </div>

            {/* ✅ Working buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a 
                href={getWhatsAppLink(selectedItem)}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(getWhatsAppLink(selectedItem), '_blank');
                }}
                style={{ 
                  width: '100%',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  color: 'white',
                  padding: '14px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(37,211,102,0.3)'
                }}
              >
                <span style={{ fontSize: '20px' }}>💬</span>
                <span>{t.whatsapp}</span>
              </a>
              
              <a 
                href="tel:9011083440"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'tel:9011083440';
                }}
                style={{ 
                  width: '100%',
                  background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
                  color: 'white',
                  padding: '14px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(255,107,53,0.3)'
                }}
              >
                <span style={{ fontSize: '20px' }}>📞</span>
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
