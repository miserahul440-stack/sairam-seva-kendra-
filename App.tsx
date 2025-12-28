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
    close: 'बंद करा', notifications: 'सूचना', noNotifications: 'सध्या कोणत्याही सूचना नाहीत',
    directSevaPortal: 'Direct Seva Portal', allGovtServices: 'सर्व शासकीय सेवा एकाच ठिकाणी!',
    description: 'शेतकरी योजना, महा-ई-सेवा, स्कॉलरशिप आणि बरंच काही...', seeUpdates: 'Updates पहा',
    jobRecruitmentUpdates: 'नोकरी भरती Updates', lastDate: 'शेवटची तारीख', fee: 'शुल्क',
    qualification: 'पात्रता', age: 'वय', director: 'संचालक', callNow: 'आत्ताच कॉल करा',
    farmerSchemes: 'शेतकरी योजना', studentPortal: 'विद्यार्थी कक्ष', jobAlerts: 'नोकरी अलर्ट',
    eSeva: 'महा-ई-सेवा', idCards: 'ओळखपत्र', otherServices: 'इतर सेवा',
    benefit: 'लाभ', eligibility: 'पात्रता', documents: 'कागदपत्रे', department: 'विभाग',
    email: 'ईमेल'
  },
  en: {
    home: 'Home', updates: 'Updates', contact: 'Contact', back: 'Back', applyNow: 'I Want to Apply',
    close: 'Close', notifications: 'Notifications', noNotifications: 'No notifications available',
    directSevaPortal: 'Direct Seva Portal', allGovtServices: 'All Government Services in One Place!',
    description: 'Farmer schemes, e-Services, Scholarships and much more...', seeUpdates: 'See Updates',
    jobRecruitmentUpdates: 'Job Recruitment Updates', lastDate: 'Last Date', fee: 'Fee',
    qualification: 'Qualification', age: 'Age', director: 'Director', callNow: 'Call Now',
    farmerSchemes: 'Farmer Schemes', studentPortal: 'Student Portal', jobAlerts: 'Job Alerts',
    eSeva: 'e-Services', idCards: 'ID Cards', otherServices: 'Other Services',
    benefit: 'Benefit', eligibility: 'Eligibility', documents: 'Documents', department: 'Department',
    email: 'Email'
  },
  hi: {
    home: 'होम', updates: 'अपडेट्स', contact: 'संपर्क', back: 'वापस', applyNow: 'मुझे आवेदन करना है',
    close: 'बंद करें', notifications: 'सूचनाएं', noNotifications: 'फिलहाल कोई सूचना नहीं है',
    directSevaPortal: 'Direct Seva Portal', allGovtServices: 'सभी सरकारी सेवाएं एक जगह!',
    description: 'किसान योजना, ई-सेवाएं, छात्रवृत्ति और बहुत कुछ...', seeUpdates: 'अपडेट देखें',
    jobRecruitmentUpdates: 'नौकरी भर्ती अपडेट्स', lastDate: 'अंतिम तिथि', fee: 'शुल्क',
    qualification: 'योग्यता', age: 'आयु', director: 'निदेशक', callNow: 'अभी कॉल करें',
    farmerSchemes: 'किसान योजना', studentPortal: 'छात्र पोर्टल', jobAlerts: 'नौकरी अलर्ट',
    eSeva: 'ई-सेवाएं', idCards: 'पहचान पत्र', otherServices: 'अन्य सेवाएं',
    benefit: 'लाभ', eligibility: 'पात्रता', documents: 'दस्तावेज', department: 'विभाग',
    email: 'ईमेल'
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
    const phone = (settings.WHATSAPP_NUMBER || '919011083440').replace(/\D/g, '');
    const message = encodeURIComponent(`नमस्कार साईराम महा-ई-सेवा केंद्र, मला "${itemName}" या फॉर्म भरायचा आहे मला माहिती हवी आहे.`);
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
  };

  const sendEmail = () => {
    window.location.href = 'mailto:sairamcomputer440@gmail.com';
  };

  const cycleLang = () => {
    const langs = ['mr', 'en', 'hi'];
    setLanguage(langs[(langs.indexOf(language) + 1) % langs.length]);
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
            <section style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '24px', padding: '40px 28px', color: 'white', marginBottom: '28px', boxShadow: '0 16px 32px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ff6600', padding: '5px 14px', borderRadius: '16px', fontSize: '10px', fontWeight: 'bold', marginBottom: '16px', textTransform: 'uppercase' }}>
                {t.directSevaPortal}
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', lineHeight: '1.2' }}>{t.allGovtServices}</h2>
              <p style={{ fontSize: '14px', opacity: 0.85, marginBottom: '20px', lineHeight: '1.5' }}>{t.description}</p>
              <button onClick={() => setActiveTab('updates')} style={{ background: 'white', color: '#1e293b', padding: '12px 24px', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
                {t.seeUpdates} →
              </button>
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
                    <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#1a202c', marginBottom: '3px' }}>{item.Service_Name || item.Yojana_Name || item.Scheme_Name || item.Job_Name || item.Card_Name || item.Service_Name}</h3>
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
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '20px', color: '#1a202c' }}>📢 {t.jobRecruitmentUpdates}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {jobs.map((job, i) => (
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
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#f8fafc', padding: '16px', borderRadius: '14px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>📞</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c' }}>{settings.PHONE_NUMBER || '9011083440'}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#f8fafc', padding: '16px', borderRadius: '14px', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>📧</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a202c' }}>sairamcomputer440@gmail.com</span>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => window.open(`tel:${settings.PHONE_NUMBER || '9011083440'}`)} style={{ flex: 1, background: '#ff6600', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 3px 10px rgba(255,102,0,0.3)' }}>
                  📞 {t.callNow}
                </button>
                <button onClick={sendEmail} style={{ flex: 1, background: '#1a202c', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
                  📧 {t.email}
                </button>
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
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '18px', color: '#1a202c' }}>🔔 {t.notifications}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '18px' }}>
              {NOTIFICATION_CATEGORIES.map(cat => (
                <div key={cat.id} style={{ padding: '14px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', marginBottom: '6px' }}>{cat.icon}</div>
                  <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#1a202c', marginBottom: '2px' }}>{cat.label}</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: cat.color }}>
                    {cat.id === 'farmer' && shetkari.length}
                    {cat.id === 'student' && vidyarthi.length}
                    {cat.id === 'jobs' && jobs.length}
                    {cat.id === 'eseva' && (services.length + olakh.length)}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px', maxHeight: '200px', overflowY: 'auto' }}>
              {notifications.length > 0 ? notifications.map((notif, i) => (
                <div key={i} style={{ padding: '14px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a202c', marginBottom: '3px' }}>{notif.Title}</p>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>{notif.Message}</p>
                </div>
              )) : (
                <p style={{ textAlign: 'center', color: '#64748b', padding: '18px' }}>{t.noNotifications}</p>
              )}
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
                  <div style={{ padding: '14px', background: '#fef2f2', borderRadius: '12px' }}>
                    <p style={{ fontSize: '10px', color: '#dc2626', fontWeight: 'bold', marginBottom: '3px' }}>{t.lastDate}</p>
                    <p style={{ fontSize: '15px', color: '#1a202c', fontWeight: 'bold' }}>📅 {selectedItem.Last_Date}</p>
                  </div>
                  <div style={{ padding: '14px', background: '#f0fdf4', borderRadius: '12px' }}>
                    <p style={{ fontSize: '10px', color: '#10b981', fontWeight: 'bold', marginBottom: '3px' }}>{t.fee}</p>
                    <p style={{ fontSize: '15px', color: '#1a202c', fontWeight: 'bold' }}>💰 {selectedItem.Fee}</p>
                  </div>
                  {selectedItem.Qualification && (
                    <div style={{ padding: '14px', background: '#eff6ff', borderRadius: '12px' }}>
                      <p style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '3px' }}>{t.qualification}</p>
                      <p style={{ fontSize: '13px', color: '#1a202c' }}>{selectedItem.Qualification}</p>
                    </div>
                  )}
                  {selectedItem.Age && (
                    <div style={{ padding: '14px', background: '#fef3c7', borderRadius: '12px' }}>
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
                  {selectedItem.Documents && (
                    <div style={{ padding: '14px', background: '#fef3c7', borderRadius: '12px' }}>
                      <p style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '3px' }}>{t.documents}</p>
                      <p style={{ fontSize: '13px', color: '#1a202c' }}>{selectedItem.Documents}</p>
                    </div>
                  )}
                </div>
              )}
              
              <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '14px' }}>
                {selectedItem.Description || selectedItem.Details || selectedItem.Benefit || ''}
              </p>
            </div>

            <button onClick={() => sendWhatsApp(selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || selectedItem.Scheme_Name || selectedItem.Card_Name)} style={{ width: '100%', background: '#25d366', color: 'white', padding: '15px', borderRadius: '13px', border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}>
              <span style={{ fontSize: '22px' }}>💬</span>
              <span>{t.applyNow}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
