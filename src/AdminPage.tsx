import React, { useState, useEffect } from 'react';
import { Copy, Link as LinkIcon, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminPage() {
  const [prefix, setPrefix] = useState('');
  const [guestName, setGuestName] = useState('');
  const [links, setLinks] = useState<any[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('wedding_guest_links');
    if (saved) setLinks(JSON.parse(saved));
  }, []);

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    const url = `${window.location.origin}/?prefix=${encodeURIComponent(prefix)}&guest=${encodeURIComponent(guestName.trim())}`;
    const newLink = {
      prefix,
      guestName: guestName.trim(),
      url,
      date: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')
    };
    const updated = [newLink, ...links];
    setLinks(updated);
    localStorage.setItem('wedding_guest_links', JSON.stringify(updated));
    setGuestName('');
  };

  const clearLinks = () => {
    if (confirm("Clear all generated links?")) {
      setLinks([]);
      localStorage.removeItem('wedding_guest_links');
    }
  };

  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-xl border border-[#EAE1D3] p-8 md:p-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-[#F7E7CE] rounded-full flex items-center justify-center mb-4 shadow-inner">
            <LinkIcon className="text-[#8B7355] w-6 h-6" />
          </div>
          <h1 className="serif text-3xl md:text-4xl text-[#3D2B1F] tracking-widest uppercase font-bold text-center">Link Generator</h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[12px] uppercase tracking-[0.2em] font-bold text-[#8B7355] mb-2">Select Prefix</label>
            <select 
              value={prefix} 
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full p-4 border border-zinc-200 rounded-xl bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#C8B29E] font-serif text-[#3D2B1F] text-xl"
            >
              <option value="">No Prefix</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mr. & Mrs.">Mr. & Mrs.</option>
              <option value="Family">Family</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
              <option value="Rev.">Rev.</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] uppercase tracking-[0.2em] font-bold text-[#8B7355] mb-2">Guest Name</label>
            <input 
              type="text" 
              placeholder="e.g. Sanjaya" 
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-4 border border-zinc-200 rounded-xl bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#C8B29E] font-serif text-[#3D2B1F] text-xl"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={!guestName.trim()}
            className="w-full py-4 bg-[#C8B29E] text-white rounded-xl uppercase tracking-widest font-bold text-base hover:bg-[#b09780] transition-colors disabled:opacity-50 shadow-md"
          >
            Generate Link
          </button>
        </div>
      </div>

      <div className="w-full max-w-lg mt-12">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="serif text-2xl text-[#3D2B1F] uppercase tracking-widest font-bold">Recently Generated</h2>
          {links.length > 0 && (
            <button onClick={clearLinks} className="p-2 text-zinc-400 hover:text-red-500 transition-colors" title="Clear all links">
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          {links.length === 0 ? (
            <p className="text-center text-zinc-400 font-serif italic text-base">No links generated yet.</p>
          ) : (
            links.map((link, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-[#EAE1D3] flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className="font-serif text-[#3D2B1F] text-2xl font-medium truncate">{link.prefix} {link.guestName}</p>
                  <p className="text-sm text-zinc-500 font-mono mt-2 tracking-wider">{link.date}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(link.url, idx)}
                  className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-full transition-colors ${copiedIndex === idx ? 'bg-green-100 text-green-600' : 'bg-[#FAF7F2] text-[#8B7355] hover:bg-[#EAE1D3]'}`}
                  title="Copy Link"
                >
                  {copiedIndex === idx ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
