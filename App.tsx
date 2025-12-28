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

const Logo = ({ size = 'md', lang, showSubtitle = true }) => {
  const scale = size === 'sm' ? 0.4 : size === 'lg' ? 1.2 : 0.8;
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${scale})` }}>
      <svg width="280" height="100" viewBox="0 0 280 100" style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))' }}>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#c084fc' }} />
            <stop offset="30%" style={{ stopColor: '#ec4899' }} />
            <stop offset="60%" style={{ stopColor: '#f97316' }} />
            <stop offset="100%" style={{ stopColor: '#fbbf24' }} />
          </linearGradient>
        </defs>
        <text x="50%" y="50" dominantBaseline="middle" textAnchor="middle" fill="url(#grad)" fontSize="75" style={{ fontWeight: 900, fontFamily: "'Tiro Devanagari Marathi', serif", letterSpacing: '-2px' }}>साईराम</text>
        <path d="M60 65 Q 140 85, 220 65" stroke="url(#grad)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="217" cy="60" r="5" fill="#fbbf24" />
      </svg>
      {showSubtitle && size !== 'sm' && (
        <div style={{ marginTop: '-8px', background: 'rgba(49,46,129,0.3)', backdropFilter: 'blur(20px)', padding: '5px 28px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', color: 'white' }}>{taglines[lang]}</span>
        </div>
      )}
      {size === 'sm' && (
        <p style={{ fontSize: '9px', color: '#64748b', fontWeight: 'bold', margin: '2px 0 0 0', textAlign: 'center' }}>{centers[lang]}</p>
      )}
    </div>
  );
};

const T = {
  mr: {
    home: 'होम', updates: 'अपडेट्स', contact: 'संपर्क', back: 'मागे', apply: 'अर्ज करा', close: 'बंद', notifications: 'सूचना',
    farmer: 'शेतकरी योजना', student: 'विद्यार्थी कक्ष', jobs: 'नोकरी अलर्ट', eseva: 'महा-ई-सेवा', id: 'ओळखपत्र', other: 'इतर सेवा',
    start: 'सुरुवात तारीख', last: 'शेवटची तारीख', fee: 'शुल्क', docs: 'आवश्यक कागदपत्रे', qual: 'शैक्षणिक पात्रता', age: 'वय मर्यादा',
    seats: 'एकूण जागा', posts: 'पदे', benefit: 'लाभ', eligibility: 'पात्रता', dept: 'विभाग',
    director: 'संचालक', call: 'कॉल करा', whatsapp: 'WhatsApp संदेश', ourService: 'आमची सेवा', yourTrust: 'तुमचा विश्वास',
    allServices: 'सर्व शासकीय सेवा एकाच ठिकाणी!', explore: 'सेवा पहा', center: 'महा-ई-सेवा केंद्र', loading: 'लोड होत आहे...',
    available: 'उपलब्ध'
  },
  en: {
    home: 'Home', updates: 'Updates', contact: 'Contact', back: 'Back', apply: 'Apply Now', close: 'Close', notifications: 'Notifications',
    farmer: 'Farmer Schemes', student: 'Student Portal', jobs: 'Job Alerts', eseva: 'e-Services', id: 'ID Cards', other: 'Other Services',
    start: 'Start Date', last: 'Last Date', fee: 'Fee', docs: 'Required Documents', qual: 'Qualification', age: 'Age Limit',
    seats: 'Total Seats', posts: 'Posts', benefit: 'Benefit', eligibility: 'Eligibility', dept: 'Department',
    director: 'Director', call: 'Call Now', whatsapp: 'WhatsApp Message', ourService: 'Our Service', yourTrust: 'Your Trust',
    allServices: 'All Government Services in One Place!', explore: 'Explore', center: 'Maha e-Seva Center', loading: 'Loading...',
    available: 'available'
  },
  hi: {
    home: 'होम', updates: 'अपडेट्स', contact: 'संपर्क', back: 'वापस', apply: 'आवेदन करें', close: 'बंद', notifications: 'सूचनाएं',
    farmer: 'किसान योजना', student: 'छात्र पोर्टल', jobs: 'नौकरी अलर्ट', eseva: 'ई-सेवाएं', id: 'पहचान पत्र', other: 'अन्य सेवाएं',
    start: 'शुरुआत तिथि', last: 'अंतिम तिथि', fee: 'शुल्क', docs: 'आवश्यक दस्तावेज', qual: 'योग्यता', age: 'आयु सीमा',
    seats: 'कुल सीटें', posts: 'पद', benefit: 'लाभ', eligibility: 'पात्रता', dept: 'विभाग',
    director: 'निदेशक', call: 'कॉल करें', whatsapp: 'WhatsApp संदेश', ourService: 'हमारी सेवा', yourTrust: 'आपका विश्वास',
    allServices: 'सभी सरकारी सेवाएं एक जगह!', explore: 'देखें', center: 'महा ई-सेवा केंद्र', loading: 'लोड हो रहा...',
    available: 'उपलब्ध'
  }
};

const CAT = {
  mr: [
    { id: 'farmer', label: 'शेतकरी योजना', icon: '🌾' },
    { id: 'student', label: 'विद्यार्थी कक्ष', icon: '🎓' },
    { id: 'jobs', label: 'नोकरी अलर्ट', icon: '📢' },
    { id: 'csc', label: 'महा-ई-सेवा', icon: '🏛️' },
    { id: 'identity', label: 'ओळखपत्र', icon: '💳' },
    { id: 'printing', label: 'इतर सेवा', icon: '🖨️' }
  ],
  en: [
    { id: 'farmer', label: 'Farmer Schemes', icon: '🌾' },
    { id: 'student', label: 'Student Portal', icon: '🎓' },
    { id: 'jobs', label: 'Job Alerts', icon: '📢' },
    { id: 'csc', label: 'e-Services', icon: '🏛️' },
    { id: 'identity', label: 'ID Cards', icon: '💳' },
    { id: 'printing', label: 'Other Services', icon: '🖨️' }
  ],
  hi: [
    { id: 'farmer', label: 'किसान योजना', icon: '🌾' },
    { id: 'student', label: 'छात्र पोर्टल', icon: '🎓' },
    { id: 'jobs', label: 'नौकरी अलर्ट', icon: '📢' },
    { id: 'csc', label: 'ई-सेवाएं', icon: '🏛️' },
    { id: 'identity', label: 'पहचान पत्र', icon: '💳' },
    { id: 'printing', label: 'अन्य सेवाएं', icon: '🖨️' }
  ]
};

const NOTIF_CAT = {
  mr: [
    { id: 'farmer', label: 'शेतकरी योजना', icon: '🌾', color: '#10b981' },
    { id: 'student', label: 'विद्यार्थी कक्ष', icon: '🎓', color: '#3b82f6' },
    { id: 'jobs', label: 'नोकरी अलर्ट', icon: '📢', color: '#ef4444' },
    { id: 'eseva', label: 'महा-ई-सेवा', icon: '🏛️', color: '#8b5cf6' }
  ],
  en: [
    { id: 'farmer', label: 'Farmer Schemes', icon: '🌾', color: '#10b981' },
    { id: 'student', label: 'Student Portal', icon: '🎓', color: '#3b82f6' },
    { id: 'jobs', label: 'Job Alerts', icon: '📢', color: '#ef4444' },
    { id: 'eseva', label: 'e-Services', icon: '🏛️', color: '#8b5cf6' }
  ],
  hi: [
    { id: 'farmer', label: 'किसान योजना', icon: '🌾', color: '#10b981' },
    { id: 'student', label: 'छात्र पोर्टल', icon: '🎓', color: '#3b82f6' },
    { id: 'jobs', label: 'नौकरी अलर्ट', icon: '📢', color: '#ef4444' },
    { id: 'eseva', label: 'ई-सेवाएं', icon: '🏛️', color: '#8b5cf6' }
  ]
};

function App() {
  const [data, setData] = useState({ services: [], jobs: [], shetkari: [], vidyarthi: [], olakh: [], printing: [], notifications: [], settings: {} });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [filterCat, setFilterCat] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNotif, setShowNotif] = useState(true);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [lang, setLang] = useState('mr');
  const [notifToggles, setNotifToggles] = useState({ farmer: true, student: true, jobs: true, eseva: true });

  const t = T[lang];
  const categories = CAT[lang];
  const notifCat = NOTIF_CAT[lang];

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
        setTimeout(() => setLoading(false), 800);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    load();
  }, []);

  const activeNotif = data.notifications.find(n => {
    const now = new Date();
    const start = new Date(n.Start_Date);
    const end = new Date(n.End_Date);
    return now >= start && now <= end;
  });

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

  const handleCall = () => {
    try {
      window.location.href = 'tel:9011083440';
    } catch (e) {
      alert('कृपया 9011083440 वर कॉल करा');
    }
  };

  const handleWhatsApp = (itemName = '') => {
    try {
      const text = itemName ? `नमस्कार साईराम महा-ई-सेवा केंद्र, मला "${itemName}" या बद्दल माहिती हवी आहे.` : 'नमस्कार साईराम महा-ई-सेवा केंद्र';
      window.location.href = `https://wa.me/919011083440?text=${encodeURIComponent(text)}`;
    } catch (e) {
      alert('कृपया WhatsApp वर 9011083440 ला संदेश पाठवा');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e3a8a, #1e293b)' }}>
        <Logo size="lg" lang={lang} />
        <p style={{ color: 'white', marginTop: '20px', fontSize: '14px' }}>{t.loading}</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', paddingBottom: '120px', maxWidth: '480px', margin: '0 auto' }}>
      {showNotif && activeNotif && (
        <div style={{ background: activeNotif.Priority === 'High' ? '#fee2e2' : '#fed7aa', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
            <span style={{ fontSize: '20px' }}>🔔</span>
            <span style={{ fontSize: '14px', color: '#78350f' }}><strong>{activeNotif.Title}:</strong> {activeNotif.Message}</span>
          </div>
          <button onClick={() => setShowNotif(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#78350f' }}>✕</button>
        </div>
      )}

      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)', padding: '14px 18px', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setLang(lang === 'mr' ? 'en' : lang === 'en' ? 'hi' : 'mr')} style={{ width: '52px', height: '52px', background: '#1a202c', color: 'white', borderRadius: '14px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            <span style={{ fontSize: '20px' }}>🌐</span>
            <span style={{ fontSize: '9px' }}>{lang.toUpperCase()}</span>
          </button>
          
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Logo size="sm" lang={lang} showSubtitle={true} />
          </div>
          
          <button onClick={() => setShowNotifModal(true)} style={{ width: '52px', height: '52px', background: '#ff6600', color: 'white', borderRadius: '14px', border: 'none', fontSize: '24px', cursor: 'pointer', position: 'relative', boxShadow: '0 2px 8px rgba(255,102,0,0.3)' }}>
            🔔
            {data.notifications.length > 0 && <div style={{ position: 'absolute', top: '8px', right: '8px', width: '10px', height: '10px', background: '#dc2626', borderRadius: '50%', border: '2px solid white' }} />}
          </button>
        </div>
      </header>

      <main style={{ padding: '20px' }}>
        {activeTab === 'home' && !filterCat && (
          <>
            <section style={{ background: 'linear-gradient(135deg, #1e3a8a, #1e293b)', borderRadius: '24px', padding: '40px 28px', color: 'white', marginBottom: '24px', boxShadow: '0 16px 40px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%', filter: 'blur(50px)' }} />
              <div style={{ position: 'absolute', bottom: '-25px', left: '-25px', width: '140px', height: '140px', background: 'rgba(255,102,0,0.15)', borderRadius: '50%', filter: 'blur(35px)' }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25))' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '44px' }}>🏛️</span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', background: 'rgba(255,255,255,0.18)', padding: '3px 10px', borderRadius: '16px' }}>{t.ourService}</span>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', background: 'rgba(255,102,0,0.25)', padding: '3px 10px', borderRadius: '16px' }}>{t.yourTrust}</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, rgba(255,255,255,0.25), transparent)' }} />
                </div>
                
                <h2 style={{ fontSize: '26px', fontWeight: 'bold', textAlign: 'center', marginBottom: '14px', lineHeight: '1.3', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>{t.allServices}</h2>
                <p style={{ fontSize: '14px', opacity: 0.88, textAlign: 'center', marginBottom: '24px', lineHeight: '1.5' }}>
                  {t.farmer} • {t.eseva} • {t.student} • {t.jobs}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={() => window.scrollTo({ top: 280, behavior: 'smooth' })} style={{ background: 'linear-gradient(135deg, #ff6600, #ff9933)', color: 'white', padding: '13px 28px', borderRadius: '11px', border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 6px 18px rgba(255,102,0,0.35)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <span>{t.explore}</span>
                    <span style={{ fontSize: '16px' }}>→</span>
                  </button>
                </div>
              </div>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '13px' }}>
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setFilterCat(cat.id)} style={{ background: 'white', borderRadius: '17px', padding: '22px 15px', border: '1px solid #f1f5f9', cursor: 'pointer', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                  <div style={{ width: '50px', height: '50px', background: '#fff7ed', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 9px', fontSize: '25px' }}>{cat.icon}</div>
                  <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#1a202c', lineHeight: '1.3', display: 'block' }}>{cat.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === 'home' && filterCat && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '17px' }}>
              <h2 style={{ fontSize: '21px', fontWeight: 'bold', color: '#1a202c' }}>{categories.find(c => c.id === filterCat)?.label}</h2>
              <button onClick={() => setFilterCat(null)} style={{ background: '#ff6600', color: 'white', padding: '8px 17px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '12.5px' }}>← {t.back}</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filtered.map((item, i) => (
                <button key={i} onClick={() => setSelectedItem({ ...item, type: filterCat })} style={{ width: '100%', background: 'white', padding: '17px', borderRadius: '17px', display: 'flex', alignItems: 'center', gap: '13px', border: '1px solid #f1f5f9', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: '42px', width: '58px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff7ed', borderRadius: '13px', flexShrink: 0 }}>{item.Icon || '📄'}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a202c', marginBottom: '3px' }}>
                      {item.Service_Name || item.Yojana_Name || item.Scheme_Name || item.Job_Name || item.Card_Name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>{item.Description || item.Benefit || item.Department || ''}</p>
                  </div>
                  <div style={{ fontSize: '17px', color: '#ff6600' }}>→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div>
            <h2 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '19px', color: '#1a202c' }}>📢 {t.jobs}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {data.jobs.filter(j => notifToggles.jobs).map((job, i) => (
                <button key={i} onClick={() => setSelectedItem({ ...job, type: 'jobs' })} style={{ background: 'white', borderRadius: '17px', padding: '19px', border: '1px solid #f1f5f9', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '13px', marginBottom: '10px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '25px' }}>💼</div>
                    <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#1a202c', flex: 1 }}>{job.Job_Name}</h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '3px' }}>{t.last}</p>
                      <p style={{ fontSize: '13px', color: '#dc2626', fontWeight: 'bold' }}>📅 {job.Last_Date}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '3px' }}>{t.fee}</p>
                      <p style={{ fontSize: '13px', color: '#10b981', fontWeight: 'bold' }}>💰 {job.Fee}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '24px' }}>
              <Logo size="lg" lang={lang} showSubtitle={true} />
            </div>
            <div style={{ background: 'white', borderRadius: '21px', padding: '26px', boxShadow: '0 4px 13px rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#1a202c', marginBottom: '5px' }}>राहुल मिसे</p>
              <p style={{ fontSize: '10.5px', color: '#ff6600', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '19px' }}>{t.director}</p>
              
              <div style={{ marginBottom: '19px' }}>
                <p style={{ fontSize: '19px', fontWeight: 'bold', color: '#1a202c', marginBottom: '4px' }}>📞 9011083440</p>
                <p style={{ fontSize: '13.5px', color: '#64748b' }}>📧 sairamcomputer440@gmail.com</p>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleCall} style={{ flex: 1, background: '#ff6600', color: 'white', padding: '15px', borderRadius: '11px', border: 'none', fontSize: '14.5px', fontWeight: 'bold', boxShadow: '0 3px 10px rgba(255,102,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '19px' }}>📞</span>
                  <span>{t.call}</span>
                </button>
                <button onClick={() => handleWhatsApp('')} style={{ flex: 1, background: '#25d366', color: 'white', padding: '15px', borderRadius: '11px', border: 'none', fontSize: '14.5px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '19px' }}>💬</span>
                  <span>{t.whatsapp}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav style={{ position: 'fixed', bottom: '19px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(26,32,44,0.98)', backdropFilter: 'blur(20px)', borderRadius: '21px', padding: '7px 13px', display: 'flex', gap: '6px', boxShadow: '0 6px 26px rgba(0,0,0,0.3)', zIndex: 150, maxWidth: '410px', width: 'calc(100% - 40px)' }}>
        {[
          { id: 'home', icon: '🏠', label: t.home },
          { id: 'updates', icon: '📢', label: t.updates },
          { id: 'contact', icon: '👤', label: t.contact }
        ].map(item => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setFilterCat(null); }} style={{ flex: 1, padding: '10px 13px', background: activeTab === item.id ? '#ff6600' : 'transparent', color: 'white', border: 'none', borderRadius: '13px', cursor: 'pointer', fontSize: '17px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
            <span>{item.icon}</span>
            {activeTab === item.id && <span style={{ fontSize: '7.5px', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.label}</span>}
          </button>
        ))}
      </nav>

      {showNotifModal && (
        <div onClick={() => setShowNotifModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '21px', maxWidth: '390px', width: '100%', padding: '26px' }}>
            <h2 style={{ fontSize: '21px', fontWeight: 'bold', marginBottom: '17px', color: '#1a202c' }}>🔔 {t.notifications}</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '17px' }}>
              {notifCat.map(cat => (
                <div key={cat.id} style={{ padding: '15px', background: '#f8fafc', borderRadius: '13px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                    <div style={{ fontSize: '26px' }}>{cat.icon}</div>
                    <div>
                      <p style={{ fontSize: '13.5px', fontWeight: 'bold', color: '#1a202c', marginBottom: '2px' }}>{cat.label}</p>
                      <p style={{ fontSize: '11.5px', color: '#64748b' }}>
                        {cat.id === 'farmer' && data.shetkari.length}
                        {cat.id === 'student' && data.vidyarthi.length}
                        {cat.id === 'jobs' && data.jobs.length}
                        {cat.id === 'eseva' && (data.services.length + data.olakh.length)} {t.available}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setNotifToggles(prev => ({ ...prev, [cat.id]: !prev[cat.id] }))} style={{ 
                    width: '54px', height: '29px', background: notifToggles[cat.id] ? cat.color : '#cbd5e1', borderRadius: '14.5px', border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.3s'
                  }}>
                    <div style={{ width: '23px', height: '23px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: notifToggles[cat.id] ? '28px' : '3px', transition: 'all 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                  </button>
                </div>
              ))}
            </div>
            
            <button onClick={() => setShowNotifModal(false)} style={{ width: '100%', background: '#1a202c', color: 'white', padding: '12px', borderRadius: '11px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>{t.close}</button>
          </div>
        </div>
      )}

      {selectedItem && (
        <div onClick={() => setSelectedItem(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'end', justifyContent: 'center', zIndex: 200 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '25px 25px 0 0', maxWidth: '480px', width: '100%', padding: '26px 21px 34px', maxHeight: '85vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '19px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '13px', flex: 1 }}>
                <div style={{ fontSize: '50px', flexShrink: 0 }}>{selectedItem.Icon || '💼'}</div>
                <div>
                  <h2 style={{ fontSize: '19px', fontWeight: 'bold', color: '#1a202c', marginBottom: '6px' }}>
                    {selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || selectedItem.Scheme_Name || selectedItem.Card_Name}
                  </h2>
                  <span style={{ display: 'inline-block', padding: '3px 9px', background: '#fff7ed', borderRadius: '7px', fontSize: '10px', color: '#ff6600', fontWeight: 'bold' }}>
                    {selectedItem.Category || selectedItem.Department}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedItem(null)} style={{ background: '#f8fafc', border: 'none', width: '33px', height: '33px', borderRadius: '50%', cursor: 'pointer', fontSize: '15px', color: '#64748b', flexShrink: 0 }}>✕</button>
            </div>

            <div style={{ marginBottom: '19px' }}>
              {selectedItem.type === 'jobs' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '13px' }}>
                  {selectedItem.Start_Date && (
                    <div style={{ padding: '13px', background: '#eff6ff', borderRadius: '11px' }}>
                      <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '3px' }}>{t.start}</p>
                      <p style={{ fontSize: '13.5px', color: '#1a202c', fontWeight: 'bold' }}>📅 {selectedItem.Start_Date}</p>
                    </div>
                  )}
                  {selectedItem.Last_Date && (
                    <div style={{ padding: '13px', background: '#fef2f2', borderRadius: '11px' }}>
                      <p style={{ fontSize: '10px', color: '#dc2626', fontWeight: 'bold', marginBottom: '3px' }}>{t.last}</p>
                      <p style={{ fontSize: '13.5px', color: '#1a202c', fontWeight: 'bold' }}>📅 {selectedItem.Last_Date}</p>
                    </div>
                  )}
                  {selectedItem.Fee && (
                    <div style={{ padding: '13px', background: '#f0fdf4', borderRadius: '11px' }}>
                      <p style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold', marginBottom: '3px' }}>{t.fee}</p>
                      <p style={{ fontSize: '13.5px', color: '#1a202c', fontWeight: 'bold' }}>💰 {selectedItem.Fee}</p>
                    </div>
                  )}
                  {selectedItem.Qualification && (
                    <div style={{ padding: '13px', background: '#eff6ff', borderRadius: '11px' }}>
                      <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '3px' }}>{t.qual}</p>
                      <p style={{ fontSize: '12.5px', color: '#1a202c' }}>{selectedItem.Qualification}</p>
                    </div>
                  )}
                  {selectedItem.Age && (
                    <div style={{ padding: '13px', background: '#fef3c7', borderRadius: '11px' }}>
                      <p style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '3px' }}>{t.age}</p>
                      <p style={{ fontSize: '12.5px', color: '#1a202c' }}>{selectedItem.Age}</p>
                    </div>
                  )}
                  {(selectedItem.Total_Posts || selectedItem.Seats) && (
                    <div style={{ padding: '13px', background: '#f3e8ff', borderRadius: '11px' }}>
                      <p style={{ fontSize: '10px', color: '#8b5cf6', fontWeight: 'bold', marginBottom: '3px' }}>{selectedItem.Total_Posts ? t.posts : t.seats}</p>
                      <p style={{ fontSize: '12.5px', color: '#1a202c' }}>{selectedItem.Total_Posts || selectedItem.Seats}</p>
                    </div>
                  )}
                </div>
              )}
              
              {(selectedItem.type === 'farmer' || selectedItem.type === 'student') && (
                <div style={{ marginBottom: '13px' }}>
                  {selectedItem.Benefit && (
                    <div style={{ padding: '13px', background: '#f0fdf4', borderRadius: '11px', marginBottom: '8px' }}>
                      <p style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold', marginBottom: '3px' }}>{t.benefit}</p>
                      <p style={{ fontSize: '12.5px', color: '#1a202c' }}>{selectedItem.Benefit}</p>
                    </div>
                  )}
                  {selectedItem.Eligibility && (
                    <div style={{ padding: '13px', background: '#eff6ff', borderRadius: '11px', marginBottom: '8px' }}>
                      <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '3px' }}>{t.eligibility}</p>
                      <p style={{ fontSize: '12.5px', color: '#1a202c' }}>{selectedItem.Eligibility}</p>
                    </div>
                  )}
                </div>
              )}
              
              {(selectedItem.Documents || selectedItem.Documents_Required) && (
                <div style={{ padding: '13px', background: '#fef3c7', borderRadius: '11px', marginBottom: '13px' }}>
                  <p style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '7px' }}>{t.docs}</p>
                  <p style={{ fontSize: '12.5px', color: '#1a202c', lineHeight: '1.6' }}>{selectedItem.Documents || selectedItem.Documents_Required}</p>
                </div>
              )}
              
              {(selectedItem.Description || selectedItem.Details) && (
                <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '13.5px', padding: '11px', background: '#f8fafc', borderRadius: '11px' }}>
                  {selectedItem.Description || selectedItem.Details}
                </p>
              )}
            </div>

            <button onClick={() => handleWhatsApp(selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || selectedItem.Scheme_Name || selectedItem.Card_Name)} style={{ width: '100%', background: '#25d366', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', fontSize: '14.5px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}>
              <span style={{ fontSize: '21px' }}>💬</span>
              <span>{t.apply}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
