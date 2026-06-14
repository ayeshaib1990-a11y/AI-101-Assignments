import React, { useState } from "react";
import { Pet, AppLanguage } from "../types";
import { PAKISTANI_CITIES, LOCAL_BREEDS, DEFAULT_PETS } from "../data";
import { TRANSLATIONS } from "../utils";
import { ShieldCheck, Heart, Sparkles, HelpCircle } from "lucide-react";

interface OnboardingProps {
  onComplete: (pet: Pet, lang: AppLanguage) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [lang, setLang] = useState<AppLanguage>("en");
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  
  // Custom Pet Form States
  const [ownerName, setOwnerName] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState<"dog" | "cat" | "bird" | "rabbit" | "other">("cat");
  const [breed, setBreed] = useState("");
  const [ageYears, setAgeYears] = useState(0);
  const [ageMonths, setAgeMonths] = useState(3);
  const [weight, setWeight] = useState(1.5);
  const [gender, setGender] = useState<"male" | "female">("female");
  const [sterilized, setSterilized] = useState(false);
  const [city, setCity] = useState("Lahore");
  const [avatarColor, setAvatarColor] = useState("#ED6C85"); // default pinkish
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const t = TRANSLATIONS[lang];

  // Colors Palette
  const AVATAR_COLORS = [
    { value: "#ED6C85", name: "Rose" },
    { value: "#4F46E5", name: "Indigo" },
    { value: "#059669", name: "Emerald" },
    { value: "#D97706", name: "Amber" },
    { value: "#2563EB", name: "Blue" },
    { value: "#7C3AED", name: "Violet" }
  ];

  const handleQuickLoad = (selectedSampleIndex: number) => {
    // Populate with seeded pets Sherry/Simbo
    const selectedSeeded = DEFAULT_PETS[selectedSampleIndex];
    onComplete({
      ...selectedSeeded,
      id: Math.random().toString(36).substring(2),
      createdDate: new Date().toISOString().split("T")[0]
    }, lang);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!ownerName.trim()) newErrors.ownerName = "Owner name is required / نام لازمی ہے";
    if (!petName.trim()) newErrors.petName = "Pet name is required / پالتو جانور کا نام لازمی ہے";
    if (!breed.trim()) newErrors.breed = "Breed selection is required / نسل لازمی ہے";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const customPet: Pet = {
      id: "pet-" + Math.random().toString(36).substring(2, 9),
      name: petName,
      type: petType,
      breed: breed,
      ageYears: Number(ageYears) || 0,
      ageMonths: Number(ageMonths) || 0,
      weight: Number(weight) || 1,
      gender: gender,
      sterilized: sterilized,
      avatarColor: avatarColor,
      city: city,
      ownerName: ownerName,
      createdDate: new Date().toISOString().split("T")[0]
    };

