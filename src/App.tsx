import { useState, useEffect } from "react";
import { Pet, AppLanguage, Vaccination, Medication, VetVisit, WeightRecord, Reminder } from "./types";
import { loadState, saveState, TRANSLATIONS } from "./utils";
import Onboarding from "./components/Onboarding";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import HealthTrackers from "./components/HealthTrackers";
import AiAdvisor from "./components/AiAdvisor";
import EmergencyMap from "./components/EmergencyMap";
import CommunityForum from "./components/CommunityForum";
import Settings from "./components/Settings";
import { DEFAULT_PETS } from "./data";
import { 
  Home, 
  Activity, 
  MessageSquare, 
  MapPin, 
  Heart, 
  Settings as SettingsIcon 
} from "lucide-react";

export default function App() {
  // 1. GLOBAL STATE MANAGER WITH LOCALSTORAGE PERSISTENCE
  const [lang, setLang] = useState<AppLanguage>(() => loadState<AppLanguage>("lang", "en"));
  const [allPets, setAllPets] = useState<Pet[]>(() => loadState<Pet[]>("all_pets", []));
  const [activePetId, setActivePetId] = useState<string>(() => loadState<string>("active_pet_id", ""));
  
  const [vaccinations, setVaccinations] = useState<Vaccination[]>(() => loadState<Vaccination[]>("vaccinations", []));
  const [medications, setMedications] = useState<Medication[]>(() => loadState<Medication[]>("medications", []));
  const [vetVisits, setVetVisits] = useState<VetVisit[]>(() => loadState<VetVisit[]>("vet_visits", []));
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>(() => loadState<WeightRecord[]>("weight_records", []));
  const [reminders, setReminders] = useState<Reminder[]>(() => loadState<Reminder[]>("reminders", []));

  const [activeTab, setActiveTab] = useState<number>(0);

  // Synchronize state outputs automatically when changes are made
  useEffect(() => {
    saveState("lang", lang);
  }, [lang]);

  useEffect(() => {
    saveState("all_pets", allPets);
  }, [allPets]);

  useEffect(() => {
    saveState("active_pet_id", activePetId);
  }, [activePetId]);

  useEffect(() => {
    saveState("vaccinations", vaccinations);
  }, [vaccinations]);

  useEffect(() => {
    saveState("medications", medications);
  }, [medications]);

  useEffect(() => {
    saveState("vet_visits", vetVisits);
  }, [vetVisits]);

  useEffect(() => {
    saveState("weight_records", weightRecords);
  }, [weightRecords]);

  useEffect(() => {
    saveState("reminders", reminders);
  }, [reminders]);

  // Find currently active pet
  const activePet = allPets.find(p => p.id === activePetId);

  // 2. LIFECYCLE HANDLERS AND MUTATORS
  const handleOnboardingComplete = (newPet: Pet, onboardingLang: AppLanguage) => {
    setLang(onboardingLang);
    const updatedPets = [...allPets, newPet];
    setAllPets(updatedPets);
    setActivePetId(newPet.id);
    
    // Auto populate an initial initial weight record
    const weightRec: WeightRecord = {
      id: "wt-" + Math.random().toString(36).substring(2, 6),
      petId: newPet.id,
      weight: newPet.weight,
      date: new Date().toISOString().split("T")[0]
    };
    setWeightRecords(prev => [...prev, weightRec]);

    // Auto populate basic initial generic alarms
    const defaultAlarms: Reminder[] = [
      { id: "rem-d1", petId: newPet.id, title: "Breakfast dry food meal", time: "08:30", category: "food", frequency: "daily", active: true },
      { id: "rem-d2", petId: newPet.id, title: "Afternoon clean water bowls refresh", time: "14:00", category: "food", frequency: "daily", active: true },
      { id: "rem-d3", petId: newPet.id, title: "Sunset neighborhood garden stroll", time: "18:30", category: "walk", frequency: "daily", active: true }
    ];
    setReminders(prev => [...prev, ...defaultAlarms]);

    setActiveTab(0); // View dashboard
  };

  const handleAddNewPetProfile = () => {
    // Force onboarding screen by cleaning active selectors
    setActivePetId("");
    setActiveTab(0);
  };

  const handleUpdatePetProfile = (updatedPet: Pet) => {
    setAllPets(allPets.map(p => p.id === updatedPet.id ? updatedPet : p));
  };

  const handleWipeAndRestart = () => {
    localStorage.clear();
    setAllPets([]);
    setActivePetId("");
    setVaccinations([]);
    setMedications([]);
    setVetVisits([]);
    setWeightRecords([]);
    setReminders([]);
    setActiveTab(0);
  };

  // Add handlers
  const handleAddVaccine = (vac: Omit<Vaccination, "id">) => {
    const item: Vaccination = {
      ...vac,
      id: "vac-" + Math.random().toString(36).substring(2, 7)
    };
    setVaccinations(prev => [...prev, item]);
  };

  const handleToggleVaccine = (id: string) => {
    setVaccinations(vaccinations.map(v => {
      if (v.id === id) {
        return { 
          ...v, 
          status: v.status === "completed" ? "pending" : "completed",
          dateAdministered: v.status === "completed" ? undefined : new Date().toISOString().split("T")[0]
        };
      }
      return v;
    }));
  };

  const handleAddMedication = (med: Omit<Medication, "id">) => {
    const item: Medication = {
      ...med,
      id: "med-" + Math.random().toString(36).substring(2, 7)
    };
    setMedications(prev => [...prev, item]);
  };

  const handleToggleMedStatus = (id: string) => {
    setMedications(medications.map(m => {
      if (m.id === id) {
        return { ...m, status: m.status === "active" ? "completed" : "active" };
      }
      return m;
    }));
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const handleAddVetVisit = (visit: Omit<VetVisit, "id">) => {
    const item: VetVisit = {
      ...visit,
      id: "visit-" + Math.random().toString(36).substring(2, 7)
    };
    setVetVisits(prev => [...prev, item]);
    
    // Automatically trigger an auxiliary weight log matching visit notes if needed
  };

  const handleAddWeightRecord = (rec: Omit<WeightRecord, "id">) => {
    const item: WeightRecord = {
      ...rec,
      id: "wt-" + Math.random().toString(36).substring(2, 7)
    };
    setWeightRecords(prev => [...prev, item]);
    
    // Reflect onto active pet profile main state weight record for immediate consistency
    if (activePet && activePetId) {
      handleUpdatePetProfile({ ...activePet, weight: rec.weight });
    }
  };

  const handleAddReminder = (rem: Omit<Reminder, "id">) => {
    const item: Reminder = {
      ...rem,
      id: "rem-" + Math.random().toString(36).substring(2, 7)
    };
    setReminders(prev => [...prev, item]);
  };

  const handleToggleReminder = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  // Switcher Tab details titles
  const t = TRANSLATIONS[lang];

  // 3. SECTOR: ROUTE CONDITIONAL RENDERING CONTROL
  if (!activePetId || !activePet) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-150">
      
      {/* Dynamic Header Block */}
      <Header
        activePet={activePet}
        allPets={allPets}
        onSelectPet={(p) => setActivePetId(p.id)}
        lang={lang}
        onChangeLang={setLang}
        onAddNewPet={handleAddNewPetProfile}
        onPrintReport={() => setActiveTab(5)} // redirect directly to Settings/Compile pdf tab
      />

      {/* Main content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 space-y-6 pb-24">
        
        {/* Render Tab Views context conditionally */}
        {activeTab === 0 && (
          <Dashboard
            activePet={activePet}
            vaccinations={vaccinations}
            reminders={reminders}
            onToggleReminder={handleToggleReminder}
            onNavigateToTab={setActiveTab}
            lang={lang}
          />
        )}

        {activeTab === 1 && (
          <HealthTrackers
            activePet={activePet}
            vaccinations={vaccinations}
            onAddVaccine={handleAddVaccine}
            onToggleVaccineStatus={handleToggleVaccine}
            medications={medications}
            onAddMedication={handleAddMedication}
            onToggleMedicationStatus={handleToggleMedStatus}
            onDeleteMedication={handleDeleteMedication}
            vetVisits={vetVisits}
            onAddVetVisit={handleAddVetVisit}
            weightRecords={weightRecords}
            onAddWeightRecord={handleAddWeightRecord}
            reminders={reminders}
            onAddReminder={handleAddReminder}
            onDeleteReminder={handleDeleteReminder}
            lang={lang}
          />
        )}

        {activeTab === 2 && (
          <AiAdvisor
            activePet={activePet}
            lang={lang}
          />
        )}

        {activeTab === 3 && (
          <EmergencyMap
            activePet={activePet}
            lang={lang}
          />
        )}

        {activeTab === 4 && (
          <CommunityForum
            activePet={activePet}
            lang={lang}
          />
        )}

        {activeTab === 5 && (
          <Settings
            activePet={activePet}
            allPets={allPets}
            onUpdatePet={handleUpdatePetProfile}
            lang={lang}
            vaccinations={vaccinations}
            medications={medications}
            vetVisits={vetVisits}
            weightRecords={weightRecords}
            onWipeData={handleWipeAndRestart}
            onNavigateToTab={setActiveTab}
          />
        )}

      </main>

      {/* Persistent Mobile-scaffold bottom navigation tabs bar */}
      <nav id="bottom-navigator-bar" className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-indigo-100 py-2.5 px-4 shadow-lg z-40">
        <div className="max-w-xl mx-auto flex items-center justify-around gap-1 font-sans">
          
          <button
            type="button"
            id="nav-btn-home"
            onClick={() => setActiveTab(0)}
            className={`flex flex-col items-center gap-1 text-[10px] font-black tracking-wide cursor-pointer transition-colors ${activeTab === 0 ? "text-indigo-650" : "text-slate-400 hover:text-slate-600"}`}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            id="nav-btn-health"
            onClick={() => setActiveTab(1)}
            className={`flex flex-col items-center gap-1 text-[10px] font-black tracking-wide cursor-pointer transition-colors ${activeTab === 1 ? "text-indigo-650" : "text-slate-400 hover:text-slate-600"}`}
          >
            <Activity className="w-5 h-5" />
            <span>Medical</span>
          </button>

          <button
            type="button"
            id="nav-btn-advisor"
            onClick={() => setActiveTab(2)}
            className={`flex flex-col items-center gap-1 text-[10px] font-black tracking-wide cursor-pointer transition-colors relative ${activeTab === 2 ? "text-indigo-650" : "text-slate-400 hover:text-slate-600"}`}
          >
            {/* Pulsing AI badge indicator */}
            <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-rose-500 block animate-ping" />
            <Heart className="w-5 h-5 text-indigo-600 fill-indigo-200" />
            <span>Consult AI</span>
          </button>

          <button
            type="button"
            id="nav-btn-vets"
            onClick={() => setActiveTab(3)}
            className={`flex flex-col items-center gap-1 text-[10px] font-black tracking-wide cursor-pointer transition-colors ${activeTab === 3 ? "text-indigo-650" : "text-slate-400 hover:text-slate-600"}`}
          >
            <MapPin className="w-5 h-5" />
            <span>Vets</span>
          </button>

          <button
            type="button"
            id="nav-btn-community"
            onClick={() => setActiveTab(4)}
            className={`flex flex-col items-center gap-1 text-[10px] font-black tracking-wide cursor-pointer transition-colors ${activeTab === 4 ? "text-indigo-650" : "text-slate-400 hover:text-slate-600"}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Welfare</span>
          </button>

          <button
            type="button"
            id="nav-btn-settings"
            onClick={() => setActiveTab(5)}
            className={`flex flex-col items-center gap-1 text-[10px] font-black tracking-wide cursor-pointer transition-colors ${activeTab === 5 ? "text-indigo-650" : "text-slate-400 hover:text-slate-600"}`}
          >
            <SettingsIcon className="w-5 h-5" />
            <span>Settings</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
