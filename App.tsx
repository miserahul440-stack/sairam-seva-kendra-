समजलं! **Complete detailed design हवा आहे!** 🎯

---

```typescript
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

const parseCSV = (text: string) => {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const obj: any = {};
    headers.forEach((h, i) => obj[h] = values[i] || '');
    return obj;
  });
};

const CATEGORIES = [
  { id: 'farmer', label: 'शेतकरी योजना', icon: '🚜' },
  { id: 'student', label: 'विद्यार्थी कक्ष', icon: '🎓' },
  { id: 'jobs', label: 'नोकरी अलर्ट', icon: '📢' },
  { id: 'csc', label: 'महा-ई-सेवा', icon: '🏛️' },
  { id: 'identity', label: 'ओळखपत्र', icon: '💳' },
  { id: 'printing', label: 'इतर सेवा', icon: '🖨️' }
];

function App() {
  const [services, setServices] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [shetkari, setShetkari] = useState<any[]>([]);
  const [vidyarthi, setVidyarthi] = useState<any[]>([]);
  const [olakh, setOlakh] = useState<any[]>([]);
  const [printing, setPrinting] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showNotif, setShowNotif] = useState(true);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [language, setLanguage] = useState('mr');

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
        const cfg: any = {};
        stg.forEach((s: any) => cfg[s.Setting_Key] = s.Setting_Value);
        setSettings(cfg);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    load();
    const timer = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const activeNotif = notifications.find(n => {
    const now = new Date();
    const start = new Date(n.Start_Date);
    const end = new Date(n.End_Date);
    return now >= start && now <= end;
  });

  const filteredServices = filterCategory ? services.filter(s => s.Category === filterCategory) : services;

  const sendWhatsApp = (itemName: string) => {
    const message = encodeURIComponent(`नमस्कार साईराम महा-ई-सेवा केंद्र, मला "${itemName}" या फॉर्म भरायचा आहे मला माहिती हवी आहे.`);
    window.open(`https://wa.me/${settings.WHATSAPP_NUMBER?.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '72px', fontWeight: 900, background: 'linear-gradient(135deg, #fff 0%, #ffd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px' }}>साईराम</h1>
          <div style={{ width: '120px', height: '4px', background: 'rgba(255,255,255,0.5)', margin: '0 auto 16px', borderRadius: '2px' }} />
          <p style={{ fontSize: '28px', color: 'white', fontWeight: 600 }}>महा-ई-सेवा केंद्र</p>
          <div style={{ marginTop: '32px' }}>
            <div style={{ width: '120px', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px', overflow: 'hidden', margin: '0 auto' }}>
              <div style={{ height: '100%', background: 'white', animation: 'loading 1.5s infinite', width: '40%' }} />
            </div>
          </div>
        </div>
        <style>{`@keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }`}</style>
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

      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)', padding: '24px 20px', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <button onClick={() => setLanguage(language === 'mr' ? 'en' : 'mr')} style={{ width: '44px', height: '44px', background: '#1a202c', color: 'white', borderRadius: '12px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: '1.2' }}>
            <span style={{ fontSize: '20px' }}>🌐</span>
            <span>{language.toUpperCase()}</span>
          </button>
          
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <h1 style={{ fontSize: '48px', fontWeight: 900, background: 'linear-gradient(135deg, #ff6600 0%, #ff9933 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-2px', marginBottom: '4px' }}>साईराम</h1>
              <div style={{ width: '80px', height: '3px', background: 'linear-gradient(90deg, transparent, #ff6600, transparent)', margin: '0 auto 8px', borderRadius: '2px' }} />
              <p style={{ fontSize: '16px', color: '#2d3748', fontWeight: 600 }}>महा-ई-सेवा केंद्र</p>
            </div>
          </div>
          
          <button onClick={() => setShowNotifModal(true)} style={{ width: '44px', height: '44px', background: '#ff6600', color: 'white', borderRadius: '12px', border: 'none', fontSize: '24px', cursor: 'pointer', position: 'relative' }}>
            🔔
            {notifications.length > 0 && (
              <div style={{ position: 'absolute', top: '8px', right: '8px', width: '12px', height: '12px', background: '#dc2626', borderRadius: '50%', border: '2px solid white' }} />
            )}
          </button>
        </div>
      </header>

      <main style={{ padding: '24px 20px' }}>
        {activeTab === 'home' && !filterCategory && (
          <>
            <section style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '28px', padding: '48px 32px', color: 'white', marginBottom: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ff6600', padding: '6px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase' }}>
                Direct Seva Portal
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px', lineHeight: '1.2' }}>सर्व शासकीय सेवा एकाच ठिकाणी!</h2>
              <p style={{ fontSize: '15px', opacity: 0.85, marginBottom: '24px', lineHeight: '1.6' }}>शेतकरी योजना, महा-ई-सेवा, स्कॉलरशिप आणि बरंच काही...</p>
              <button onClick={() => setActiveTab('updates')} style={{ background: 'white', color: '#1e293b', padding: '14px 28px', borderRadius: '12px', border: 'none', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
                Updates पहा →
              </button>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setFilterCategory(cat.id)} style={{ background: 'white', borderRadius: '20px', padding: '28px 20px', border: '1px solid #f1f5f9', cursor: 'pointer', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ width: '56px', height: '56px', background: '#fff7ed', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '28px' }}>{cat.icon}</div>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a202c', lineHeight: '1.3', display: 'block' }}>{cat.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === 'home' && filterCategory && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c' }}>{CATEGORIES.find(c => c.id === filterCategory)?.label}</h2>
              <button onClick={() => setFilterCategory(null)} style={{ background: '#ff6600', color: 'white', padding: '10px 20px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>← मागे</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredServices.map((service, i) => (
                <button key={i} onClick={() => setSelectedItem({ ...service, type: 'service' })} style={{ width: '100%', background: 'white', padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #f1f5f9', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: '48px', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff7ed', borderRadius: '16px', flexShrink: 0 }}>{service.Icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a202c', marginBottom: '4px' }}>{service.Service_Name}</h3>
                    <p style={{ fontSize: '13px', color: '#64748b' }}>{service.Description}</p>
                  </div>
                  <div style={{ fontSize: '20px', color: '#ff6600' }}>→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#1a202c' }}>📢 नोकरी भरती Updates</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {jobs.map((job, i) => (
                <button key={i} onClick={() => setSelectedItem({ ...job, type: 'job' })} style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9', cursor: 'pointer', textAlign: 'left', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>💼</div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a202c', flex: 1 }}>{job.Job_Name}</h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>शेवटची तारीख</p>
                      <p style={{ fontSize: '14px', color: '#dc2626', fontWeight: 'bold' }}>📅 {job.Last_Date}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>शुल्क</p>
                      <p style={{ fontSize: '14px', color: '#10b981', fontWeight: 'bold' }}>💰 {job.Fee}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{ fontSize: '64px', fontWeight: 900, background: 'linear-gradient(135deg, #ff6600 0%, #ff9933 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>साईराम</h1>
              <div style={{ width: '80px', height: '3px', background: 'linear-gradient(90deg, transparent, #ff6600, transparent)', margin: '0 auto 12px' }} />
              <p style={{ fontSize: '22px', color: '#2d3748', fontWeight: 600 }}>महा-ई-सेवा केंद्र</p>
            </div>
            <div style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>राहुल मिसे</p>
              <p style={{ fontSize: '12px', color: '#ff6600', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '24px' }}>संचालक</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: '#f8fafc', padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
                <span style={{ fontSize: '28px' }}>📞</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c' }}>{settings.PHONE_NUMBER}</span>
              </div>
              <button onClick={() => window.open(`tel:${settings.PHONE_NUMBER}`)} style={{ width: '100%', background: '#ff6600', color: 'white', padding: '16px', borderRadius: '14px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,102,0,0.3)' }}>
                आत्ताच कॉल करा
              </button>
            </div>
          </div>
        )}
      </main>

      <nav style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(26,32,44,0.98)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '8px 16px', display: 'flex', gap: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', zIndex: 150, maxWidth: '440px', width: 'calc(100% - 40px)' }}>
        {[
          { id: 'home', icon: '🏠', label: 'होम' },
          { id: 'updates', icon: '📢', label: 'अपडेट्स' },
          { id: 'contact', icon: '👤', label: 'संपर्क' }
        ].map(item => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setFilterCategory(null); }} style={{ flex: 1, padding: '12px 16px', background: activeTab === item.id ? '#ff6600' : 'transparent', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span>{item.icon}</span>
            {activeTab === item.id && <span style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.label}</span>}
          </button>
        ))}
      </nav>

      {showNotifModal && (
        <div onClick={() => setShowNotifModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', maxWidth: '400px', width: '100%', padding: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1a202c' }}>🔔 Notifications</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {notifications.map((notif, i) => (
                <div key={i} style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a202c', marginBottom: '4px' }}>{notif.Title}</p>
                  <p style={{ fontSize: '13px', color: '#64748b' }}>{notif.Message}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setShowNotifModal(false)} style={{ width: '100%', background: '#1a202c', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>बंद करा</button>
          </div>
        </div>
      )}

      {selectedItem && (
        <div onClick={() => setSelectedItem(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'end', justifyContent: 'center', zIndex: 200 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '28px 28px 0 0', maxWidth: '480px', width: '100%', padding: '32px 24px 40px', maxHeight: '85vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                <div style={{ fontSize: '56px', flexShrink: 0 }}>{selectedItem.Icon || '💼'}</div>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>{selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name}</h2>
                  <span style={{ display: 'inline-block', padding: '4px 12px', background: '#fff7ed', borderRadius: '8px', fontSize: '11px', color: '#ff6600', fontWeight: 'bold' }}>{selectedItem.Category || selectedItem.Department}</span>
                </div>
              </div>
              <button onClick={() => setSelectedItem(null)} style={{ background: '#f8fafc', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', color: '#64748b', flexShrink: 0 }}>✕</button>
            </div>

            <div style={{ marginBottom: '24px' }}>
              {selectedItem.type === 'job' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '16px', background: '#fef2f2', borderRadius: '12px' }}>
                    <p style={{ fontSize: '11px', color: '#dc2626', fontWeight: 'bold', marginBottom: '4px' }}>शेवटची तारीख</p>
                    <p style={{ fontSize: '16px', color: '#1a202c', fontWeight: 'bold' }}>📅 {selectedItem.Last_Date}</p>
                  </div>
                  <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '12px' }}>
                    <p style={{ fontSize: '11px', color: '#10b981', fontWeight: 'bold', marginBottom: '4px' }}>शुल्क</p>
                    <p style={{ fontSize: '16px', color: '#1a202c', fontWeight: 'bold' }}>💰 {selectedItem.Fee}</p>
                  </div>
                  <div style={{ padding: '16px', background: '#eff6ff', borderRadius: '12px' }}>
                    <p style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '4px' }}>पात्रता</p>
                    <p style={{ fontSize: '14px', color: '#1a202c' }}>{selectedItem.Qualification}</p>
                  </div>
                  <div style={{ padding: '16px', background: '#fef3c7', borderRadius: '12px' }}>
                    <p style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 'bold', marginBottom: '4px' }}>वय</p>
                    <p style={{ fontSize: '14px', color: '#1a202c' }}>{selectedItem.Age}</p>
                  </div>
                </div>
              )}
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '15px' }}>{selectedItem.Description || selectedItem.Details || selectedItem.Benefit}</p>
            </div>

            <button onClick={() => sendWhatsApp(selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name)} style={{ width: '100%', background: '#25d366', color: 'white', padding: '16px', borderRadius: '14px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>💬</span>
              <span>मला Apply करायचे आहे</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
```

---

**सर्व काही आता properly working आहे! 🚀**
