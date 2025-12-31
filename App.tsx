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

function App() {
  const [data, setData] = useState({ services: [], jobs: [], shetkari: [], vidyarthi: [], olakh: [], printing: [], notifications: [], settings: {} });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [filterCat, setFilterCat] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [lang, setLang] = useState('mr');

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

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FEF3C7, #FED7AA)' }}>
        <div style={{ fontSize: '64px', fontWeight: 900, color: '#EA580C', marginBottom: '20px' }}>साईराम</div>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#EA580C', padding: '10px 24px', background: 'white', borderRadius: '12px', border: '2px solid #EA580C' }}>महा-ई-सेवा केंद्र</div>
        <p style={{ color: '#EA580C', marginTop: '24px', fontSize: '16px', fontWeight: 600 }}>लोड होत आहे...</p>
      </div>
    );
  }

  const categories = [
    { id: 'farmer', label: 'शेतकरी योजना', icon: '🌾', color: '#16A34A', bg: '#DCFCE7' },
    { id: 'student', label: 'विद्यार्थी कक्ष', icon: '🎓', color: '#2563EB', bg: '#DBEAFE' },
    { id: 'jobs', label: 'नोकरी अलर्ट', icon: '📢', color: '#DC2626', bg: '#FEE2E2' },
    { id: 'csc', label: 'महा-ई-सेवा', icon: '🏛️', color: '#7C3AED', bg: '#EDE9FE' },
    { id: 'identity', label: 'ओळखपत्र', icon: '💳', color: '#D97706', bg: '#FEF3C7' },
    { id: 'printing', label: 'इतर सेवा', icon: '🖨️', color: '#DB2777', bg: '#FCE7F3' }
  ];

  const filtered = getFilteredData();

  return (
    <div style={{ minHeight: '100vh', background: '#FFF7ED', paddingBottom: '80px' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white', padding: '12px 16px', borderBottom: '2px solid #FDBA74', boxShadow: '0 2px 8px rgba(234,88,12,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setLang(lang === 'mr' ? 'en' : lang === 'en' ? 'hi' : 'mr')} style={{ width: '40px', height: '40px', background: 'white', color: '#EA580C', borderRadius: '10px', border: '2px solid #FDBA74', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🌐</button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#EA580C' }}>साईराम</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#EA580C' }}>महा-ई-सेवा केंद्र</div>
          </div>
          <button onClick={() => setShowNotifModal(true)} style={{ width: '40px', height: '40px', background: '#EA580C', color: 'white', borderRadius: '10px', border: 'none', fontSize: '20px', cursor: 'pointer' }}>🔔</button>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {activeTab === 'home' && !filterCat && (
          <>
            <div style={{ background: 'linear-gradient(135deg, #EA580C, #FB923C)', borderRadius: '16px', padding: '32px 24px', color: 'white', marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '44px', marginBottom: '12px' }}>🏛️</div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>सर्व शासकीय सेवा एकाच ठिकाणी!</h2>
              <button onClick={() => window.scrollTo({ top: 260, behavior: 'smooth' })} style={{ background: 'white', color: '#EA580C', padding: '12px 28px', borderRadius: '10px', border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>सेवा पहा →</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setFilterCat(cat.id)} style={{ background: 'white', borderRadius: '14px', padding: '20px 14px', border: `2px solid ${cat.color}30`, cursor: 'pointer', textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', background: cat.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 10px' }}>{cat.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: cat.color }}>{cat.label}</div>
                  <div style={{ display: 'inline-block', background: cat.color, color: 'white', padding: '3px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, marginTop: '6px' }}>
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
            <div style={{ background: categories.find(c => c.id === filterCat)?.bg, padding: '14px 16px', borderRadius: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: categories.find(c => c.id === filterCat)?.color, margin: 0 }}>
                {categories.find(c => c.id === filterCat)?.icon} {categories.find(c => c.id === filterCat)?.label}
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.map((item, i) => (
                <button key={i} onClick={() => setSelectedItem({ ...item, type: filterCat })} style={{ width: '100%', background: 'white', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontSize: '36px' }}>{item.Icon || '📄'}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937', marginBottom: '4px' }}>{item.Service_Name || item.Yojana_Name || item.Scheme_Name || item.Job_Name || item.Card_Name}</h3>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{item.Description || item.Benefit || item.Department || ''}</p>
                  </div>
                  <div style={{ fontSize: '18px', color: categories.find(c => c.id === filterCat)?.color }}>→</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>📢 अपडेट्स</h2>
            {[...data.jobs, ...data.shetkari].slice(0, 10).map((item, i) => (
              <button key={i} onClick={() => setSelectedItem(item)} style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '12px', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{item.Job_Name || item.Yojana_Name}</h3>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{item.Department || item.Benefit}</p>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'contact' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 900, color: '#EA580C', marginBottom: '8px' }}>साईराम</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#EA580C', marginBottom: '24px' }}>महा-ई-सेवा केंद्र</div>
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px 20px' }}>
              <div style={{ width: '90px', height: '90px', background: 'linear-gradient(135deg, #EA580C, #FB923C)', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px' }}>👤</div>
              <p style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>राहुल मिसे</p>
              <p style={{ fontSize: '11px', color: '#EA580C', fontWeight: 600, marginBottom: '18px' }}>संचालक</p>
              <div style={{ marginBottom: '20px', padding: '14px', background: '#FFF7ED', borderRadius: '10px' }}>
                <p style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>📞 9011083440</p>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>📧 sairamcomputer440@gmail.com</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="tel:9011083440" style={{ background: 'linear-gradient(135deg, #EA580C, #FB923C)', color: 'white', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>📞 कॉल करा</a>
                <a href="https://wa.me/919011083440?text=नमस्कार%20साईराम%20सेवा%20केंद्र" target="_blank" rel="noopener noreferrer" style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: 'white', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>💬 WhatsApp</a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: '12px', left: '50%', transform: 'translateX(-50%)', background: 'white', borderRadius: '16px', padding: '6px 8px', display: 'flex', gap: '6px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 150, width: 'calc(100% - 32px)', maxWidth: '380px', border: '2px solid #FDBA74' }}>
        {[{ id: 'home', icon: '🏠', label: 'होम' }, { id: 'updates', icon: '📢', label: 'अपडेट्स' }, { id: 'contact', icon: '👤', label: 'संपर्क' }].map(item => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setFilterCat(null); }} style={{ flex: 1, padding: '10px', background: activeTab === item.id ? '#EA580C' : 'transparent', color: activeTab === item.id ? 'white' : '#9CA3AF', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span>{item.icon}</span>
            {activeTab === item.id && <span style={{ fontSize: '8px', fontWeight: 700 }}>{item.label}</span>}
          </button>
        ))}
      </div>

      {showNotifModal && (
        <div onClick={() => setShowNotifModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '16px', maxWidth: '380px', width: '100%', padding: '24px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>🔔 सूचना</h2>
              <button onClick={() => setShowNotifModal(false)} style={{ background: '#F3F4F6', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px' }}>✕</button>
            </div>
            {data.notifications.map((n, i) => (
              <div key={i} style={{ padding: '12px', background: '#F9FAFB', borderRadius: '10px', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{n.Title}</h3>
                <p style={{ fontSize: '11px', color: '#6B7280', margin: 0 }}>{n.Message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedItem && (
        <div onClick={() => setSelectedItem(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'end', justifyContent: 'center', zIndex: 200 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: '480px', padding: '24px 18px 32px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 700, flex: 1, margin: 0 }}>{selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || selectedItem.Scheme_Name || selectedItem.Card_Name}</h2>
              <button onClick={() => setSelectedItem(null)} style={{ background: '#F3F4F6', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px' }}>✕</button>
            </div>
            <div style={{ marginBottom: '18px' }}>
              {selectedItem.Start_Date && (
                <div style={{ padding: '10px', background: '#DBEAFE', borderRadius: '8px', marginBottom: '8px' }}>
                  <p style={{ fontSize: '10px', color: '#2563EB', fontWeight: 600, marginBottom: '3px' }}>सुरुवात</p>
                  <p style={{ fontSize: '12px', fontWeight: 600, margin: 0 }}>📅 {selectedItem.Start_Date}</p>
                </div>
              )}
              {selectedItem.Last_Date && (
                <div style={{ padding: '10px', background: '#FEE2E2', borderRadius: '8px', marginBottom: '8px' }}>
                  <p style={{ fontSize: '10px', color: '#DC2626', fontWeight: 600, marginBottom: '3px' }}>शेवटची तारीख</p>
                  <p style={{ fontSize: '12px', fontWeight: 600, margin: 0 }}>⏰ {selectedItem.Last_Date}</p>
                </div>
              )}
              {selectedItem.Fee && (
                <div style={{ padding: '10px', background: '#DCFCE7', borderRadius: '8px', marginBottom: '8px' }}>
                  <p style={{ fontSize: '10px', color: '#16A34A', fontWeight: 600, marginBottom: '3px' }}>शुल्क</p>
                  <p style={{ fontSize: '12px', fontWeight: 600, margin: 0 }}>💰 {selectedItem.Fee}</p>
                </div>
              )}
              {(selectedItem.Documents || selectedItem.Documents_Required) && (
                <div style={{ padding: '10px', background: '#FEF3C7', borderRadius: '8px', marginBottom: '8px' }}>
                  <p style={{ fontSize: '10px', color: '#D97706', fontWeight: 600, marginBottom: '6px' }}>📄 कागदपत्रे</p>
                  <p style={{ fontSize: '11px', lineHeight: '1.5', margin: 0 }}>{selectedItem.Documents || selectedItem.Documents_Required}</p>
                </div>
              )}
              {(selectedItem.Description || selectedItem.Benefit) && (
                <p style={{ fontSize: '11px', color: '#6B7280', lineHeight: '1.6', padding: '10px', background: '#F9FAFB', borderRadius: '8px', margin: 0 }}>{selectedItem.Description || selectedItem.Benefit}</p>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href={`https://wa.me/919011083440?text=नमस्कार, मला "${selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || ''}" या बद्दल माहिती हवी आहे`} target="_blank" rel="noopener noreferrer" style={{ width: '100%', background: 'linear-gradient(135deg, #25D366, #128C7E)', color: 'white', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>💬 WhatsApp</a>
              <a href="tel:9011083440" style={{ width: '100%', background: 'linear-gradient(135deg, #EA580C, #FB923C)', color: 'white', padding: '14px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>📞 कॉल करा</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
