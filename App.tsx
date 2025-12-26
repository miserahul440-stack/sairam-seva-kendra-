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
  { id: 'farmer', label: 'शेतकरी योजना', icon: '🚜', color: '#ff6600' },
  { id: 'student', label: 'विद्यार्थी कक्ष', icon: '🎓', color: '#3b82f6' },
  { id: 'jobs', label: 'नोकरी अलर्ट', icon: '📢', color: '#dc2626' },
  { id: 'csc', label: 'महा-ई-सेवा', icon: '🏛️', color: '#6366f1' },
  { id: 'identity', label: 'ओळखपत्र', icon: '💳', color: '#10b981' },
  { id: 'printing', label: 'इतर सेवा', icon: '🖨️', color: '#ec4899' }
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
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showNotif, setShowNotif] = useState(true);

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

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '40px' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px', animation: 'pulse 2s infinite' }}>⏳</div>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>साईराम</h1>
        <p style={{ fontSize: '24px', opacity: 0.9 }}>महा-ई-सेवा केंद्र</p>
      </div>
    );
  }

  const filteredServices = filterCategory ? services.filter(s => s.Category === filterCategory) : services;

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', paddingBottom: '120px' }}>
      {showNotif && activeNotif && (
        <div style={{ background: activeNotif.Priority === 'High' ? '#f56565' : '#ed8936', color: 'white', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>🔔</span>
            <span><strong>{activeNotif.Title}:</strong> {activeNotif.Message}</span>
          </div>
          <button onClick={() => setShowNotif(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '24px' }}>✕</button>
        </div>
      )}

      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px', letterSpacing: '-1px' }}>साईराम</h1>
          <p style={{ fontSize: '18px', color: '#718096' }}>महा-ई-सेवा केंद्र</p>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
        {activeTab === 'home' && !filterCategory && (
          <>
            <section style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '24px', padding: '60px 40px', color: 'white', marginBottom: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
              <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ff6600', padding: '8px 20px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold', marginBottom: '24px' }}>
                  <span>Direct Seva Portal</span>
                </div>
                <h2 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2' }}>सर्व शासकीय सेवा एकाच ठिकाणी!</h2>
                <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '32px' }}>शेतकरी योजना, महा-ई-सेवा, स्कॉलरशिप आणि बरंच काही...</p>
                <button onClick={() => setActiveTab('updates')} style={{ background: 'white', color: '#1e293b', padding: '16px 40px', borderRadius: '12px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  Updates पहा →
                </button>
              </div>
            </section>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setFilterCategory(cat.id)} style={{ background: 'white', borderRadius: '20px', padding: '32px 24px', border: 'none', cursor: 'pointer', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}>
                  <div style={{ width: '64px', height: '64px', background: `linear-gradient(135deg, ${cat.color}22, ${cat.color}11)`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '32px' }}>
                    {cat.icon}
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748' }}>{cat.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === 'home' && filterCategory && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2d3748' }}>
                {CATEGORIES.find(c => c.id === filterCategory)?.label}
              </h2>
              <button onClick={() => setFilterCategory(null)} style={{ background: '#ff6600', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                ← मागे जा
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {filteredServices.map((service, i) => (
                <div key={i} onClick={() => setSelectedService(service)} style={{ background: 'white', borderRadius: '20px', padding: '24px', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>{service.Icon}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>{service.Service_Name}</h3>
                  <p style={{ color: '#718096', fontSize: '14px', marginBottom: '12px', lineHeight: '1.6' }}>{service.Description}</p>
                  <div style={{ display: 'inline-block', padding: '6px 14px', background: '#edf2f7', borderRadius: '8px', fontSize: '12px', color: '#4a5568', fontWeight: 'bold' }}>
                    {service.Category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px', color: '#2d3748' }}>📢 Latest Updates</h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {jobs.map((job, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '20px' }}>
                    <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>
                      💼
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', color: '#2d3748' }}>{job.Job_Name}</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <span style={{ fontSize: '12px', color: '#718096', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>विभाग</span>
                          <span style={{ color: '#2d3748' }}>{job.Department}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', color: '#718096', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>शेवटची तारीख</span>
                          <span style={{ color: '#e53e3e', fontWeight: 'bold' }}>📅 {job.Last_Date}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', color: '#718096', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>पात्रता</span>
                          <span style={{ color: '#2d3748' }}>{job.Qualification}</span>
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', color: '#718096', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>शुल्क</span>
                          <span style={{ color: '#38a169', fontWeight: 'bold' }}>💰 {job.Fee}</span>
                        </div>
                      </div>
                      <p style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '16px' }}>{job.Details}</p>
                      <button style={{ background: '#ff6600', color: 'white', padding: '12px 28px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                        अधिक माहिती →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '16px', color: '#2d3748' }}>साईराम</h1>
            <p style={{ fontSize: '24px', color: '#718096', marginBottom: '40px' }}>महा-ई-सेवा केंद्र</p>
            <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '48px', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>राहुल मिसे</p>
                <p style={{ fontSize: '14px', color: '#ff6600', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>संचालक</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', background: '#f7fafc', padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
                <span style={{ fontSize: '32px' }}>📞</span>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#2d3748' }}>9011083440</span>
              </div>
              <button onClick={() => window.open('tel:9011083440')} style={{ width: '100%', background: '#ff6600', color: 'white', padding: '20px', borderRadius: '16px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 16px rgba(255,102,0,0.3)' }}>
                आत्ताच कॉल करा
              </button>
            </div>
          </div>
        )}
      </main>

      <nav style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(30,41,59,0.95)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '12px 20px', display: 'flex', gap: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', zIndex: 150 }}>
        {[
          { id: 'home', label: '🏠', title: 'होम' },
          { id: 'updates', label: '📢', title: 'अपडेट्स' },
          { id: 'contact', label: '👤', title: 'संपर्क' }
        ].map(item => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setFilterCategory(null); }} style={{ padding: '14px 24px', background: activeTab === item.id ? '#ff6600' : 'transparent', color: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer', fontSize: '24px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{item.label}</span>
            {activeTab === item.id && <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.title}</span>}
          </button>
        ))}
      </nav>

      {selectedService && (
        <div onClick={() => setSelectedService(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 200 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', maxWidth: '600px', width: '100%', padding: '40px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '64px' }}>{selectedService.Icon}</div>
                <div>
                  <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>{selectedService.Service_Name}</h2>
                  <span style={{ display: 'inline-block', padding: '6px 14px', background: '#edf2f7', borderRadius: '8px', fontSize: '12px', color: '#4a5568', fontWeight: 'bold' }}>{selectedService.Category}</span>
                </div>
              </div>
              <button onClick={() => setSelectedService(null)} style={{ background: '#f7fafc', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '20px', color: '#718096' }}>✕</button>
            </div>
            <p style={{ color: '#4a5568', lineHeight: '1.8', marginBottom: '32px', fontSize: '16px' }}>{selectedService.Description}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={`tel:${settings.PHONE_NUMBER}`} style={{ flex: 1, padding: '16px', background: '#48bb78', color: 'white', textAlign: 'center', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>
                📞 संपर्क करा
              </a>
              <a href={`https://wa.me/${settings.WHATSAPP_NUMBER?.replace(/\D/g, '')}`} style={{ flex: 1, padding: '16px', background: '#25d366', color: 'white', textAlign: 'center', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
