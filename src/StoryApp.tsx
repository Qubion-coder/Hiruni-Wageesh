import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Volume2, VolumeX } from 'lucide-react';
import RSVPForm from './RSVPForm'; // We'll extract RSVPForm
import WishesForm from './WishesForm';

function SectionBackground() {
  return null;
}

export default function StoryApp() {
  const [introStep, setIntroStep] = useState<0 | 1 | 2>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2026-12-30T09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (introStep === 2 && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [introStep]);

  const handleIntroClick = () => {
    if (introStep === 0) {
      setIntroStep(1);
      setTimeout(() => setIntroStep(2), 600);
    }
  };



  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Read personalized guest link params
  const rawPath = window.location.pathname.substring(1);
  const displayName = rawPath && rawPath !== 'admin' ? decodeURIComponent(rawPath) : null;

  return (
    <>
      <AnimatePresence>
        {introStep === 0 && (
          <motion.div
            key="intro-step-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black cursor-pointer flex flex-col items-center justify-between py-12 md:py-16"
            onClick={handleIntroClick}
          >
            <img src="/ChatGPT Image Aug 17, 2026, 04_04_28 AM.png" className="absolute inset-0 w-full h-full object-cover z-0" alt="Intro 1" />
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative z-10 script text-5xl md:text-7xl text-[#063A2C] drop-shadow-md text-center px-4 mt-32"
            >
              The Wedding Invitation
            </motion.h1>

            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative z-10 mb-8 md:mb-12 bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 shadow-lg"
            >
              <p className="text-[11px] md:text-sm uppercase tracking-[0.3em] text-white/90 font-bold">
                Tap the seal
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introStep === 1 && (
          <motion.div
            key="intro-step-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[200] bg-black"
          >
            <img src="/ChatGPT Image Aug 17, 2026, 04_06_47 AM.png" className="w-full h-full object-cover" alt="Intro 2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Common Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          src="/Animate_fairytale_invitation_image_202608170359.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className="snap-container no-scrollbar bg-transparent relative z-10 text-[#063A2C] font-sans" style={{ WebkitOverflowScrolling: 'touch' }}>



        {/* --- SCREEN 1: Invite Details --- */}
        <section className="snap-section relative z-10 overflow-hidden bg-transparent">
          <SectionBackground />
          <div className="min-h-[100dvh] flex flex-col items-center p-6 text-center ios-scroll">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="w-full max-w-sm flex flex-col items-center justify-center text-[#063A2C] bg-[#FFFFF0]/85 backdrop-blur-sm p-8 pt-12 mt-12 rounded-t-[10rem] rounded-b-[2rem] border border-[#C5A059] shadow-xl relative"
              >
                {displayName ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mb-8 flex flex-col items-center max-w-[280px]"
                  >
                    <p className="serif text-[15px] sm:text-[17px] text-[#063A2C] mb-2 text-center leading-relaxed italic">
                      We cordially invite
                    </p>
                    <p className="serif text-2xl sm:text-3xl text-[#134F40] font-bold mb-2 text-center leading-tight">
                      {displayName}
                    </p>
                    <p className="serif text-[15px] sm:text-[17px] text-[#063A2C] text-center leading-relaxed italic">
                      to celebrate our special day with us at the
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-[12px] sm:text-sm uppercase tracking-[0.2em] font-medium text-[#063A2C] mb-1">
                      INVITE YOU TO CELEBRATE
                    </p>
                    <p className="text-[12px] sm:text-sm uppercase tracking-[0.2em] font-medium text-[#063A2C] mb-2 sm:mb-4">
                      THE
                    </p>
                  </>
                )}

                <h1 className="script text-7xl sm:text-[5.5rem] text-[#063A2C] mb-8 sm:mb-12 drop-shadow-sm font-normal">
                  Wedding
                </h1>

                <div className="flex flex-col items-center w-full mb-8 sm:mb-10">
                  <p className="text-[13px] sm:text-[15px] uppercase tracking-widest text-[#063A2C] font-bold mb-2">DECEMBER</p>
                  <div className="flex items-center justify-center w-full gap-4">
                    <div className="flex-1 text-right border-y border-[#063A2C]/30 py-2">
                      <p className="text-[12px] sm:text-sm uppercase tracking-widest text-[#063A2C] font-bold">WEDNESDAY</p>
                    </div>
                    <p className="serif text-7xl sm:text-[4.5rem] font-medium text-[#063A2C] leading-none px-1">30</p>
                    <div className="flex-1 text-left border-y border-[#063A2C]/30 py-2">
                      <p className="text-[12px] sm:text-sm uppercase tracking-widest text-[#063A2C] font-bold">AT 9:00 AM</p>
                    </div>
                  </div>
                  <p className="text-[13px] sm:text-[15px] uppercase tracking-widest text-[#063A2C] font-bold mt-2">2026</p>
                </div>

                <a
                  href="https://maps.app.goo.gl/DhaoyvZFQbyjCj2Z6?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="space-y-2 mt-2 sm:mt-4 text-[#063A2C] hover:opacity-70 transition-opacity block"
                >
                  <p className="text-[12px] sm:text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
                    <MapPin size={12} className="text-[#134F40]" />
                    LIGNESS GREEN
                  </p>
                  <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.15em] font-medium">ODESSY</p>
                </a>

                <div className="mt-8 sm:mt-10">
                  <p className="text-[12px] sm:text-sm uppercase tracking-[0.15em] font-bold text-[#063A2C]">RECEPTION TO FOLLOW</p>
                </div>

                <div className="mt-4 sm:mt-6 flex justify-center">
                  <svg className="w-10 h-10 text-[#063A2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 12c-1.5-1-2-2-2-4v-4l6-2v6c0 2-.5 3-2 4M9 12c1.5-1 2-2 2-4v-4l-6-2v6c0 2 .5 3 2 4M13 12v8M11 12v8M9 20h6" />
                    <circle cx="15.5" cy="5.5" r="0.5" fill="currentColor" />
                    <circle cx="14" cy="7.5" r="0.5" fill="currentColor" />
                    <circle cx="8.5" cy="5.5" r="0.5" fill="currentColor" />
                    <circle cx="10" cy="7.5" r="0.5" fill="currentColor" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 1.5: Parents --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="min-h-[100dvh] flex flex-col items-center p-6 text-center ios-scroll">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white p-10 pt-16 rounded-t-[10rem] rounded-b-[2rem] border border-[#C5A059] w-full max-w-sm flex flex-col items-center shadow-xl relative overflow-hidden"
              >
                {/* Subtle texture overlay on the card */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30 pointer-events-none mix-blend-overlay" />

                <div className="relative z-10 w-full flex flex-col items-center text-center">
                  <h2 className="script text-6xl text-[#D4AF37] mb-3">Together with</h2>
                  <h3 className="serif text-[13px] uppercase tracking-[0.3em] text-[#063A2C] mb-10 font-bold">Our Families</h3>

                  <div className="flex flex-col items-center w-full mb-8">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-3 font-bold">Bride's Parents</p>
                    <div className="serif text-lg text-[#063A2C] leading-relaxed text-center">H H Chandrasena <br /> &amp; H T B Malkanthi</div>
                  </div>

                  {/* Elegant Divider */}
                  <div className="flex items-center justify-center gap-3 w-3/4 mx-auto mb-8">
                    <div className="h-px bg-[#C5A059] flex-1"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]"></div>
                    <div className="h-px bg-[#C5A059] flex-1"></div>
                  </div>

                  <div className="flex flex-col items-center w-full">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-3 font-bold">Groom's Parents</p>
                    <div className="serif text-lg text-[#063A2C] leading-relaxed text-center">K T Lalith Karunarathna <br /> &amp; M C Malavipathirana</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 1.75: Countdown --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="min-h-[100dvh] flex flex-col items-center p-6 text-center ios-scroll">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white p-10 pt-16 rounded-t-[10rem] rounded-b-[2rem] border border-[#C5A059] w-full max-w-sm flex flex-col items-center shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30 pointer-events-none mix-blend-overlay" />

                <div className="relative z-10 w-full flex flex-col items-center text-center">
                  <h2 className="script text-6xl text-[#D4AF37] mb-3">Forever Begins In</h2>
                  <h3 className="serif text-[13px] uppercase tracking-[0.3em] text-[#063A2C] mb-10 font-bold">A Grace-filled occasion</h3>

                  <div className="flex flex-row items-center justify-center gap-6 w-full mb-8">
                    <div className="flex flex-col items-center">
                      <p className="serif text-5xl text-[#063A2C] leading-none mb-2">{timeLeft.days}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Days</p>
                    </div>
                    <div className="text-4xl text-[#D4AF37] font-light -mt-4">:</div>
                    <div className="flex flex-col items-center">
                      <p className="serif text-5xl text-[#063A2C] leading-none mb-2">{timeLeft.hours}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Hours</p>
                    </div>
                  </div>

                  {/* Elegant Divider */}
                  <div className="flex items-center justify-center gap-3 w-3/4 mx-auto mb-8">
                    <div className="h-px bg-[#C5A059] flex-1"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]"></div>
                    <div className="h-px bg-[#C5A059] flex-1"></div>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-6 w-full">
                    <div className="flex flex-col items-center">
                      <p className="serif text-5xl text-[#063A2C] leading-none mb-2">{timeLeft.minutes}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Mins</p>
                    </div>
                    <div className="text-4xl text-[#D4AF37] font-light -mt-4">:</div>
                    <div className="flex flex-col items-center">
                      <p className="serif text-5xl text-[#063A2C] leading-none mb-2">{timeLeft.seconds}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Secs</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 2: Couple Screen --- */}
        <section className="snap-section relative z-10 overflow-hidden bg-white rounded-t-[2.5rem]">
          <div className="min-h-[100dvh] flex flex-col items-center justify-start text-center ios-scroll">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-[65dvh] shrink-0 relative"
            >
              <img
                src="/PRE/pre-1.jpeg"
                alt="Hiruni & Wageesh"
                className="w-full h-full object-cover object-top"
              />
              {/* Soft white gradient at the bottom to blend into the text section */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex-1 w-full flex flex-col items-center justify-start text-center pt-2 pb-12 z-20 bg-white"
            >
              <h2 className="serif text-6xl md:text-7xl text-[#063A2C] font-normal leading-none mt-4">
                HIRUNI
              </h2>
              <span className="script text-5xl md:text-6xl text-[#063A2C] my-1 opacity-80">and</span>
              <h2 className="serif text-6xl md:text-7xl text-[#063A2C] font-normal leading-none">
                WAGEESH
              </h2>
            </motion.div>
          </div>
        </section>

        {/* --- SCREEN 2.5: Our Story --- */}
        <section className="snap-section relative z-10 overflow-hidden bg-[#FFFFF0]">
          <div className="min-h-[100dvh] flex flex-col items-center pb-20 ios-scroll">

            {/* Header Image */}
            <div className="w-full h-[45dvh] relative shrink-0">
              <img
                src="/PRE/pre-3.jpeg"
                alt="Our Story - Hiruni & Wageesh"
                className="w-full h-full object-cover object-top rounded-b-[2.5rem] shadow-sm"
              />
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FFFFF0] to-transparent"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-full max-w-sm px-6 pt-6 flex flex-col items-center text-center"
            >
              <h2 className="script text-5xl md:text-6xl text-[#D4AF37] mb-6">Our Story</h2>

              <div className="space-y-6 text-[#063A2C] text-[14px] md:text-[15px] leading-relaxed font-serif px-2">
                <p className="text-center font-medium text-[#134F40] text-[11px] uppercase tracking-widest mb-6">
                  A love story written in the stars
                </p>

                <p className="italic text-center text-[16px] leading-loose text-[#D4AF37]">
                  "Two souls destined to be one,<br/>two hearts forever entwined."
                </p>

                <div className="flex items-center justify-center gap-3 my-8 relative">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="w-[120px] h-[160px] md:w-[140px] md:h-[180px] rounded-t-[3rem] rounded-bl-[3rem] overflow-hidden shadow-md border-4 border-white"
                  >
                    <img src="/PRE/pre-2.jpeg" alt="Story image 1" className="w-full h-full object-cover" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="w-[120px] h-[160px] md:w-[140px] md:h-[180px] rounded-b-[3rem] rounded-tr-[3rem] overflow-hidden shadow-md border-4 border-white mt-12"
                  >
                    <img src="/PRE/pre-4.jpeg" alt="Story image 2" className="w-full h-full object-cover" />
                  </motion.div>
                </div>

                <p className="text-center mt-6">
                  What began as a beautiful connection has blossomed into a love story we cherish every day.
                </p>

                <p className="text-[#063A2C] font-bold text-center italic mt-8 text-[13px] tracking-wide">
                  Join us as we begin our forever together.
                </p>
              </div>

              <div className="mt-10 flex items-center justify-center gap-3 w-1/2">
                <div className="h-px bg-[#C5A059] flex-1"></div>
                <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]"></div>
                <div className="h-px bg-[#C5A059] flex-1"></div>
              </div>
            </motion.div>
          </div>
        </section>



        {/* --- SCREEN 4: Timeline --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="min-h-[100dvh] flex flex-col items-center p-6 text-center ios-scroll">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/60 w-full max-w-sm flex flex-col items-center shadow-lg py-12"
              >
                <h2 className="serif text-4xl tracking-[0.2em] text-[#063A2C] font-medium uppercase mb-2">
                  Wedding
                </h2>
                <h3 className="script text-5xl text-[#134F40] mb-10">
                  Timeline
                </h3>

                <div className="flex flex-col gap-6 w-full relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-300 -translate-x-1/2" />

                  {[
                    { time: "09:00 AM", title: "GUEST ARRIVAL" },
                    { time: "09:30 AM", title: "PORUWA CEREMONY" },
                    { time: "10:30 AM", title: "CAKE CUTTING" },
                    { time: "10:45 AM", title: "MILK FOUNTAIN CEREMONY" },
                    { time: "11:00 AM", title: "LIGHTING OF SHASHREEKA TABLE" },
                    { time: "12:30 PM", title: "LUNCH BUFFET" },
                    { time: "01:30 PM", title: "TABLE VISITS & SOCIALIZING" },
                    { time: "02:30 PM", title: "OPENING DANCE FLOOR" },
                    { time: "04:00 PM", title: "GOING AWAY" },
                  ].map((item, idx) => (
                    <div key={idx} className="relative z-10 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white shadow-sm w-[85%] mx-auto">
                      <p className="text-[13px] font-bold text-[#134F40] mb-1">{item.time}</p>
                      <p className="text-[12px] uppercase tracking-widest text-[#063A2C] font-semibold">{item.title}</p>
                      {item.sub && <p className="serif text-[12px] italic text-zinc-500 mt-1">{item.sub}</p>}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 5: The Details --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="min-h-[100dvh] flex flex-col items-center p-6 text-center ios-scroll">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full max-w-sm flex flex-col gap-4"
              >
                <div className="bg-[#FFFFF0] p-8 rounded-[2rem] shadow-md border border-white">
                  <h3 className="script text-4xl text-[#134F40] mb-1">the</h3>
                  <h2 className="serif text-4xl tracking-[0.2em] text-[#063A2C] font-medium uppercase mb-6">Details</h2>

                  <div className="w-full h-32 rounded-xl overflow-hidden mb-4 relative">
                    <img src="https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmw8wxjjWBU9zmus_naeWRc_vkAwHwXFhIAYf4BBkpTpu9kVQ3vXbVjUL0-Kj6jNkY92lrx-aQkCD8yye0FNXxwH5Nf4408vU5P7RJrhgmSDBm7ezeKu9bLqJlbjvPQtySmTN-47cOPykqA=s1360-w1360-h1020-rw" className="w-full h-full object-cover" alt="Ligness Green Odessy" />
                  </div>

                  <div className="bg-[#C5A059] py-2 rounded-t-xl mb-1">
                    <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#134F40]">Location</p>
                  </div>
                  <div className="bg-white py-4 rounded-b-xl shadow-sm border border-white mb-4 flex flex-col items-center">
                    <p className="text-[12px] uppercase font-bold text-[#063A2C]">Ligness Green</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">Odessy</p>
                    <a
                      href="https://maps.app.goo.gl/DhaoyvZFQbyjCj2Z6?g_st=ic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#C5A059] text-[#063A2C] rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[#D4AF37] transition-colors mt-3"
                    >
                      <MapPin size={10} />
                      Live Location
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 6: RSVP --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="min-h-[100dvh] flex flex-col items-center p-6 text-center ios-scroll">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-[#C5A059] w-full max-w-sm min-h-[80vh] h-auto flex flex-col justify-center items-center shadow-xl"
              >
                <div className="flex items-center justify-center gap-3 w-[60%] mx-auto mb-10 mt-4 md:mt-0">
                  <div className="h-px bg-zinc-300 flex-1"></div>
                  <p className="serif text-[13px] uppercase tracking-[0.2em] font-medium text-[#063A2C]">PLEASE</p>
                  <div className="h-px bg-zinc-300 flex-1"></div>
                </div>

                <div className="relative mb-12 w-[85%] max-w-[260px]">
                  <img src="/floral_rsvp.png" alt="RSVP" className="w-full h-auto object-contain mix-blend-multiply" />
                </div>

                <p className="serif text-[13px] sm:text-[15px] uppercase tracking-[0.15em] font-bold text-[#063A2C] mb-6">
                  BY DECEMBER 10, 2026
                </p>

                <div className="w-full">
                  <RSVPForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 7: Wishes --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="min-h-[100dvh] flex flex-col items-center p-6 text-center ios-scroll">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-[#C5A059] w-full max-w-sm h-auto flex flex-col justify-center items-center shadow-xl"
              >
                <div className="flex items-center justify-center gap-3 w-[60%] mx-auto mb-6 mt-4 md:mt-0">
                  <div className="h-px bg-zinc-300 flex-1"></div>
                  <p className="serif text-[13px] uppercase tracking-[0.2em] font-medium text-[#063A2C]">GUEST BOOK</p>
                  <div className="h-px bg-zinc-300 flex-1"></div>
                </div>

                <h3 className="script text-5xl text-[#D4AF37] mb-6">Leave a Wish</h3>

                <p className="serif text-[13px] sm:text-[15px] text-[#063A2C] mb-8 leading-relaxed">
                  We'd love to hear from you! Please leave your wishes, advice, or a simple hello for us.
                </p>

                <div className="w-full">
                  <WishesForm />
                </div>
              </motion.div>
              <p className="text-[#063A2C] text-xs mt-6 font-sans tracking-wider text-center px-4">
                Want a beautiful wedding website like this? Create yours with <a target="_blank" rel="noreferrer" className="text-[#134F40] hover:text-[#D4AF37] underline font-bold transition-colors" href="https://wa.me/94707819074">invitemint</a>
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Audio and Play Button */}
      <audio
        ref={audioRef}
        src="/Heeriye (Flute Cover) Flute Siva Jasleen Royal Arijit Singh Dulquer Salmaan Don Stewart.mp3"
        loop
      />
      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-[60] p-3 rounded-full shadow-lg transition-all ${isPlaying ? 'bg-[#D4AF37] text-white' : 'bg-white/80 backdrop-blur-sm text-[#134F40] border border-[#C5A059]'
          }`}
        aria-label="Toggle music"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}
