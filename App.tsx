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

const ProfessionalLogo = ({ size = 'md' }) => {
  const fontSize = size === 'sm' ? '32px' : size === 'lg' ? '56px' : '42px';
  
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ 
        fontSize, 
        fontWeight: 900, 
        background: 'linear-gradient(135deg, #ff6600 0%, #ff9933 50%, #ffb84d 100%)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent', 
        letterSpacing: '-1px', 
        margin: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textShadow: '0 2px 10px rgba(255,102,0,0.3)'
      }}>
        साईराम
      </h1>
      {size !== 'sm' && (
        <>
          <div style={{ width: size === 'lg' ? '100px' : '60px', height: '3px', background: 'linear-gradient(90deg, transparent, #ff6600, transparent)', margin: '6px auto', borderRadius: '2px' }} />
          <p style={{ fontSize: size === 'lg' ? '18px' : '14px', color: '#2d3748', fontWeight: 600, margin: 0 }}>महा-ई-सेवा केंद्र</p>
        </>
      )}
    </div>
  );
};

const TRANSLATIONS = {
  mr: {
    home: 'होम', updates: 'अपडेट्स', contact: 'संपर्क', back: 'मागे', applyNow: 'मला Apply करायचे आहे',
    close: 'बंद करा', notifications: 'सूचना सेटिंग्ज', notificationSettings: 'सूचना बदला',
    farmerSchemes: 'शेतकरी योजना', studentPortal: 'विद्यार्थी कक्ष', jobAlerts: 'नोकरी अलर्ट',
    eSeva: 'महा-ई-सेवा', idCards: 'ओळखपत्र', otherServices: 'इतर सेवा',
    lastDate: 'शेवटची तारीख', startDate: 'सुरुवात तारीख', fee: 'शुल्क',
    qualification: 'शैक्षणिक पात्रता', age: 'वय मर्यादा', documents: 'आवश्यक कागदपत्रे',
    benefit: 'लाभ', eligibility: 'पात्रता', department: 'विभाग',
    director: 'संचालक', callNow: 'कॉल करा', whatsappMsg: 'WhatsApp संदेश',
    on: 'चालू', off: 'बंद', ourServices: 'आमची सेवा', yourTrust: 'तुमचा विश्वास',
    allGovtServices: 'सर्व शासकीय सेवा एकाच ठिकाणी!', exploreServices: 'सेवा पहा'
  },
  en: {
    home: 'Home', updates: 'Updates', contact: 'Contact', back: 'Back', applyNow: 'I Want to Apply',
    close: 'Close', notifications: 'Notification Settings', notificationSettings: 'Change Notifications',
    farmerSchemes: 'Farmer Schemes', studentPortal: 'Student Portal', jobAlerts: 'Job Alerts',
    eSeva: 'e-Services', idCards: 'ID Cards', otherServices: 'Other Services',
    lastDate: 'Last Date', startDate: 'Start Date', fee: 'Fee',
    qualification: 'Educational Qualification', age: 'Age Limit', documents: 'Required Documents',
    benefit: 'Benefit', eligibility: 'Eligibility', department: 'Department',
    director: 'Director', callNow: 'Call Now', whatsappMsg: 'WhatsApp Message',
    on: 'On', off: 'Off', ourServices: 'Our Services', yourTrust: 'Your Trust',
    allGovtServices: 'All Government Services in One Place!', exploreServices: 'Explore Services'
  },
  hi: {
    home: 'होम', updates: 'अपडेट्स', contact: 'संपर्क', back: 'वापस', applyNow: 'मुझे आवेदन करना है',
    close: 'बंद करें', notifications: 'सूचना सेटिंग्स', notificationSettings: 'सूचना बदलें',
    farmerSchemes: 'किसान योजना', studentPortal: 'छात्र पोर्टल', jobAlerts: 'नौकरी अलर्ट',
    eSeva: 'ई-सेवाएं', idCards: 'पहचान पत्र', otherServices: 'अन्य सेवाएं',
    lastDate: 'अंतिम तिथि', startDate: 'शुरुआत तिथि', fee: 'शुल्क',
    qualification: 'शैक्षिक योग्यता', age: 'आयु सीमा', documents: 'आवश्यक दस्तावेज',
    benefit: 'लाभ', eligibility: 'पात्रता', department: 'विभाग',
    director: 'निदेशक', callNow: 'कॉल करें', whatsappMsg: 'WhatsApp संदेश',
    on: 'चालू', off: 'बंद', ourServices: 'हमारी सेवा', yourTrust: 'आपका विश्वास',
    allGovtServices: 'सभी सरकारी सेवाएं एक जगह!', exploreServices: 'सेवाएं देखें'
  }
};

