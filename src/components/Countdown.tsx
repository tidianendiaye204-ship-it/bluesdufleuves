import { useState, useEffect } from "react";
import { Clock, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { FESTIVAL_CONFIG } from "@/config/festival";

interface CountdownProps {
  targetDate: string;
  className?: string;
}

export function Countdown({ targetDate, className = "" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-linear-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-4 md:p-6 min-w-17.5 md:min-w-22.5 shadow-lg"
      >
        <span className="text-2xl md:text-4xl font-bold">{value}</span>
      </motion.div>
      <span className="text-xs md:text-sm font-semibold text-white/80 mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className={`bg-black/20 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group ${className}`}>
      <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
             <Calendar className="text-amber-400" size={14} />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400">Patience</span>
          </div>
          <h3 className="luxury-text text-3xl md:text-4xl font-bold text-white uppercase tracking-tighter leading-tight">
            Le Festival<br/>Approche
          </h3>
        </div>

        <div className="flex items-baseline gap-4">
          <motion.div
            key={timeLeft.days}
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
            }}
          >
            {timeLeft.days}
          </motion.div>
          <div className="flex flex-col gap-1 pb-2 md:pb-4 text-left">
            <span className="text-xl md:text-2xl font-bold text-white/90 uppercase tracking-widest">Jours</span>
            <span className="text-sm text-white/50 font-serif italic">avant l'événement</span>
          </div>
        </div>
      </div>
    </div>
  );
}
