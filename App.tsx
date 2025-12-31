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

// Improved Logo Component
const Logo = ({ size = 'md' }) => {
  const fontSize = size === 'lg' ? '56px' : size === 'sm' ? '32px' : '42px';
  const subtitleSize = size === 'lg' ? '14px' : '10px';
  
  return (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
      <div style={{
        fontSize: fontSize,
        fontWeight: 900,
        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 50%, #FFA64D 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontFamily: "'Tiro Devanagari Marathi', 'Noto Sans Devanagari', serif",
        letterSpacing: '-1px',
        filter: 'drop-shadow(0 2px 4px rgba(255,107,53,0.3))',
        marginBottom: '4px'
      }}>
        साईराम
      </div>
      <div style={{
        fontSize: subtitleSize,
        fontWeight: 700,
        color: '#4A5568',
        letterSpacing: '0.5px'
      }}>
        महा-ई-सेवा केंद्र
      </div>
    </div>
  );
};

const T = {
  mr: {
    home: 'होम', updates: 'अपडेट्स', contact: 'संपर्क', apply: 'अर्ज करा',
    notifications: 'सूचना', farmer: 'शेतकरी योजना', student: 'विद्यार्थी कक्ष',
    jobs: 'नोकरी अलर्ट', eseva: 'महा-ई-सेवा', id: 'ओळखपत्र', other: 'इतर सेवा',
    allServices: 'सर्व शासकीय सेवा एकाच ठिकाणी!', explore: 'सेवा पहा',
    loading: 'लोड होत आहे...', call: 'कॉल करा', whatsapp: 'WhatsApp',
    director: 'संचालक', start: 'सुरुवात', last: 'शेवटची तारीख',
    fee: 'शुल्क', docs: 'कागदपत्रे', settings: 'सेटिंग्ज', notifSettings: 'सूचना सेटिंग्ज',
    enableNotif: 'या सेवांच्या सूचना पहा', save: 'जतन करा'
  },
  en: {
    home: 'Home', updates: 'Updates', contact: 'Contact', apply: 'Apply',
    notifications: 'Notifications', farmer: 'Farmer', student: 'Student',
    jobs: 'Jobs', eseva: 'e-Services', id: 'ID Cards', other: 'Other',
    allServices: 'All Government Services in One Place!', explore: 'Explore',
    loading: 'Loading...', call: 'Call', whatsapp: 'WhatsApp',
    director: 'Director', start: 'Start', last: 'Last Date',
    fee: 'Fee', docs: 'Documents', settings: 'Settings', notifSettings: 'Notification Settings',
    enableNotif: 'Enable notifications for', save: 'Save'
  },
  hi: {
    home: 'होम', updates: 'अपडेट्स', contact: 'संपर्क', apply: 'आवेदन',
    notifications: 'सूचनाएं', farmer: 'किसान', student: 'छात्र',
    jobs: 'नौकरी', eseva: 'ई-सेवाएं', id: 'पहचान पत्र', other: 'अन्य',
    allServices: 'सभी सरकारी सेवाएं एक जगह!', explore: 'देखें',
    loading: 'लोड...', call: 'कॉल', whatsapp: 'WhatsApp',
    director: 'निदेशक', start: 'शुरुआत', last: 'अंतिम',
    fee: 'शुल्क', docs: 'दस्तावेज', settings: 'सेटिंग्ज', notifSettings: 'सूचना सेटिंग्ज',
    enableNotif: 'के लिए सूचनाएं सक्षम करें', save: 'सहेजें'
  }
};

