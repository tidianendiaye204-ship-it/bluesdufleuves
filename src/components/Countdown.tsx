import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
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

    const updateCountdown = () => {
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
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div
      className={`bg-[#04111f]/75 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-6 relative overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/35 bg-sky-500/15">
            <Calendar className="text-sky-300" size={13} />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-300">
              Compte à rebours
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight leading-tight">
            Le Festival Approche
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {[
            { value: timeLeft.days, label: "Jours" },
            { value: timeLeft.hours, label: "Heures" },
            { value: timeLeft.minutes, label: "Min" },
            { value: timeLeft.seconds, label: "Sec" },
          ].map((unit) => (
            <div
              key={unit.label}
              className="rounded-xl bg-white/8 border border-white/15 px-2.5 py-2 sm:px-3.5 sm:py-2.5 text-center min-w-14 sm:min-w-16"
            >
              <motion.div
                key={`${unit.label}-${unit.value}`}
                initial={{ opacity: 0.7, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-xl sm:text-2xl md:text-3xl font-black text-sky-300 leading-none"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.div>
              <span className="mt-1 block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-white/75">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
