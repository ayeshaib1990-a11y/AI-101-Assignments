import React, { useState } from "react";
import { Pet, EmergencyClinic } from "../types";
import { CLINICS_DATA } from "../data";
import { TRANSLATIONS } from "../utils";
import { 
  Building, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Check, 
  Truck, 
  Search, 
  Info,
  PhoneCall
} from "lucide-react";

interface EmergencyMapProps {
  activePet: Pet;
  lang: string;
}

export default function EmergencyMap({ activePet, lang }: EmergencyMapProps) {
  const t = TRANSLATIONS[lang as "en" | "ur"];
  
  // States
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>(activePet.city);
  const [filter24Hours, setFilter24Hours] = useState<boolean>(false);
  const [filterAmbulance, setFilterAmbulance] = useState<boolean>(false);

  // Generate unique list of cities in the clinic database to feed dropdown options
  const uniqueCities = Array.from(new Set(CLINICS_DATA.map(c => c.city)));

  // Filter the emergency clinics based on variables
  const filteredClinics = CLINICS_DATA.filter(clinic => {
    const matchesCity = clinic.city.toLowerCase() === selectedCityFilter.toLowerCase();
    const matches24Hrs = !filter24Hours || clinic.is24Hours;
    const matchesAmbulance = !filterAmbulance || clinic.hasAmbulance;
    return matchesCity && matches24Hrs && matchesAmbulance;
  });

  return (
    <div className="space-y-6 animate-fade-in" id="emergency-vet-view">
      
      {/* 1. SECTOR: FILTERS ENGINE AND SUMMARY HELPER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-sans font-black text-slate-800 text-lg flex items-center gap-2">
              <span className="p-1 px-2.5 bg-rose-500 text-white rounded-xl text-xs font-black">24/7</span>
              <span>{t.emergencyClinic}</span>
            </h3>
            <p className="text-xs text-slate-400">
              Locate ambulance services and top certified veterinary clinics nearby
            </p>
          </div>

          {/* Filtering Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Filter City:</span>
            <select
              id="emergency-city-select"
              aria-label="Select City for Emergency Vet Lookup"
              value={selectedCityFilter}
              onChange={(e) => setSelectedCityFilter(e.target.value)}
              className="rounded-xl border border-slate-300 py-1.5 px-3 bg-white text-xs font-bold text-slate-700 focus:ring-indigo-500 focus:outline-none"
            >
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Boolean toggle checkboxes: 24/7 hours or Amb services */}
        <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100">
          <button
            type="button"
            id="toggle-filter-24hrs"
            onClick={() => setFilter24Hours(!filter24Hours)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              filter24Hours 
                ? "bg-rose-500 border-rose-500 text-white shadow-sm" 
                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{t.verified247}</span>
          </button>

          <button
            type="button"
            id="toggle-filter-ambulance"
            onClick={() => setFilterAmbulance(!filterAmbulance)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              filterAmbulance 
                ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" 
                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{t.ambulanceActive}</span>
          </button>
        </div>
      </div>

      {/* 2. CLINICS LOG SHEET CARDS GRID */}
      <h4 className="font-sans font-black text-slate-800 text-base leading-none">
        {t.clinicsNearTitle} <span className="text-indigo-600 font-black">{selectedCityFilter}</span>
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClinics.map(clinic => (
          <div
            key={clinic.id}
            className="bg-white rounded-3xl p-5 border border-slate-150 shadow-xs relative hover:shadow-md transition-all flex flex-col justify-between"
          >
            
            {/* Top info and badge tag alignment */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="w-9 h-9 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center text-sm font-black select-none shrink-0">
                  🏥
                </span>
                
                {/* 24/7 visual highlighted indicator badge */}
                {clinic.is24Hours && (
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white flex items-center gap-0.5 shadow-sm uppercase tracking-wide">
                    <Clock className="w-2.5 h-2.5" /> 24 HOURS ACTIVE
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <h5 className="font-extrabold text-slate-800 text-sm leading-tight font-sans">
                  {clinic.name}
                </h5>
                <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{clinic.address}</span>
                </p>
              </div>

              {/* Verified location flags */}
              <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-slate-100/60">
                {clinic.hasAmbulance && (
                  <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-150 rounded px-1.5 py-0.5">
                    Ambulance Active
                  </span>
                )}
                <span className="text-[9px] font-semibold text-slate-400 bg-slate-50 rounded px-1.5 py-0.5 font-mono">
                  GPS: {clinic.coordinatesText}
                </span>
              </div>
            </div>

            {/* Helpline dial option integration */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
              <span className="text-xs font-mono font-black text-slate-800 flex-grow">
                {clinic.phone}
              </span>
              
              <a
                id={`btn-tel-${clinic.id}`}
                href={`tel:${clinic.phone}`}
                className="px-3.5 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 shrink-0 hover:scale-105 active:scale-95 transition-transform"
                title={`Call ${clinic.name} hotline now`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{t.dialBtn}</span>
              </a>
            </div>

          </div>
        ))}

        {filteredClinics.length === 0 && (
          <div className="col-span-full py-16 bg-white border border-slate-100 text-center rounded-3xl shadow-sm">
            <Building className="w-12 h-12 text-slate-200 mx-auto" />
            <h5 className="text-sm font-extrabold text-slate-800 mt-2">No clinics matching selected toggles cataloged.</h5>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              Try toggling off the <strong>&quot;{t.verified247}&quot;</strong> or <strong>&quot;{t.ambulanceActive}&quot;</strong> checkboxes to retrieve general clinics in {selectedCityFilter}.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