function App() {
  const [data, setData] = useState({ services: [], jobs: [], shetkari: [], vidyarthi: [], olakh: [], printing: [], notifications: [], settings: {} });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [filterCat, setFilterCat] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [lang, setLang] = useState(() => localStorage.getItem('app_language') || 'mr');
  const [notifSettings, setNotifSettings] = useState(() => {
    const saved = localStorage.getItem('notif_settings');
    return saved ? JSON.parse(saved) : { farmer: true, student: true, jobs: true, eseva: true, identity: true, printing: true };
  });

  const t = T[lang];

  useEffect(() => {
    localStorage.setItem('app_language', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('notif_settings', JSON.stringify(notifSettings));
  }, [notifSettings]);

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
        setTimeout(() => setLoading(false), 300);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = [
    { id: 'farmer', label: t.farmer, icon: '🌾', color: '#10B981', bg: '#ECFDF5' },
    { id: 'student', label: t.student, icon: '🎓', color: '#3B82F6', bg: '#EFF6FF' },
    { id: 'jobs', label: t.jobs, icon: '📢', color: '#EF4444', bg: '#FEF2F2' },
    { id: 'csc', label: t.eseva, icon: '🏛️', color: '#8B5CF6', bg: '#F5F3FF' },
    { id: 'identity', label: t.id, icon: '💳', color: '#F59E0B', bg: '#FEF3C7' },
    { id: 'printing', label: t.other, icon: '🖨️', color: '#EC4899', bg: '#FCE7F3' }
  ];

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

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Logo size="lg" />
        <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: '10px', height: '10px', background: 'white', borderRadius: '50%', animation: `bounce 1s infinite ${i * 0.15}s` }} />
          ))}
        </div>
        <p style={{ color: 'white', marginTop: '16px', fontSize: '16px', fontWeight: 600 }}>{t.loading}</p>
        <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7FAFC', paddingBottom: '80px' }}>
      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white', padding: '12px 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['mr', 'en', 'hi'].map(l => (
              <button 
                key={l}
                onClick={() => setLang(l)}
                style={{ 
                  width: '36px',
                  height: '36px',
                  background: lang === l ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white',
                  color: lang === l ? 'white' : '#718096',
                  borderRadius: '8px',
                  border: lang === l ? 'none' : '1px solid #E2E8F0',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          
          <Logo size="sm" />
          
          <button 
            onClick={() => setShowNotifModal(true)}
            style={{ 
              width: '40px',
              height: '40px',
              background: '#FF8C42',
              color: 'white',
              borderRadius: '10px',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            🔔
            {data.notifications.some(n => notifSettings[n.Category]) && (
              <div style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', background: '#22C55E', borderRadius: '50%', border: '2px solid white' }} />
            )}
          </button>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {activeTab === 'home' && !filterCat && (
          <>
            {/* Hero - Blue gradient like your design */}
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              padding: '40px 28px',
              color: 'white',
              marginBottom: '20px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(102,126,234,0.4)'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '16px' }}>🏛️</div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px', lineHeight: '1.3' }}>
                {t.allServices}
              </h2>
              <p style={{ fontSize: '13px', opacity: 0.9, marginBottom: '24px' }}>
                {t.farmer} • {t.student} • {t.jobs} • {t.eseva}
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 320, behavior: 'smooth' })}
                style={{ 
                  background: '#FF8C42',
                  color: 'white',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(255,140,66,0.4)'
                }}
              >
                {t.explore} →
              </button>
            </div>

            {/* Categories */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setFilterCat(cat.id)}
                  style={{ 
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px 16px',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ 
                    width: '60px',
                    height: '60px',
                    background: cat.bg,
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    margin: '0 auto 12px'
                  }}>
                    {cat.icon}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#2D3748', marginBottom: '6px' }}>
                    {cat.label}
                  </div>
                  <div style={{ 
                    display: 'inline-block',
                    background: cat.color,
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    fontWeight: 600
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

        {activeTab === 'home' && filterCat && (
          <div>
            <div style={{ background: categories.find(c => c.id === filterCat)?.bg, padding: '16px', borderRadius: '14px', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: categories.find(c => c.id === filterCat)?.color, margin: 0 }}>
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
                    padding: '16px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ fontSize: '36px' }}>{item.Icon || '📄'}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#2D3748', marginBottom: '4px' }}>
                      {item.Service_Name || item.Yojana_Name || item.Scheme_Name || item.Job_Name || item.Card_Name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>
                      {item.Description || item.Benefit || item.Department || ''}
                    </p>
                  </div>
                  <div style={{ fontSize: '18px', color: categories.find(c => c.id === filterCat)?.color }}>→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', color: '#2D3748' }}>📢 {t.updates}</h2>
            {[...data.jobs, ...data.shetkari, ...data.vidyarthi].filter((item, i) => {
              const cat = item.Job_Name ? 'jobs' : item.Yojana_Name ? 'farmer' : 'student';
              return notifSettings[cat];
            }).slice(0, 15).map((item, i) => (
              <button 
                key={i}
                onClick={() => setSelectedItem(item)}
                style={{ background: 'white', borderRadius: '14px', padding: '16px', marginBottom: '12px', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px', color: '#2D3748' }}>
                  {item.Job_Name || item.Yojana_Name || item.Scheme_Name}
                </h3>
                <p style={{ fontSize: '12px', color: '#718096', margin: 0 }}>
                  {item.Department || item.Benefit}
                </p>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'contact' && (
          <div style={{ textAlign: 'center' }}>
            <Logo size="lg" />
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px 24px', marginTop: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px' }}>
                👤
              </div>
              <p style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px', color: '#2D3748' }}>राहुल मिसे</p>
              <p style={{ fontSize: '12px', color: '#718096', fontWeight: 600, marginBottom: '20px' }}>{t.director}</p>
              <div style={{ marginBottom: '24px', padding: '16px', background: '#F7FAFC', borderRadius: '12px' }}>
                <p style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#2D3748' }}>📞 9011083440</p>
                <p style={{ fontSize: '13px', color: '#718096' }}>📧 sairamcomputer440@gmail.com</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a 
                  href="tel:9011083440"
                  style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  📞 {t.call}
                </a>
                <a 
                  href="https://wa.me/919011083440?text=नमस्कार%20साईराम%20महा-ई-सेवा%20केंद्र"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: 'white', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  💬 {t.whatsapp}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav - Orange like your design */}
      <div style={{ position: 'fixed', bottom: '12px', left: '50%', transform: 'translateX(-50%)', background: '#2D3748', borderRadius: '20px', padding: '6px 8px', display: 'flex', gap: '6px', boxShadow: '0 8px 30px rgba(0,0,0,0.2)', zIndex: 150, width: 'calc(100% - 32px)', maxWidth: '380px' }}>
        {[{ id: 'home', icon: '🏠', label: t.home }, { id: 'updates', icon: '📢', label: t.updates }, { id: 'contact', icon: '👤', label: t.contact }].map(item => (
          <button 
            key={item.id}
            onClick={() => { setActiveTab(item.id); setFilterCat(null); }}
            style={{ flex: 1, padding: '12px', background: activeTab === item.id ? '#FF8C42' : 'transparent', color: 'white', border: 'none', borderRadius: '14px', cursor: 'pointer', fontSize: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', transition: 'all 0.2s' }}
          >
            <span>{item.icon}</span>
            {activeTab === item.id && <span style={{ fontSize: '9px', fontWeight: 700 }}>{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Notification Settings Modal */}
      {showNotifModal && (
        <div onClick={() => setShowNotifModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '20px', maxWidth: '400px', width: '100%', padding: '28px 24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: '#2D3748' }}>🔔 {t.notifSettings}</h2>
            <p style={{ fontSize: '13px', color: '#718096', marginBottom: '20px' }}>{t.enableNotif}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {categories.map(cat => (
                <div key={cat.id} style={{ padding: '14px', background: '#F7FAFC', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '28px' }}>{cat.icon}</div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#2D3748' }}>{cat.label}</span>
                  </div>
                  <button 
                    onClick={() => setNotifSettings(prev => ({ ...prev, [cat.id]: !prev[cat.id] }))}
                    style={{ 
                      width: '50px',
                      height: '28px',
                      background: notifSettings[cat.id] ? cat.color : '#CBD5E0',
                      borderRadius: '14px',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s'
                    }}
                  >
                    <div style={{ width: '22px', height: '22px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: notifSettings[cat.id] ? '25px' : '3px', transition: 'all 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
                  </button>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setShowNotifModal(false)}
              style={{ width: '100%', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '15px' }}
            >
              {t.save}
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <div onClick={() => setSelectedItem(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'end', justifyContent: 'center', zIndex: 200 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: '480px', padding: '28px 20px 36px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, flex: 1, margin: 0, color: '#2D3748' }}>
                {selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || selectedItem.Scheme_Name || selectedItem.Card_Name}
              </h2>
              <button onClick={() => setSelectedItem(null)} style={{ background: '#F7FAFC', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', color: '#718096' }}>✕</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              {selectedItem.Start_Date && (
                <div style={{ padding: '12px', background: '#EFF6FF', borderRadius: '10px', marginBottom: '10px' }}>
                  <p style={{ fontSize: '10px', color: '#3B82F6', fontWeight: 600, marginBottom: '4px' }}>{t.start}</p>
                  <p style={{ fontSize: '13px', fontWeight: 600, margin: 0, color: '#2D3748' }}>📅 {selectedItem.Start_Date}</p>
                </div>
              )}
              {selectedItem.Last_Date && (
                <div style={{ padding: '12px', background: '#FEF2F2', borderRadius: '10px', marginBottom: '10px' }}>
                  <p style={{ fontSize: '10px', color: '#EF4444', fontWeight: 600, marginBottom: '4px' }}>{t.last}</p>
                  <p style={{ fontSize: '13px', fontWeight: 600, margin: 0, color: '#2D3748' }}>⏰ {selectedItem.Last_Date}</p>
                </div>
              )}
              {selectedItem.Fee && (
                <div style={{ padding: '12px', background: '#ECFDF5', borderRadius: '10px', marginBottom: '10px' }}>
                  <p style={{ fontSize: '10px', color: '#10B981', fontWeight: 600, marginBottom: '4px' }}>{t.fee}</p>
                  <p style={{ fontSize: '13px', fontWeight: 600, margin: 0, color: '#2D3748' }}>💰 {selectedItem.Fee}</p>
                </div>
              )}
              {(selectedItem.Documents || selectedItem.Documents_Required) && (
                <div style={{ padding: '12px', background: '#FEF3C7', borderRadius: '10px', marginBottom: '10px' }}>
                  <p style={{ fontSize: '10px', color: '#F59E0B', fontWeight: 600, marginBottom: '6px' }}>📄 {t.docs}</p>
                  <p style={{ fontSize: '12px', lineHeight: '1.5', margin: 0, color: '#2D3748' }}>
                    {selectedItem.Documents || selectedItem.Documents_Required}
                  </p>
                </div>
              )}
              {(selectedItem.Description || selectedItem.Benefit) && (
                <p style={{ fontSize: '12px', color: '#718096', lineHeight: '1.6', padding: '12px', background: '#F7FAFC', borderRadius: '10px', margin: 0 }}>
                  {selectedItem.Description || selectedItem.Benefit}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href={`https://wa.me/919011083440?text=नमस्कार, मला "${selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || ''}" या बद्दल माहिती हवी आहे`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '100%', background: 'linear-gradient(135deg, #25D366, #128C7E)', color: 'white', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                💬 {t.whatsapp}
              </a>
              <a 
                href="tel:9011083440"
                style={{ width: '100%', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                📞 {t.call}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
