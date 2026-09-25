import React, { useState, useEffect } from 'react';
import { Copy, Link as LinkIcon, Trash2, CheckCircle2, MessageSquare } from 'lucide-react';

export default function AdminPage() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedData, setGeneratedData] = useState<{ url: string; fullMessage: string; displayName: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const getDisplayName = (pref: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return '';
    if (pref === 'Family') return `${trimmed} and Family`;
    if (pref === 'Dear') return trimmed;
    if (pref) return `${pref} ${trimmed}`;
    return trimmed;
  };

  const getGreeting = (pref: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return '';
    if (pref === 'Family') return `Dear ${trimmed} and Family ❤️`;
    if (pref === 'Dear') return `Dear ${trimmed} ❤️`;
    if (pref) return `Dear ${pref} ${trimmed} ❤️`;
    return `Dear ${trimmed} ❤️`;
  };

  const getFullMessage = (pref: string, name: string, generatedLink: string) => {
    return `${getGreeting(pref, name)}

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Wageesh & Hiruni`;
  };

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    const displayName = getDisplayName(prefix, guestName);
    const url = `${window.location.origin}/${encodeURIComponent(displayName)}`;
    const fullMessage = getFullMessage(prefix, guestName, url);
    
    setGeneratedData({ url, fullMessage, displayName });
    setCopiedLink(false);
    setCopiedMsg(false);
  };

  const copyLinkOnly = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyFullMessage = (message: string) => {
    navigator.clipboard.writeText(message);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  const currentDisplayName = getDisplayName(prefix, guestName);
  const currentGreeting = getGreeting(prefix, guestName);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-xl bg-white rounded-[2rem] shadow-xl border border-[#EAE1D3] p-6 md:p-10">
        <div className="flex flex-col items-center mb-8">
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
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Miss">Miss</option>
              <option value="Mr. & Mrs.">Mr. & Mrs.</option>
              <option value="Family">Family</option>
              <option value="Dear">Dear</option>
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

          {guestName.trim() && (
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EAE1D3] mb-4">
              <p className="text-[10px] uppercase tracking-widest text-[#8B7355] mb-1 font-bold">Preview Greeting:</p>
              <p className="font-serif text-[#3D2B1F] text-lg">{currentGreeting}</p>
            </div>
          )}

          <button 
            onClick={handleGenerate}
            disabled={!guestName.trim()}
            className="w-full py-4 bg-[#C8B29E] text-white rounded-xl uppercase tracking-widest font-bold text-base hover:bg-[#b09780] transition-colors disabled:opacity-50 shadow-md"
          >
            Generate Link
          </button>
        </div>
      </div>

      {generatedData && (
        <div className="w-full max-w-xl mt-8">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-[#EAE1D3] flex flex-col gap-6">
            <div>
              <h2 className="serif text-2xl text-[#3D2B1F] uppercase tracking-widest font-bold mb-2">Generated for: {generatedData.displayName}</h2>
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EAE1D3]">
                <pre className="font-serif text-[#3D2B1F] text-sm whitespace-pre-wrap leading-relaxed">
                  {generatedData.fullMessage}
                </pre>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => copyLinkOnly(generatedData.url)}
                className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors border ${copiedLink ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-[#EAE1D3] text-[#8B7355] hover:bg-[#FAF7F2]'}`}
              >
                {copiedLink ? <CheckCircle2 className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                {copiedLink ? 'Link Copied!' : 'Copy Link Only'}
              </button>
              
              <button 
                onClick={() => copyFullMessage(generatedData.fullMessage)}
                className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors border ${copiedMsg ? 'bg-green-50 border-green-200 text-green-700' : 'bg-[#C8B29E] border-[#C8B29E] text-white hover:bg-[#b09780]'}`}
              >
                {copiedMsg ? <CheckCircle2 className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                {copiedMsg ? 'Message Copied!' : 'Copy Full Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
