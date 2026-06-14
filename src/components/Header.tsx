import { Pet, AppLanguage } from "../types";
import { TRANSLATIONS } from "../utils";
import { Users, Bell, RefreshCw, Languages, Heart } from "lucide-react";

interface HeaderProps {
  activePet: Pet;
  allPets: Pet[];
  onSelectPet: (pet: Pet) => void;
  lang: AppLanguage;
  onChangeLang: (lang: AppLanguage) => void;
  onAddNewPet: () => void;
  onPrintReport: () => void;
}

export default function Header({
  activePet,
  allPets,
  onSelectPet,
  lang,
  onChangeLang,
  onAddNewPet,
  onPrintReport
}: HeaderProps) {
  const t = TRANSLATIONS[lang];

  return (
    <header className="bg-white border-b border-indigo-100 sticky top-0 z-40 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Active Profile Info */}
        <div className="flex items-center gap-3">
          <div
            style={{ backgroundColor: activePet.avatarColor }}
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-inner select-none transition-transform hover:scale-105"
          >
            {activePet.type === "dog" ? "🐶" : activePet.type === "cat" ? "🐱" : activePet.type === "bird" ? "🦜" : activePet.type === "rabbit" ? "🐇" : "🐢"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-extrabold text-slate-800 text-lg leading-tight">
                {activePet.name}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-slate-100 text-slate-700">
                {activePet.breed}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Owner: <span className="text-slate-700 font-semibold">{activePet.ownerName}</span> ({activePet.city})
            </p>
          </div>
        </div>

        {/* Global Controls Wrapper */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-between md:justify-end">
          
          {/* Multi-Pet Profile Switcher drop down */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl px-2 py-1 border border-slate-200/40">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <select
              id="header-pet-switcher"
              aria-label="Select Active Pet Profile"
              value={activePet.id}
              onChange={(e) => {
                const selected = allPets.find(p => p.id === e.target.value);
                if (selected) onSelectPet(selected);
              }}
              className="bg-transparent border-0 text-xs font-bold text-slate-700 focus:outline-none focus:ring-0 pr-1 cursor-pointer"
            >
              {allPets.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.type === "cat" ? "Cat" : "Dog"})
                </option>
              ))}
            </select>
            
            {/* Quick add new button */}
            <button
              type="button"
              id="btn-add-profile-quick"
              onClick={onAddNewPet}
              className="text-indigo-600 hover:text-indigo-800 font-extrabold text-xs pl-1 cursor-pointer border-l border-slate-300 ml-1"
              title="Add a new pet profile"
            >
              + Add
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Lang switcher */}
            <button
              type="button"
              id="btn-toggle-lang"
              onClick={() => onChangeLang(lang === "en" ? "ur" : "en")}
              className="px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1 text-slate-700 text-xs font-bold hover:bg-slate-50 active:bg-slate-100 cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === "en" ? "اردو" : "English"}</span>
            </button>

            {/* Quick action: Print Report */}
            <button
              type="button"
              id="btn-print-report-header"
              onClick={onPrintReport}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-transparent text-white text-xs font-bold hover:bg-slate-800 cursor-pointer flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span className="hidden sm:inline">{t.healthReports}</span>
            </button>

            {/* Notifications Bell (interactive badge highlight) */}
            <div className="relative group">
              <button
                type="button"
                id="btn-bell-notif"
                className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 relative cursor-pointer"
                title="Pet Notifications"
              >
                <Bell className="w-4 h-4 text-slate-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-white" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
