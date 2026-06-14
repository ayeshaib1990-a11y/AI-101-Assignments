import { Pet, Vaccination, Reminder, RegionalAlert } from "../types";
import { TRANSLATIONS, formatLocalDate } from "../utils";
import { REGIONAL_ALERTS } from "../data";
import { 
  AlertTriangle, 
  Calendar, 
  Thermometer, 
  ShieldCheck, 
  ChevronRight, 
  Info, 
  Plus, 
  Check, 
  Pill, 
  Activity,
  Heart
} from "lucide-react";

interface DashboardProps {
  activePet: Pet;
  vaccinations: Vaccination[];
  reminders: Reminder[];
  onToggleReminder: (id: string) => void;
  onNavigateToTab: (index: number) => void;
  lang: string;
}

export default function Dashboard({
  activePet,
  vaccinations,
  reminders,
  onToggleReminder,
  onNavigateToTab,
  lang
}: DashboardProps) {
  const t = TRANSLATIONS[lang as "en" | "ur"];

  // Filter alerts based on active pet's city
  const localAlerts = REGIONAL_ALERTS.filter(alert => alert.city.toLowerCase() === activePet.city.toLowerCase());

  // Vaccine Statistics
  const petVaccines = vaccinations.filter(v => v.petId === activePet.id);
  const completedVaccines = petVaccines.filter(v => v.status === "completed").length;
  const totalVaccinesCount = petVaccines.length;
  const vaccineProgressPercent = totalVaccinesCount > 0 
    ? Math.round((completedVaccines / totalVaccinesCount) * 100) 
    : 0;

  // Reminders filtered for active pet
  const activePetReminders = reminders.filter(r => r.petId === activePet.id);

  // Generate localized season text corresponding to current date
  const isSummerInPakistan = new Date().getMonth() >= 4 && new Date().getMonth() <= 8; // May to Sep

  return (
    <div id="dashboard-view" className="space-y-6 animate-fade-in">
      
      {/* 1. CRITICAL SEASONAL CLIMATE WARNINGS BANNER */}
      {localAlerts.length > 0 ? (
        <div className="space-y-3">
          {localAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border-l-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm transition-all ${
                alert.level === "danger"
                  ? "bg-rose-50 border-rose-500 text-rose-950"
                  : alert.level === "warning"
                  ? "bg-amber-50 border-amber-500 text-amber-950"
                  : "bg-blue-50 border-blue-500 text-blue-950"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl mt-0.5 ${alert.level === "danger" ? "bg-rose-500 text-white" : alert.level === "warning" ? "bg-amber-500 text-white" : "bg-blue-500 text-white"}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base flex items-center gap-1.5 font-sans">
                    {lang === "en" ? alert.titleEn : alert.titleUr}
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white border border-rose-200">
                      {alert.city}
                    </span>
                  </h4>
                  <p className="text-xs mt-1.5 opacity-90 max-w-xl text-slate-700 leading-relaxed font-sans">
                    {lang === "en" ? alert.messageEn : alert.messageUr}
                  </p>
                  <p className="text-xs font-semibold mt-2 text-indigo-900 border-t border-indigo-200/20 pt-1.5 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{lang === "en" ? `Action Required: ${alert.actionEn}` : `اہم قدم: ${alert.actionUr}`}</span>
                  </p>
                </div>
              </div>
              
              <button
                type="button"
                id={`btn-alert-consult-${alert.id}`}
                onClick={() => onNavigateToTab(2)} // Consult Gemini AI Advisor tab
                className="w-full md:w-auto px-4 py-2 mt-2 md:mt-0 font-bold text-xs bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl shadow-sm hover:shadow transition-all text-center cursor-pointer"
              >
                {lang === "en" ? "Consult Dr. Anees (AI)" : "ڈاکٹر انیس سے پوچھیں"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Fallback default general prompt alert */
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 p-5 rounded-2xl flex items-center gap-3">
          <Thermometer className="w-6 h-6 text-emerald-600 shrink-0 animate-pulse" />
          <div className="text-xs text-teal-900 font-sans">
            <h4 className="font-bold">{activePet.city} Weather Advisory: Optimal Climate Care is Active</h4>
            <p className="mt-0.5 opacity-80">
              {isSummerInPakistan 
                ? "Summer relative heat levels are heavy. Make sure to refresh water water bowls every 3 hrs."
                : "Mild weather registered. Excellent season for moderate physical activities in the gardens after Maghrib prayers."}
            </p>
          </div>
        </div>
      )}

      {/* 2. PET COCKPIT GRID STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Core Profile Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 text-lg">
            🐾
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Pet Identity</span>
            <h4 className="font-sans font-black text-xl text-slate-800">{activePet.name}</h4>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              {activePet.ageYears > 0 ? `${activePet.ageYears} Yrs ` : ""}{activePet.ageMonths} Mos • {activePet.gender === "female" ? "Female" : "Male"}
            </p>
          </div>
        </div>

        {/* Current Weight Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 cursor-pointer hover:border-slate-200" onClick={() => onNavigateToTab(1)}>
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 text-lg">
            ⚖️
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{t.petWeight}</span>
            <div className="flex items-baseline gap-1.5 pt-0.5">
              <span className="font-sans font-black text-2xl text-slate-800">{activePet.weight}</span>
              <span className="text-xs font-bold text-indigo-600">KG</span>
            </div>
            <p className="text-[10px] text-indigo-500 mt-0.5 font-bold">Manage Weight Loggers →</p>
          </div>
        </div>

        {/* Vaccine Milestones completion Progress Panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 cursor-pointer hover:border-slate-200" onClick={() => onNavigateToTab(1)}>
          
          {/* Progress Circular ring using pure SVG */}
          <div className="relative w-12 h-12 border-0 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray={`${vaccineProgressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-center mt-0.5 font-mono text-[10px] font-black text-slate-700">
              {vaccineProgressPercent}%
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Vaccines Secured</span>
            <h4 className="font-sans font-extrabold text-base text-slate-800">
              {completedVaccines} / {totalVaccinesCount} Done
            </h4>
            <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Vaccination Booklet →</span>
          </div>
        </div>

        {/* Quick Help Locator card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 cursor-pointer hover:border-slate-200" onClick={() => onNavigateToTab(3)}>
          <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center text-base font-black shadow-lg shadow-rose-100 shrink-0">
            🚑
          </div>
          <div>
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block">EMERGENCY CLOUD</span>
            <h4 className="font-sans font-black text-sm text-slate-800">Hospital Finder</h4>
            <p className="text-[10px] text-slate-400 mt-0.5 font-bold">Locate 24/7 Vets in {activePet.city} →</p>
          </div>
        </div>

      </div>

      {/* 3. REMINDERS & CALL TO ACTION BLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Double-panel: Daily Routines Checklist */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div>
              <h3 className="text-lg font-sans font-black text-slate-800">
                {t.remindersTitle}
              </h3>
              <p className="text-xs text-slate-400">Keep daily diet, walks, and pills synced</p>
            </div>
            
            <button
              type="button"
              id="btn-goto-routines-dashboard"
              onClick={() => onNavigateToTab(1)} // Go to Health trackers
              className="p-1 px-3 rounded-xl border border-slate-200 text-indigo-600 text-xs font-bold hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Manage Routines" : "نیا لگائیں"}</span>
            </button>
          </div>

          {activePetReminders.length > 0 ? (
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
              {activePetReminders.map(reminder => (
                <div
                  key={reminder.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    !reminder.active 
                      ? "bg-slate-50/50 border-slate-100 opacity-60" 
                      : "bg-white border-slate-100 hover:border-slate-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      id={`btn-toggle-rem-${reminder.id}`}
                      onClick={() => onToggleReminder(reminder.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                        !reminder.active
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-slate-300 hover:border-indigo-500 text-transparent hover:text-indigo-400"
                      }`}
                      title={reminder.active ? "Mark Done" : "Mark Pending"}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <h5 className={`text-sm font-semibold text-slate-800 leading-tight ${!reminder.active ? "line-through text-slate-400" : ""}`}>
                        {reminder.title}
                      </h5>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] uppercase font-mono tracking-wider bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded">
                          {reminder.category}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-300" />
                          <span>{reminder.time} ({reminder.frequency})</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category icon */}
                  <span className="text-lg">
                    {reminder.category === "food" ? "🍖" : reminder.category === "pill" ? "💊" : reminder.category === "vaccine" ? "💉" : "🐈"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-bold mt-2">No routine checkmarks defined yet.</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Set customized alerts for food schedules to prevent obesity.</p>
            </div>
          )}
        </div>

        {/* Right Panel: Pakistan-Specific Companion & Advice Board */}
        <div className="bg-gradient-to-b from-slate-900 to-indigo-950 text-white p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-md">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500 rounded-full -mr-12 -mt-12 opacity-10" />
          
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-indigo-300 uppercase block font-bold">Dr. Anees Suggests</span>
            <h4 className="text-lg font-serif font-black tracking-tight leading-snug">
              {lang === "en" 
                ? "Feeding homemade curd (Dahi) to combat summers" 
                : "دہی کا استعمال جو گرمیوں میں معدے کو ٹھنڈا رکھتا ہے"}
            </h4>
            <p className="text-xs text-indigo-200 leading-relaxed font-sans">
              {lang === "en"
                ? "During heated Pakistani summer days, adding 2 tablespoons of fresh, zero-sugar curd (Dahi) to your pet's lunchtime meals acts as a natural cooling system for the digestive lining, preventing gas."
                : "گرمیوں میں دو چمچ دائرہ دہی بغیر چینی کے کھانے میں ملائیں تاکہ جانور کا معدہ ٹھیک رہے اور لو لگنے سے محفوظ رہے۔"}
            </p>
          </div>

          <div className="mt-8 space-y-2 pt-4 border-t border-indigo-900/40">
            <button
              type="button"
              id="btn-consult-doctor-advisor"
              onClick={() => onNavigateToTab(2)} // Consult AI Dr. Anees
              className="w-full bg-white hover:bg-slate-100 text-indigo-900 font-extrabold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>{t.askAI}</span>
            </button>
            
            <button
              type="button"
              id="btn-goto-foodsafe"
              onClick={() => onNavigateToTab(4)} // Wellness & diet
              className="w-full bg-slate-800/60 hover:bg-slate-800/90 text-indigo-100 border border-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>{lang === "en" ? "Check Poisonous Foods" : "خوراک کی حفاظت جانیے"}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
