import React, { useState } from "react";
import { Pet } from "../types";
import { FOOD_SAFETY_GUIDE } from "../data";
import { TRANSLATIONS, formatLocalDate } from "../utils";
import { 
  Heart, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Plus, 
  Calendar, 
  ChevronRight, 
  Activity, 
  Soup, 
  Utensils 
} from "lucide-react";

interface WellnessTrackerProps {
  activePet: Pet;
  lang: string;
}

interface MealItem {
  id: string;
  time: string;
  foodName: string;
  sourceType: "commercial" | "homecooked" | "treat";
  amount: string;
}

export default function WellnessTracker({ activePet, lang }: WellnessTrackerProps) {
  const t = TRANSLATIONS[lang as "en" | "ur"];
  
  // States
  const [searchFoodQuery, setSearchFoodQuery] = useState("");
  const [meals, setMeals] = useState<MealItem[]>([
    { id: "meal-1", time: "08:00 AM", foodName: "Commercial Protein Kibble", sourceType: "commercial", amount: "65 grams" },
    { id: "meal-2", time: "02:00 PM", foodName: "Boiled Curd (Dahi) water starter", sourceType: "homecooked", amount: "3 tablespoons" },
    { id: "meal-3", time: "08:30 PM", foodName: "Skinless Boiled Chicken & soft rice shorba", sourceType: "homecooked", amount: "100 grams" }
  ]);

  // Meal input states
  const [mealTime, setMealTime] = useState("");
  const [mealFood, setMealFood] = useState("");
  const [mealType, setMealType] = useState<"commercial" | "homecooked" | "treat">("homecooked");
  const [mealAmount, setMealAmount] = useState("");

  // Activity log states
  const [activities, setActivities] = useState<Array<{ id: string; description: string; duration: number; date: string }>>([
    { id: "act-1", description: "Indoor laser pointer chase", duration: 15, date: "2026-06-14" },
    { id: "act-2", description: "Soft neighborhood sunset walk", duration: 25, date: "2026-06-13" }
  ]);
  const [newActDesc, setNewActDesc] = useState("");
  const [newActDuration, setNewActDuration] = useState("");

  // Filter Food Safety Guide based on search input
  const filteredSafetyGuide = FOOD_SAFETY_GUIDE.filter(item => 
    item.food.toLowerCase().includes(searchFoodQuery.toLowerCase()) ||
    item.effectEn.toLowerCase().includes(searchFoodQuery.toLowerCase()) ||
    item.effectUr.includes(searchFoodQuery)
  );

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealTime.trim() || !mealFood.trim()) return;
    const item: MealItem = {
      id: "meal-" + Math.random().toString(36).substring(2, 6),
      time: mealTime,
      foodName: mealFood,
      sourceType: mealType,
      amount: mealAmount || "Custom amount"
    };
    setMeals([...meals, item]);
    setMealTime("");
    setMealFood("");
    setMealAmount("");
  };

  const handleRemoveMeal = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const durationMins = parseInt(newActDuration);
    if (!newActDesc.trim() || isNaN(durationMins) || durationMins <= 0) return;
    setActivities([
      {
        id: "act-" + Math.random().toString(36).substring(2, 6),
        description: newActDesc,
        duration: durationMins,
        date: new Date().toISOString().split("T")[0]
      },
      ...activities
    ]);
    setNewActDesc("");
    setNewActDuration("");
  };

  const handleRemoveActivity = (id: string) => {
    setActivities(activities.filter(act => act.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in" id="wellness-view">
      
      {/* 1. SECTOR: BILINGUAL FOOD SAFETY CHECKER ENGINE */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        
        {/* Header summary */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-sans font-black text-slate-800 text-lg flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-600 animate-bounce" />
              <span>{lang === "en" ? "Pakistan Kitchen Food Safety Checker" : "باورچی خانے کی خوراک کا معائنہ"}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {lang === "en" 
                ? "Verify instantly of common ingredients in local gravies and salans before feeding" 
                : "بچے پکے سالن یا دیگر اشیاء کھلانے سے پہلے فوری زہریلے پن کی جانچ کریں۔"}
            </p>
          </div>

          {/* Search bar inputs */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              id="food-safety-search"
              aria-label="Search food item"
              placeholder={lang === "en" ? "Search onboarding food or gravy..." : "کھانے کی چیز تلاش کریں..."}
              value={searchFoodQuery}
              onChange={(e) => setSearchFoodQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-2">
          {filteredSafetyGuide.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                item.status === "poisonous"
                  ? "bg-rose-50/30 border-rose-100 hover:border-rose-400 shadow-sm"
                  : "bg-emerald-50/20 border-emerald-100 hover:border-emerald-400 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-200/40 pb-2">
                <span className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5 font-sans">
                  {item.status === "poisonous" ? "❌" : "✅"} {item.food}
                </span>
                
                <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  item.status === "poisonous" 
                    ? "bg-rose-100 text-rose-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}>
                  {item.status === "poisonous" ? t.poisonousFoods : t.safeFoods}
                </span>
              </div>

              {/* Bilingual Descriptions block */}
              <div className="space-y-1">
                <p className="text-xs text-slate-700 font-medium leading-relaxed font-sans">
                  <strong>English:</strong> {item.effectEn}
                </p>
                <p className="text-xs text-indigo-950 font-sans leading-relaxed text-right font-medium">
                  <strong>اردو:</strong> {item.effectUr}
                </p>
              </div>
            </div>
          ))}

          {filteredSafetyGuide.length === 0 && (
            <div className="col-span-full text-center py-12 bg-slate-50 rounded-xl">
              <Utensils className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-bold mt-2">No corresponding ingredients recorded.</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Consult our Gemini AI veterinarian advisor below for custom answers!</p>
            </div>
          )}
        </div>

      </div>

      {/* 2. SECTOR: ACTIVE DIET PLANNER & MEALS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Diet Planner display */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Utensils className="w-5 h-5 text-indigo-600 animate-pulse" />
            <h3 className="font-sans font-black text-slate-800 text-base">{lang === "en" ? "Daily Hydration & Meal Planner" : "کھانے کا چارٹ"}</h3>
          </div>

          <div className="space-y-3">
            {meals.map(meal => (
              <div key={meal.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/40 flex items-center justify-between relative hover:border-slate-200 transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-1">
                    {meal.sourceType === "commercial" ? "🍖" : meal.sourceType === "treat" ? "🥕" : "🍲"}
                  </span>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-800 leading-snug">{meal.foodName}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">
                        {meal.time}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{meal.amount}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  id={`btn-remove-meal-${meal.id}`}
                  onClick={() => handleRemoveMeal(meal.id)}
                  className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                  title="Remove meal"
                >
                  <Search className="w-3.5 h-3.5 rotate-45 transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Meal input Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
          <h4 className="font-sans font-black text-slate-800 mb-4 text-sm">Schedule Meal Entry</h4>
          <form onSubmit={handleAddMeal} className="space-y-3">
            <div>
              <label htmlFor="meal-time-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Meal Time *</label>
              <input
                type="text"
                id="meal-time-input"
                required
                placeholder="e.g. 08:30 PM"
                value={mealTime}
                onChange={(e) => setMealTime(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>

            <div>
              <label htmlFor="meal-food-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Food Description *</label>
              <input
                type="text"
                id="meal-food-input"
                required
                placeholder="e.g. Mutton broth & boiled carrots"
                value={mealFood}
                onChange={(e) => setMealFood(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="meal-type-select" className="block text-xs font-bold text-slate-600 uppercase mb-1">Source Type</label>
                <select
                  id="meal-type-select"
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs bg-white"
                >
                  <option value="homecooked">🍲 Homemade</option>
                  <option value="commercial">🍗 Commercial</option>
                  <option value="treat">🥕 Reward Treat</option>
                </select>
              </div>
              <div>
                <label htmlFor="meal-amt-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Amount</label>
                <input
                  type="text"
                  id="meal-amt-input"
                  placeholder="e.g. 75g or 3 tsp"
                  value={mealAmount}
                  onChange={(e) => setMealAmount(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-xs bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              id="btn-add-meal-submit"
              className="w-full py-2.5 bg-slate-900 border border-transparent text-white text-xs font-black rounded-xl hover:bg-indigo-950 transition-all cursor-pointer"
            >
              Add Diet Line
            </button>
          </form>
        </div>
      </div>

      {/* 3. SECTOR: ACTIVE ACTIVITY EXERTION LOGGER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Activity tracking statistics list */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Activity className="w-5 h-5 text-indigo-600" />
            <h3 className="font-sans font-black text-slate-800 text-base">{lang === "en" ? "Interactive Physical Activity Logs" : "ورزش اور سرگرمیاں"}</h3>
          </div>

          <div className="space-y-3">
            {activities.map(act => (
              <div key={act.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/40 flex items-center justify-between relative hover:border-slate-200 transition-all">
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-1">🏃</span>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-800 leading-snug">{act.description}</h5>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded">
                        {act.duration} mins of play
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{formatLocalDate(act.date)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  id={`btn-remove-act-${act.id}`}
                  onClick={() => handleRemoveActivity(act.id)}
                  className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                  title="Remove activity log"
                >
                  <Search className="w-3.5 h-3.5 rotate-45 transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Activity input form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
          <h4 className="font-sans font-black text-slate-800 mb-4 text-sm">Log Custom Playtime</h4>
          <form onSubmit={handleAddActivity} className="space-y-3">
            <div>
              <label htmlFor="activity-desc-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Activity Name *</label>
              <input
                type="text"
                id="activity-desc-input"
                required
                placeholder="e.g. Frisbee chase in DHA park"
                value={newActDesc}
                onChange={(e) => setNewActDesc(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>

            <div>
              <label htmlFor="activity-dur-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Duration (minutes) *</label>
              <input
                type="number"
                id="activity-dur-input"
                required
                min="1"
                placeholder="e.g. 20"
                value={newActDuration}
                onChange={(e) => setNewActDuration(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
              />
            </div>

            <button
              type="submit"
              id="btn-add-activity-submit"
              className="w-full py-2.5 bg-slate-900 border border-transparent text-white text-xs font-black rounded-xl hover:bg-slate-950 transition-all cursor-pointer"
            >
              Log Exercise Metrics
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
