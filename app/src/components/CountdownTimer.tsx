import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function calcTime() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
}

interface Props {
  compact?: boolean;
}

export default function CountdownTimer({ compact }: Props) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(calcTime);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTime), 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  if (compact) {
    return (
      <div className="flex items-center justify-center gap-1.5 text-white font-oswald">
        <span className="text-base font-bold text-orange-500">{pad(h)}</span>
        <span className="text-[11px] text-gray-400">{t("countdown.h")}</span>
        <span className="text-base font-bold text-orange-500">{pad(m)}</span>
        <span className="text-[11px] text-gray-400">{t("countdown.m")}</span>
        <span className="text-base font-bold text-orange-500">{pad(s)}</span>
        <span className="text-[11px] text-gray-400">{t("countdown.s")}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 text-white font-oswald text-lg tracking-wider mt-3">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-orange-500">{pad(h)}</span>
        <span className="text-[10px] text-gray-400 uppercase">{t("countdown.hours")}</span>
      </div>
      <span className="text-orange-500 text-2xl font-bold mt-4">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-orange-500">{pad(m)}</span>
        <span className="text-[10px] text-gray-400 uppercase">{t("countdown.mins")}</span>
      </div>
      <span className="text-orange-500 text-2xl font-bold mt-4">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-orange-500">{pad(s)}</span>
        <span className="text-[10px] text-gray-400 uppercase">{t("countdown.secs")}</span>
      </div>
    </div>
  );
}
