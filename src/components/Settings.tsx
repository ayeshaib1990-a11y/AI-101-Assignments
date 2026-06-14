import React, { useState } from "react";
import { Pet, Vaccination, Medication, VetVisit, WeightRecord, Reminder } from "../types";
import { TRANSLATIONS } from "../utils";
import { 
  Heart, 
  Trash2, 
  Printer, 
  RotateCcw, 
  Settings as SettingsIcon,
  Award,
  BookOpen,
  Clipboard,
  Info
} from "lucide-react";

interface SettingsProps {
  activePet: Pet;
  allPets: Pet[];
  onUpdatePet: (updated: Pet) => void;
  lang: string;
  vaccinations: Vaccination[];
  medications: Medication[];
  vetVisits: VetVisit[];
  weightRecords: WeightRecord[];
  onWipeData: () => void;
  onNavigateToTab: (index: number) => void;
}

export default function Settings({
  activePet,
  allPets,
  onUpdatePet,
  lang,
  vaccinations,
  medications,
  vetVisits,
  weightRecords,
  onWipeData,
  onNavigateToTab
}: SettingsProps) {
  const t = TRANSLATIONS[lang as "en" | "ur"];
  
  // States
  const [ownerName, setOwnerName] = useState(activePet.ownerName);
  const [breed, setBreed] = useState(activePet.breed);
  const [weight, setWeight] = useState(activePet.weight.toString());
  const [city, setCity] = useState(activePet.city);
  const [isSavedDone, setIsSavedDone] = useState(false);

  // Print-Ready compiler helper variables
  const filteredVaccines = vaccinations.filter(v => v.petId === activePet.id);
  const filteredMeds = medications.filter(m => m.petId === activePet.id);
  const filteredVisits = vetVisits.filter(v => v.petId === activePet.id);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName.trim() || !breed.trim()) return;

    onUpdatePet({
      ...activePet,
      ownerName: ownerName,
      breed: breed,
      weight: parseFloat(weight) || activePet.weight,
      city: city
    });

    setIsSavedDone(true);
    setTimeout(() => setIsSavedDone(false), 2500);
  };

  const triggerBrowserPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in" id="settings-view">
      
      {/* 1. SECTOR: EDIT PET DETAILS FORM */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-sans font-black text-slate-800 text-lg flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-indigo-600" />
          <span>Update Wallet Parameters</span>
        </h3>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="settings-owner-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Owner Name</label>
            <input
              type="text"
              id="settings-owner-input"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
            />
          </div>

          <div>
            <label htmlFor="settings-breed-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Breed Description</label>
            <input
              type="text"
              id="settings-breed-input"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
            />
          </div>

          <div>
            <label htmlFor="settings-weight-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Weight Metric (KG)</label>
            <input
              type="number"
              id="settings-weight-input"
              step="0.01"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
            />
          </div>

          <div>
            <label htmlFor="settings-city-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Active Residence City</label>
            <input
              type="text"
              id="settings-city-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white font-semibold text-slate-700"
            />
          </div>

          <div className="col-span-full pt-2 flex items-center justify-between">
            {isSavedDone && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                ✔ Credentials Saved Successfully!
              </span>
            )}
            <button
              type="submit"
              id="btn-settings-update-submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl text-xs font-black shadow transition-all cursor-pointer ml-auto"
            >
              Save Parameters
            </button>
          </div>
        </form>
      </div>

      {/* 2. COMPILER: PRINT-READY DOSSIER CARD */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div>
          <h3 className="font-sans font-black text-slate-800 text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 animate-pulse" />
            <span>Pet Medical Passport & Report Compiler</span>
          </h3>
          <p className="text-xs text-slate-400">
            Generates a printable clinical booklet of immunization dates and medication indexes.
          </p>
        </div>

        {/* Dossier Mockup Container */}
        <div id="print-ready-dossier" className="border-2 border-dashed border-slate-200 p-6 rounded-2xl bg-slate-50/50 space-y-6">
          
          {/* Top Dossier logo header */}
          <div className="flex justify-between items-start border-b pb-4 border-slate-200">
            <div>
              <span className="text-[10px] tracking-widest font-mono text-indigo-600 font-bold block">PAKPET MEDICAL DOSSIER</span>
              <h4 className="text-xl font-serif font-black text-slate-800">Veterinary Passport & Vaccines Summary</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Report Compilation Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-indigo-900 font-sans block">{activePet.name} Shah</span>
              <span className="text-[9px] font-bold text-slate-500 uppercase">{activePet.breed} • {activePet.city}</span>
            </div>
          </div>

          {/* Core variables tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <h5 className="font-bold text-slate-700 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">Vaccine Records</h5>
              {filteredVaccines.length > 0 ? (
                <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                  {filteredVaccines.map(vac => (
                    <li key={vac.id}>
                      <strong className="text-slate-800">{vac.name}</strong> - 
                      <span className="font-bold text-emerald-700"> {vac.status === 'completed' ? 'Immunized' : 'Scheduled'}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-slate-400 italic">No vaccines booked.</span>
              )}
            </div>

            <div>
              <h5 className="font-bold text-slate-700 uppercase tracking-wide border-b border-slate-200 pb-1 mb-2">Prescription Courses</h5>
              {filteredMeds.length > 0 ? (
                <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                  {filteredMeds.map(med => (
                    <li key={med.id}>
                      <strong className="text-slate-800">{med.name}</strong> - {med.dosage} ({med.frequency})
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-slate-400 italic">No prescription histories.</span>
              )}
            </div>
          </div>

          <div className="border-t pt-4 border-slate-200/60 text-[10px] text-slate-400 font-mono flex flex-col md:flex-row md:items-center justify-between gap-2">
            <span>ISSUED IN ACCORDANCE WITH PAKISTAN VET WELLNESS REGULATIONS</span>
            <span>VERIFIED WALLET CODE: PK-PASSPORT-{activePet.id.toUpperCase()}</span>
          </div>

        </div>

        <button
          type="button"
          id="btn-print-dossier-submit"
          onClick={triggerBrowserPrint}
          className="w-full py-3 bg-slate-900 hover:bg-indigo-950 border border-transparent text-white text-xs font-black rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow"
        >
          <Printer className="w-4 h-4 text-rose-400" />
          <span>Download Printer PDF Booklet</span>
        </button>
      </div>

      {/* 3. SECTOR: SENSITIVE DATA RESET ACTIONS */}
      <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-sans font-black text-rose-800 text-sm">Wipe Local Wallet Datasets?</h4>
          <p className="text-xs text-rose-600">Irreversibly clearing deworming records, clinical fees, and localized custom profiles.</p>
        </div>

        <button
          type="button"
          id="btn-wipe-datasets"
          onClick={() => {
            if (confirm("Proceed to clear all localstorage vaccinations and medications profiles? This cannot be undone.")) {
              onWipeData();
            }
          }}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-800 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer shrink-0 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Wipe & Restart</span>
        </button>
      </div>

    </div>
  );
}
