import React, { useState, useEffect } from 'react';
import { FileText, Search, Phone, MapPin, Clock, Briefcase, Wheat, GraduationCap, CreditCard, Printer, Bell, X } from 'lucide-react';
import './App.css';

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
  const [section, setSection] = useState('home');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <Clock size={48} style={{ marginBottom: '20px' }} />
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
      {showNotif && activeNotif && (
        <div style={{ background: activeNotif.Priority === 'High' ? '#f56565' : '#ed8936', color: 'white', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={20} />
            <span><strong>{activeNotif.Title}:</strong> {activeNotif.Message}</span>
          </div>
          <button onClick={() => setShowNotif(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
      )}

      <header style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>
            {settings.BUSINESS_NAME || 'साईराम महा-ई-सेवा केंद्र'}
          </h1>
          <p style={{ opacity: 0.9 }}>{settings.TAGLINE || 'सर्व सरकारी कामे एका ठिकाणी'}</p>
        </div>
      </header>

      <nav style={{ background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0' }}>
          {[
            { id: 'home', label: 'सेवा', icon: FileText },
            { id: 'jobs', label: 'नोकरी', icon: Briefcase },
            { id: 'shetkari', label: 'शेतकरी', icon: Wheat },
            { id: 'vidyarthi', label: 'विद्यार्थी', icon: GraduationCap },
            { id: 'olakh', label: 'ओळखपत्र', icon: CreditCard },
            { id: 'printing', label: 'प्रिंटिंग', icon: Printer }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              style={{
                padding: '15px 20px',
                background: section === item.id ? '#667eea' : 'transparent',
                color: section === item.id ? 'white' : '#4a5568',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: section === item.id ? 'bold' : 'normal',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
        {section === 'home' && (
          <div>
            <div style={{ marginBottom: '30px', position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0' }} size={20} />
              <input
                type="text"
                placeholder="सेवा शोधा..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '12px 12px 12px 45px', fontSize: '16px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {services
                .filter(s => s.Service_Name?.toLowerCase().includes(search.toLowerCase()))
                .map((service, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedItem({ ...service, type: 'service' })}
                    style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                  >
                    <div style={{ fontSize: '40px', marginBottom: '15px' }}>{service.Icon}</div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#2d3748' }}>{service.Service_Name}</h3>
                    <p style={{ color: '#718096', fontSize: '14px', marginBottom: '10px' }}>{service.Description}</p>
                    <span style={{ display: 'inline-block', padding: '4px 12px', background: '#edf2f7', borderRadius: '20px', fontSize: '12px', color: '#4a5568' }}>
                      {service.Category}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {section === 'jobs' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Briefcase size={28} />
              नोकरी भरती Latest Update
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {jobs.map((job, i) => (
                <div key={i} onClick={() => setSelectedItem({ ...job, type: 'job' })} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Briefcase size={24} color="white" />
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748', flex: 1 }}>{job.Job_Name}</h3>
                  </div>
                  <p style={{ color: '#718096', fontSize: '14px', marginBottom: '8px' }}><strong>विभाग:</strong> {job.Department}</p>
                  <p style={{ color: '#e53e3e', fontSize: '15px', fontWeight: 'bold', marginBottom: '8px' }}>📅 {job.Last_Date}</p>
                  <p style={{ color: '#718096', fontSize: '14px', marginBottom: '6px' }}><strong>पात्रता:</strong> {job.Qualification}</p>
                  <p style={{ color: '#718096', fontSize: '14px', marginBottom: '6px' }}><strong>वय:</strong> {job.Age}</p>
                  <p style={{ color: '#38a169', fontSize: '15px', fontWeight: 'bold' }}>💰 {job.Fee}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'shetkari' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Wheat size={28} />
              शेतकरी योजना
            </h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {shetkari.map((yojana, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>🌾 {yojana.Yojana_Name}</h3>
                  <p><strong>विभाग:</strong> {yojana.Department}</p>
                  <p><strong>पात्रता:</strong> {yojana.Eligibility}</p>
                  <p><strong>लाभ:</strong> <span style={{ color: '#38a169', fontWeight: 'bold' }}>{yojana.Benefit}</span></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'vidyarthi' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GraduationCap size={28} />
              विद्यार्थी कक्ष
            </h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {vidyarthi.map((scheme, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>📚 {scheme.Scheme_Name}</h3>
                  <p style={{ color: '#e53e3e', fontWeight: 'bold', marginBottom: '8px' }}>📅 {scheme.Last_Date}</p>
                  <p style={{ color: '#38a169', fontSize: '16px', fontWeight: 'bold' }}>💰 {scheme.Benefit}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'olakh' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CreditCard size={28} />
              ओळखपत्र सेवा
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {olakh.map((card, i) => (
                <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>🆔 {card.Card_Name}</h3>
                  <p><strong>संस्था:</strong> {card.Issuing_Authority}</p>
                  <p><strong>वेळ:</strong> {card.Processing_Time}</p>
                  <p style={{ color: '#38a169', fontSize: '16px', fontWeight: 'bold' }}>💰 {card.Fee}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'printing' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Printer size={28} />
              प्रिंटिंग सेवा
            </h2>
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>सेवा</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>प्रकार</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>दर</th>
                  </tr>
                </thead>
                <tbody>
                  {printing.map((service, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px' }}>{service.Service_Name}</td>
                      <td style={{ padding: '12px' }}>{service.Color_Type}</td>
                      <td style={{ padding: '12px', color: '#38a169', fontWeight: 'bold' }}>{service.Price_Per_Page}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <footer style={{ background: '#2d3748', color: 'white', padding: '40px 20px', marginTop: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>{settings.BUSINESS_NAME}</h3>
          <p style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Phone size={16} /> {settings.PHONE_NUMBER}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <MapPin size={16} /> {settings.ADDRESS}
          </p>
          <p style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Clock size={16} /> {settings.OPENING_TIME} - {settings.CLOSING_TIME}
          </p>
        </div>
      </footer>

      {selectedItem && (
        <div onClick={() => setSelectedItem(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '16px', maxWidth: '600px', width: '100%', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {selectedItem.Service_Name || selectedItem.Job_Name || selectedItem.Yojana_Name || selectedItem.Scheme_Name}
              </h2>
              <button onClick={() => setSelectedItem(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <a href={`tel:${settings.PHONE_NUMBER}`} style={{ flex: 1, padding: '14px', background: '#48bb78', color: 'white', textAlign: 'center', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Phone size={20} />
                संपर्क
              </a>
              <a href={`https://wa.me/${settings.WHATSAPP_NUMBER?.replace(/\D/g, '')}`} style={{ flex: 1, padding: '14px', background: '#25d366', color: 'white', textAlign: 'center', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
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