    onComplete(customPet, lang);
  };

  // Auto-fill a common breed if petType changes
  React.useEffect(() => {
    const list = LOCAL_BREEDS[petType] || [];
    if (list.length > 0) {
      setBreed(list[0]);
    } else {
      setBreed("");
    }
  }, [petType]);

  return (
    <div id="onboarding-screen" className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 selection:bg-indigo-100">
      {/* Container Card */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col">
        
        {/* Top Branding Section */}
        <div className="bg-indigo-900 text-white p-8 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-800 rounded-full -mr-16 -mt-16 opacity-30" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-500 rounded-full -ml-12 -mb-12 opacity-20" />
          
          <div className="inline-flex items-center gap-2 bg-indigo-800/60 px-4 py-1.5 rounded-full text-xs font-semibold mb-3 border border-indigo-700">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
            <span>Pakistan’s #1 Pet Companion App</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-2 font-sans">
            {t.appName}
          </h1>
          <p className="text-indigo-200 text-sm max-w-md mx-auto">
            {t.onboardingSub}
          </p>
        </div>

        {/* Form & Choices Area */}
        <div className="p-8 flex-1">
          
          {/* Language Switcher Button Group */}
          <div className="mb-8 bg-slate-100 p-1.5 rounded-2xl flex items-center justify-between border border-slate-200/50">
            <span className="text-xs font-semibold text-slate-500 pl-3">
              App Language / زبان:
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                id="btn-lang-en"
                onClick={() => setLang("en")}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${lang === "en" ? "bg-white text-indigo-900 shadow-sm font-semibold" : "text-slate-600 hover:bg-white/50"}`}
              >
                English
              </button>
              <button
                type="button"
                id="btn-lang-ur"
                onClick={() => setLang("ur")}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all font-sans ${lang === "ur" ? "bg-white text-indigo-900 shadow-sm font-bold" : "text-slate-600 hover:bg-white/50"}`}
              >
                اردو
              </button>
            </div>
          </div>

          {!isCustomMode ? (
            /* MODE SELECTOR */
            <div className="space-y-6">
              <div className="text-center mb-4">
                <h3 className="text-base font-semibold text-slate-700">
                  {lang === "en" ? "How would you like to get started?" : "آپ کیسے آغاز کرنا پسند کریں گے؟"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {lang === "en" 
                    ? "Choose a ready pet profile to explore health features instantly, or create your own." 
                    : "ہمارے بنے بنائے پالتو جانوروں کے پروفائل منتخب کر کے فوری معائنہ کریں یا خود درج کریں۔"
                  }
                </p>
              </div>

              {/* Sample Quick Load Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Seed Pet 1: Sherry (Persian Cat) */}
                <button
                  type="button"
                  id="btn-seed-sherry"
                  onClick={() => handleQuickLoad(0)}
                  className="p-5 rounded-2xl border-2 border-slate-200 hover:border-pink-500 text-left bg-slate-50 hover:bg-pink-50/20 transition-all cursor-pointer group hover:scale-[1.01]"
                >
                  <span className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white text-lg font-bold shadow-md shadow-pink-200 group-hover:scale-105 transition-all">
                    🐱
                  </span>
                  <div className="mt-4">
                    <span className="text-xs font-bold text-pink-600 tracking-wider uppercase">Sample Cat (Karachi)</span>
                    <h4 className="text-lg font-extrabold text-slate-800">Sherry Shah</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === "en" 
                        ? "1.3 Years old, Persian. Local vaccines logged, Karachi active alerts ready." 
                        : "۱.۳ سال، ایرانی بلی۔ کراچی ویکسین اور موسم کے گرم حالات الرٹ سیٹ۔"
                      }
                    </p>
                  </div>
                </button>

                {/* Seed Pet 2: Simbo (German Shepherd Dog) */}
                <button
                  type="button"
                  id="btn-seed-simbo"
                  onClick={() => handleQuickLoad(1)}
                  className="p-5 rounded-2xl border-2 border-slate-200 hover:border-indigo-500 text-left bg-slate-50 hover:bg-indigo-50/20 transition-all cursor-pointer group hover:scale-[1.01]"
                >
                  <span className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-md shadow-indigo-200 group-hover:scale-105 transition-all">
                    🐶
                  </span>
                  <div className="mt-4">
                    <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Sample Dog (Lahore)</span>
                    <h4 className="text-lg font-extrabold text-slate-800">Simbo Malik</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === "en" 
                        ? "2.1 Years old, GSD. Active deworming table, Lahore monsoon tick warnings." 
                        : "۲.۱ سال، جرمن شیفرڈ۔ لاہور مون سون الرٹس، ادویات اور ریمائنڈر چارٹ۔"
                      }
                    </p>
                  </div>
                </button>

              </div>

              {/* Or customized button */}
              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 tracking-widest uppercase">
                  {lang === "en" ? "OR BUILD NEW" : "يا نیا بنائیں"}
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                id="btn-switch-custom"
                onClick={() => setIsCustomMode(true)}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-950 text-white rounded-2xl py-4 font-bold text-sm tracking-wide transition-all shadow-md shadow-slate-300 hover:shadow-indigo-900/10 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                {t.getStarted}
              </button>
            </div>
          ) : (
            /* CUSTOM FORM MODE */
            <form onSubmit={handleCustomSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="flex items-center justify-between border-b pb-3 mb-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  {lang === "en" ? "Register New Pet Wallet" : "نیا پالتو جانور ہولڈر"}
                </h4>
                <button
                  type="button"
                  id="btn-back-to-quick"
                  onClick={() => setIsCustomMode(false)}
                  className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                >
                  {lang === "en" ? "← Back / پیچھے جائیں" : "← واپس"}
                </button>
              </div>

              {/* Owner and Pet names Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                <div>
                  <label htmlFor="owner-name-input" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    {t.ownerLabel} *
                  </label>
                  <input
                    type="text"
                    id="owner-name-input"
                    value={ownerName}
                    placeholder="e.g. Ayesha Khan"
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                  {errors.ownerName && <span className="text-xs text-rose-500">{errors.ownerName}</span>}
                </div>

                <div>
                  <label htmlFor="pet-name-input" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    {t.petNameLabel} *
                  </label>
                  <input
                    type="text"
                    id="pet-name-input"
                    value={petName}
                    placeholder="e.g. Snowy"
                    onChange={(e) => setPetName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                  {errors.petName && <span className="text-xs text-rose-500">{errors.petName}</span>}
                </div>
              </div>

              {/* City and Pet Type Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city-select" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    {t.cityLabel}
                  </label>
                  <select
                    id="city-select"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 py-2.5 px-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {PAKISTANI_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="pet-type-select" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    {t.petTypeLabel}
                  </label>
                  <select
                    id="pet-type-select"
                    value={petType}
                    onChange={(e) => setPetType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-300 py-2.5 px-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="cat">😼 {lang === "en" ? "Cat" : "بلی"}</option>
                    <option value="dog">🐶 {lang === "en" ? "Dog" : "کتا"}</option>
                    <option value="bird">🦜 {lang === "en" ? "Bird / Parrot" : "پرندہ"}</option>
                    <option value="rabbit">🐇 {lang === "en" ? "Rabbit" : "خرگوش"}</option>
                    <option value="other">🐢 {lang === "en" ? "Other" : "دیگر"}</option>
                  </select>
                </div>
              </div>

              {/* Breed and Weight Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="breed-select" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    {t.petBreedLabel} *
                  </label>
                  <input
                    type="text"
                    id="breed-select"
                    value={breed}
                    list="breed-options-datalist"
                    placeholder="e.g. Persian"
                    onChange={(e) => setBreed(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                  <datalist id="breed-options-datalist">
                    {(LOCAL_BREEDS[petType] || []).map(b => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                  {errors.breed && <span className="text-xs text-rose-500">{errors.breed}</span>}
                </div>

                <div>
                  <label htmlFor="weight-input" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    {t.petWeight}
                  </label>
                  <input
                    type="number"
                    id="weight-input"
                    step="0.1"
                    min="0.1"
                    value={weight}
                    onChange={(e) => setWeight(Math.max(0.1, parseFloat(e.target.value) || 1.5))}
                    className="w-full rounded-xl border border-slate-300 py-2.5 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>

              {/* Age Years and Age Months Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age-years-input" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    {t.petAgeYears}
                  </label>
                  <input
                    type="number"
                    id="age-years-input"
                    min="0"
                    max="25"
                    value={ageYears}
                    onChange={(e) => setAgeYears(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl border border-slate-300 py-2.5 px-3 py-2 text-sm bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="age-months-input" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    {t.petAgeMonths}
                  </label>
                  <select
                    id="age-months-input"
                    value={ageMonths}
                    onChange={(e) => setAgeMonths(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-300 py-2.5 px-3 bg-white text-sm"
                  >
                    {Array.from({ length: 12 }).map((_, i) => (
                      <option key={i} value={i}>{i} Mo</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Gender and Sterilized Row */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    {t.genderLabel}
                  </span>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      id="gender-btn-male"
                      onClick={() => setGender("male")}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold tracking-wide cursor-pointer transition-all ${gender === "male" ? "bg-white text-slate-800 shadow" : "text-slate-500"}`}
                    >
                      {t.male}
                    </button>
                    <button
                      type="button"
                      id="gender-btn-female"
                      onClick={() => setGender("female")}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold tracking-wide cursor-pointer transition-all ${gender === "female" ? "bg-white text-slate-800 shadow" : "text-slate-500"}`}
                    >
                      {t.female}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    {t.sterilizedLabel}
                  </span>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      id="sterilized-btn-no"
                      onClick={() => setSterilized(false)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold tracking-wide cursor-pointer transition-all ${!sterilized ? "bg-rose-500 text-white shadow" : "text-slate-500"}`}
                    >
                      {t.no}
                    </button>
                    <button
                      type="button"
                      id="sterilized-btn-yes"
                      onClick={() => setSterilized(true)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold tracking-wide cursor-pointer transition-all ${sterilized ? "bg-indigo-600 text-white shadow" : "text-slate-500"}`}
                    >
                      {t.yes}
                    </button>
                  </div>
                </div>
              </div>

              {/* Theme Avatar Color Selection */}
              <div>
                <span className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Pet Theme Color
                </span>
                <div className="flex gap-3">
                  {AVATAR_COLORS.map(c => (
                    <button
                      key={c.value}
                      type="button"
                      aria-label={c.name}
                      onClick={() => setAvatarColor(c.value)}
                      style={{ backgroundColor: c.value }}
                      className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 ${avatarColor === c.value ? "border-slate-800 scale-105" : "border-transparent"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Submit Custom Wallet button */}
              <button
                type="submit"
                id="btn-register-submit"
                className="w-full bg-indigo-600 hover:bg-indigo-800 text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition-all shadow-md mt-4 cursor-pointer"
              >
                {t.registerBtn}
              </button>
            </form>
          )}

        </div>

        {/* Footer info branding labels */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center text-[10px] text-slate-400 font-mono tracking-wider">
          SECURE CLIENT-SIDE WALLET (LOCALSTORAGE DB) • PK COMPLIANT
        </div>

      </div>
    </div>
  );
}