const NOTIFICATION_CATEGORIES = [
  { id: 'farmer', label: 'शेतकरी योजना', icon: '🌾', color: '#10b981' },
  { id: 'student', label: 'विद्यार्थी कक्ष', icon: '🎓', color: '#3b82f6' },
  { id: 'jobs', label: 'नोकरी अलर्ट', icon: '📢', color: '#ef4444' },
  { id: 'eseva', label: 'महा-ई-सेवा', icon: '🏛️', color: '#8b5cf6' }
];

const CATEGORIES = {
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

function App() {
  const [services, setServices] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [shetkari, setShetkari] = useState([]);
  const [vidyarthi, setVidyarthi] = useState([]);
  const [olakh, setOlakh] = useState([]);
  const [printing, setPrinting] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [filterCategory, setFilterCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNotif, setShowNotif] = useState(true);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [language, setLanguage] = useState('mr');
  const [notifToggles, setNotifToggles] = useState({
    farmer: true,
    student: true,
    jobs: true,
    eseva: true
  });

  const t = TRANSLATIONS[language];
  const categories = CATEGORIES[language];

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
        setServices(svc.filter(s => s.Active === 'YES'));
        setJobs(job.filter(j => j.Active === 'YES'));
        setShetkari(shk.filter(s => s.Active === 'YES'));
        setVidyarthi(vid.filter(v => v.Active === 'YES'));
        setOlakh(olk.filter(o => o.Active === 'YES'));
        setPrinting(prt.filter(p => p.Active === 'YES'));
        setNotifications(ntf.filter(n => n.Active === 'YES'));
        const cfg = {};
        stg.forEach(s => cfg[s.Setting_Key] = s.Setting_Value);
        setSettings(cfg);
        setTimeout(() => setLoading(false), 1500);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    load();
  }, []);

  const activeNotif = notifications.find(n => {
    const now = new Date();
    const start = new Date(n.Start_Date);
    const end = new Date(n.End_Date);
    return now >= start && now <= end;
  });

  const getFilteredData = () => {
    switch (filterCategory) {
      case 'farmer': return shetkari;
      case 'student': return vidyarthi;
      case 'jobs': return jobs;
      case 'identity': return olakh;
      case 'printing': return printing;
      default: return services.filter(s => s.Category === filterCategory);
    }
  };

  const filteredServices = filterCategory ? getFilteredData() : services;

  const sendWhatsApp = (itemName) => {
    try {
      const phone = '919011083440';
      const message = `नमस्कार साईराम महा-ई-सेवा केंद्र, मला "${itemName}" या फॉर्म भरायचा आहे मला माहिती हवी आहे.`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('WhatsApp Error:', error);
      alert('WhatsApp उघडण्यात समस्या आली. कृपया पुन्हा प्रयत्न करा.');
    }
  };

  const makeCall = () => {
    try {
      window.location.href = 'tel:+919011083440';
    } catch (error) {
      console.error('Call Error:', error);
      alert('कॉल करण्यात समस्या आली. कृपया 9011083440 या नंबरवर डायल करा.');
    }
  };

  const cycleLang = () => {
    const langs = ['mr', 'en', 'hi'];
    setLanguage(langs[(langs.indexOf(language) + 1) % langs.length]);
  };

  const toggleNotification = (category) => {
    setNotifToggles(prev => ({ ...prev, [category]: !prev[category] }));
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <ProfessionalLogo size="lg" />
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

      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)', padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <button onClick={cycleLang} style={{ width: '44px', height: '44px', background: '#1a202c', color: 'white', borderRadius: '12px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '18px' }}>🌐</span>
            <span style={{ fontSize: '9px', marginTop: '2px' }}>{language.toUpperCase()}</span>
          </button>
          
          <ProfessionalLogo size="md" />
          
          <button onClick={() => setShowNotifModal(true)} style={{ width: '44px', height: '44px', background: '#ff6600', color: 'white', borderRadius: '12px', border: 'none', fontSize: '22px', cursor: 'pointer', position: 'relative' }}>
            🔔
            {notifications.length > 0 && (
              <div style={{ position: 'absolute', top: '6px', right: '6px', width: '10px', height: '10px', background: '#dc2626', borderRadius: '50%', border: '2px solid white' }} />
            )}
          </button>
        </div>
      </header>

      <main style={{ padding: '20px' }}>
        {activeTab === 'home' && !filterCategory && (
          <>
            <section style={{ 
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)', 
              borderRadius: '24px', 
              padding: '48px 32px', 
              color: 'white', 
              marginBottom: '28px', 
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(60px)' }} />
              <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '150px', height: '150px', background: 'rgba(255,102,0,0.2)', borderRadius: '50%', filter: 'blur(40px)' }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '48px', animation: 'bounce 2s infinite' }}>🏛️</span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px' }}>{t.ourServices}</span>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', background: 'rgba(255,102,0,0.3)', padding: '4px 12px', borderRadius: '20px' }}>{t.yourTrust}</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, rgba(255,255,255,0.3), transparent)' }} />
                </div>
                
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px', lineHeight: '1.3', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  {t.allGovtServices}
                </h2>
                
                <p style={{ fontSize: '15px', opacity: 0.9, textAlign: 'center', marginBottom: '28px', lineHeight: '1.6' }}>
                  शेतकरी योजना • महा-ई-सेवा • स्कॉलरशिप • नोकरी भरती • ओळखपत्र
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })} style={{ background: 'linear-gradient(135deg, #ff6600, #ff9933)', color: 'white', padding: '14px 32px', borderRadius: '12px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 8px 20px rgba(255,102,0,0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{t.exploreServices}</span>
                    <span style={{ fontSize: '18px' }}>→</span>
                  </button>
                </div>
              </div>
              
              <style>{`
                @keyframes bounce {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-10px); }
                }
              `}</style>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setFilterCategory(cat.id)} style={{ background: 'white', borderRadius: '18px', padding: '24px 16px', border: '1px solid #f1f5f9', cursor: 'pointer', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', transition: 'all 0.2s' }}>
                  <div style={{ width: '52px', height: '52px', background: '#fff7ed', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '26px' }}>{cat.icon}</div>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a202c', lineHeight: '1.3', display: 'block' }}>{cat.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === 'home' && filterCategory && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a202c' }}>{categories.find(c => c.id === filterCategory)?.label}</h2>
              <button onClick={() => setFilterCategory(null)} style={{ background: '#ff6600', color: 'white', padding: '9px 18px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>← {t.back}</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredServices.map((item, i) => (
                <button key={i} onClick={() => setSelectedItem({ ...item, type: filterCategory })} style={{ width: '100%', background: 'white', padding: '18px', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '14px', border: '1px solid #f1f5f9', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: '44px', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff7ed', borderRadius: '14px', flexShrink: 0 }}>{item.Icon || '📄'}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#1a202c', marginBottom: '3px' }}>
                      {item.Service_Name || item.Yojana_Name || item.Scheme_Name || item.Job_Name || item.Card_Name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>{item.Description || item.Benefit || item.Department}</p>
                  </div>
                  <div style={{ fontSize: '18px', color: '#ff6600' }}>→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '20px', color: '#1a202c' }}>📢 नोकरी भरती Updates</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {jobs.filter(j => notifToggles.jobs).map((job, i) => (
                <button key={i} onClick={() => setSelectedItem({ ...job, type: 'job' })} style={{ background: 'white', borderRadius: '18px', padding: '20px', border: '1px solid #f1f5f9', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                    <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>💼</div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c', flex: 1 }}>{job.Job_Name}</h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '3px' }}>{t.lastDate}</p>
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
            <div style={{ marginBottom: '28px' }}>
              <ProfessionalLogo size="lg" />
            </div>
            <div style={{ background: 'white', borderRadius: '22px', padding: '28px', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a202c', marginBottom: '6px' }}>राहुल मिसे</p>
              <p style={{ fontSize: '11px', color: '#ff6600', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '20px' }}>{t.director}</p>
              
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c', marginBottom: '4px' }}>📞 9011083440</p>
                <p style={{ fontSize: '14px', color: '#64748b' }}>📧 sairamcomputer440@gmail.com</p>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="tel:+919011083440" style={{ flex: 1, background: '#ff6600', color: 'white', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold', boxShadow: '0 3px 10px rgba(255,102,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '20px' }}>📞</span>
                  <span>{t.callNow}</span>
                </a>
                <a href="https://api.whatsapp.com/send?phone=919011083440&text=नमस्कार साईराम महा-ई-सेवा केंद्र" target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: '#25d366', color: 'white', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '20px' }}>💬</span>
                  <span>{t.whatsappMsg}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <nav style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(26,32,44,0.98)', backdropFilter: 'blur(20px)', borderRadius: '22px', padding: '7px 14px', display: 'flex', gap: '6px', boxShadow: '0 6px 28px rgba(0,0,0,0.3)', zIndex: 150, maxWidth: '420px', width: 'calc(100% - 40px)' }}>
        {[
          { id: 'home', icon: '🏠', label: t.home },
          { id: 'updates', icon: '📢', label: t.updates },
          { id: 'contact', icon: '👤', label: t.contact }
        ].map(item => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setFilterCategory(null); }} style={{ flex: 1, padding: '10px 14px', background: activeTab === item.id ? '#ff6600' : 'transparent', color: 'white', border: 'none', borderRadius: '14px', cursor: 'pointer', fontSize: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
            <span>{item.icon}</span>
            {activeTab === item.id && <span style={{ fontSize: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.label}</span>}
          </button>
        ))}
      </nav>

      {showNotifModal && (
        <div onClick={() => setShowNotifModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '22px', maxWidth: '400px', width: '100%', padding: '28px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '18px', color: '#1a202c' }}>🔔 {t.notificationSettings}</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
              {NOTIFICATION_CATEGORIES.map(cat => (
                <div key={cat.id} style={{ padding: '16px', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '28px' }}>{cat.icon}</div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a202c', marginBottom: '2px' }}>{cat.label}</p>
                      <p style={{ fontSize: '12px', color: '#64748b' }}>
                        {cat.id === 'farmer' && shetkari.length + ' योजना'}
                        {cat.id === 'student' && vidyarthi.length + ' योजना'}
                        {cat.id === 'jobs' && jobs.length + ' भरती'}
                        {cat.id === 'eseva' && (services.length + olakh.length) + ' सेवा'}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => toggleNotification(cat.id)} style={{ 
                    width: '56px', 
                    height: '30px', 
                    background: notifToggles[cat.id] ? cat.color : '#cbd5e1', 
                    borderRadius: '15px', 
                    border: 'none', 
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s'
                  }}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      background: 'white', 
                      borderRadius: '50%', 
                      position: 'absolute',
                      top: '3px',
                      left: notifToggles[cat.id] ? '29px' : '3px',
                      transition: 'all 0.3s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }} />
                  </button>
                </div>
              ))}
            </div>
            
            <button onClick={() => setShowNotifModal(false)} style={{ width: '100%', background: '#1a202c', color: 'white', padding: '13px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>{t.close}</button>
          </div>
        </div>
      )}

      {selectedItem && (
        <div onClick={() => setSelectedItem(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'end', justifyContent: 'center', zIndex: 200 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '26px 26px 0 0', maxWidth: '480px', width: '100%', padding: '28px 22px 36px', maxHeight: '85vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                <div style={{ fontSize: '52px', flexShrink: 0 }}>{selectedItem.Icon || '💼'}</div>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c', marginBottom: '6px' }}>
                    {selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || selectedItem.Scheme_Name || selectedItem.Card_Name}
                  </h2>
                  <span style={{ display: 'inline-block', padding: '3px 10px', background: '#fff7ed', borderRadius: '7px', fontSize: '10px', color: '#ff6600', fontWeight: 'bold' }}>
                    {selectedItem.Category || selectedItem.Department}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedItem(null)} style={{ background: '#f8fafc', border: 'none', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', color: '#64748b', flexShrink: 0 }}>✕</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              {selectedItem.type === 'job' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '14px' }}>
                  {selectedItem.Start_Date && (
                    <div style={{ padding: '14px', background: '#eff6ff', borderRadius: '12px' }}>
                      <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '3px' }}>{t.startDate}</p>
                      <p style={{ fontSize: '14px', color: '#1a202c', fontWeight: 'bold' }}>📅 {selectedItem.Start_Date}</p>
                    </div>
                  )}
                  {selectedItem.Last_Date && (
                    <div style={{ padding: '14px', background: '#fef2f2', borderRadius: '12px' }}>
                      <p style={{ fontSize: '10px', color: '#dc2626', fontWeight: 'bold', marginBottom: '3px' }}>{t.lastDate}</p>
                      <p style={{ fontSize: '14px', color: '#1a202c', fontWeight: 'bold' }}>📅 {selectedItem.Last_Date}</p>
                    </div>
                  )}
                  {selectedItem.Fee && (
                    <div style={{ padding: '14px', background: '#f0fdf4', borderRadius: '12px' }}>
                      <p style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold', marginBottom: '3px' }}>{t.fee}</p>
                      <p style={{ fontSize: '14px', color: '#1a202c', fontWeight: 'bold' }}>💰 {selectedItem.Fee}</p>
                    </div>
                  )}
                  {selectedItem.Qualification && (
                    <div style={{ padding: '14px', background: '#eff6ff', borderRadius: '12px' }}>
                      <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '3px' }}>{t.qualification}</p>
                      <p style={{ fontSize: '13px', color: '#1a202c' }}>{selectedItem.Qualification}</p>
                    </div>
                  )}
                  {selectedItem.Age && (
                    <div style={{ padding: '14px', background: '#fef3c7', borderRadius: '12px', gridColumn: selectedItem.Qualification ? 'auto' : 'span 2' }}>
                      <p style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '3px' }}>{t.age}</p>
                      <p style={{ fontSize: '13px', color: '#1a202c' }}>{selectedItem.Age}</p>
                    </div>
                  )}
                </div>
              )}
              
              {(selectedItem.type === 'farmer' || selectedItem.type === 'student') && (
                <div style={{ marginBottom: '14px' }}>
                  {selectedItem.Benefit && (
                    <div style={{ padding: '14px', background: '#f0fdf4', borderRadius: '12px', marginBottom: '8px' }}>
                      <p style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold', marginBottom: '3px' }}>{t.benefit}</p>
                      <p style={{ fontSize: '13px', color: '#1a202c' }}>{selectedItem.Benefit}</p>
                    </div>
                  )}
                  {selectedItem.Eligibility && (
                    <div style={{ padding: '14px', background: '#eff6ff', borderRadius: '12px', marginBottom: '8px' }}>
                      <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '3px' }}>{t.eligibility}</p>
                      <p style={{ fontSize: '13px', color: '#1a202c' }}>{selectedItem.Eligibility}</p>
                    </div>
                  )}
                </div>
              )}
              
              {(selectedItem.Documents || selectedItem.Documents_Required) && (
                <div style={{ padding: '14px', background: '#fef3c7', borderRadius: '12px', marginBottom: '14px' }}>
                  <p style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '8px' }}>{t.documents}</p>
                  <p style={{ fontSize: '13px', color: '#1a202c', lineHeight: '1.6' }}>{selectedItem.Documents || selectedItem.Documents_Required}</p>
                </div>
              )}
              
              {(selectedItem.Description || selectedItem.Details) && (
                <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '14px', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
                  {selectedItem.Description || selectedItem.Details}
                </p>
              )}
            </div>

            <a href={`https://api.whatsapp.com/send?phone=919011083440&text=${encodeURIComponent('नमस्कार साईराम महा-ई-सेवा केंद्र, मला "' + (selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || selectedItem.Scheme_Name || selectedItem.Card_Name) + '" या फॉर्म भरायचा आहे मला माहिती हवी आहे.')}`} target="_blank" rel="noopener noreferrer" style={{ width: '100%', background: '#25d366', color: 'white', padding: '16px', borderRadius: '13px', border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', textDecoration: 'none' }}>
              <span style={{ fontSize: '22px' }}>💬</span>
              <span>{t.applyNow}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
