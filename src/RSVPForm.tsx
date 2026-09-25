import React, { useState, useEffect } from "react";

export default function RSVPForm() {
  const endpoint = "https://script.google.com/macros/s/AKfycbzSxEA_ZE75qS8vQe8PEbZTMaB3EiZEZgXqnFaFsLNi_ItxmBxX6M0B0FRklYDg3VMduQ/exec";

  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [name, setName] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Auto-detect name from URL path
    const rawPath = window.location.pathname.substring(1);
    const guestName = rawPath && rawPath !== 'admin' ? decodeURIComponent(rawPath) : null;
    if (guestName) {
      setName(guestName);
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!endpoint) {
      setErrorMessage("RSVP saving is not configured yet.");
      return;
    }

    const payload = {
      name: name.trim(),
      attendance,
      submittedAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      // Send as text/plain to completely avoid CORS preflight OPTIONS request blocking
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      
      setSuccessMessage("RSVP saved. Thank you!");
    } catch {
      // Fallback in case fetch throws a network error
      try {
        await fetch(endpoint, { 
          method: "POST", 
          mode: "no-cors", 
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload) 
        });
        setSuccessMessage("RSVP submitted. Thank you!");
      } catch {
        setErrorMessage("Could not submit RSVP. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={submit} className="space-y-4 px-2">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAttendance("yes")}
            className={`py-3 rounded-xl text-[12px] uppercase tracking-widest font-bold border transition-colors ${attendance === "yes" ? "bg-[#D4AF37] text-white border-[#D4AF37]" : "bg-white text-zinc-400 border-zinc-200"
              }`}
          >
            Yes, I will attend
          </button>
          <button
            type="button"
            onClick={() => setAttendance("no")}
            className={`py-3 rounded-xl text-[12px] uppercase tracking-widest font-bold border transition-colors ${attendance === "no" ? "bg-zinc-700 text-white border-zinc-700" : "bg-white text-zinc-400 border-zinc-200"
              }`}
          >
            No, I cannot
          </button>
        </div>

        <div>
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Guest Name"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-[#4A148C] font-serif outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>

        {errorMessage && <p className="text-[12px] text-red-600 font-semibold">{errorMessage}</p>}
        {successMessage && <p className="text-[12px] text-[#D81B60] font-bold">{successMessage}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#4A148C] text-white py-3.5 rounded-xl text-[12px] uppercase tracking-widest font-bold disabled:opacity-60 shadow-md transition-colors hover:bg-black mt-2"
        >
          {submitting ? "Submitting..." : "Submit RSVP"}
        </button>
      </form>
    </div>
  );
}
