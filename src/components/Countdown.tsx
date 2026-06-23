import { useState, useEffect } from "react";
import { Clock, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

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
        className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-4 md:p-6 min-w-[70px] md:min-w-[90px] shadow-lg"
      >
        <span className="text-2xl md:text-4xl font-bold">{value}</span>
      </motion.div>
      <span className="text-xs md:text-sm font-semibold text-white/80 mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 ${className}`}
    >
      <div className="flex items-center justify-center gap-2 mb-6">
        <Calendar className="text-amber-400" size={20} />
        <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider">
          Compte à rebours
        </h3>
      </div>

      <div className="flex justify-center gap-4 md:gap-6 mb-6">
        <TimeUnit value={timeLeft.days} label="Jours" />
        <TimeUnit value={timeLeft.hours} label="Heures" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Secondes" />
      </div>

      <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
        <Clock size={16} className="text-amber-400" />
        <span>5-7 Décembre 2025</span>
        <MapPin size={16} className="text-amber-400 ml-2" />
        <span>Podor, Sénégal</span>
      </div>
    </div>
  );
}
