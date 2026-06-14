import React, { useState, useEffect } from "react";
import { Pet, Vaccination, Medication, VetVisit, WeightRecord, Reminder } from "../types";
import { DEFAULT_VACCINES } from "../data";
import { TRANSLATIONS, formatPKR, formatLocalDate } from "../utils";
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Award, 
  Clipboard, 
  Pill, 
  TrendingUp, 
  DollarSign, 
  Heart, 
  Calendar,
  User,
  Activity,
  CheckCircle,
  Clock,
  Printer
} from "lucide-react";

interface HealthTrackersProps {
  activePet: Pet;
  vaccinations: Vaccination[];
  onAddVaccine: (v: Omit<Vaccination, "id">) => void;
  onToggleVaccineStatus: (id: string) => void;
  medications: Medication[];
  onAddMedication: (m: Omit<Medication, "id">) => void;
  onToggleMedicationStatus: (id: string) => void;
  onDeleteMedication: (id: string) => void;
  vetVisits: VetVisit[];
  onAddVetVisit: (v: Omit<VetVisit, "id">) => void;
  weightRecords: WeightRecord[];
  onAddWeightRecord: (w: Omit<WeightRecord, "id">) => void;
  reminders: Reminder[];
  onAddReminder: (r: Omit<Reminder, "id">) => void;
  onDeleteReminder: (id: string) => void;
  lang: string;
}

export default function HealthTrackers({
  activePet,
  vaccinations,
  onAddVaccine,
  onToggleVaccineStatus,
  medications,
  onAddMedication,
  onToggleMedicationStatus,
  onDeleteMedication,
  vetVisits,
  onAddVetVisit,
  weightRecords,
  onAddWeightRecord,
  reminders,
  onAddReminder,
  onDeleteReminder,
  lang
}: HealthTrackersProps) {
  const t = TRANSLATIONS[lang as "en" | "ur"];
  const [activeSubTab, setActiveSubTab] = useState<"vaccines" | "meds" | "visits" | "weight" | "reminders">("vaccines");

  // Filtering records for active pet
  const petVaccines = vaccinations.filter(v => v.petId === activePet.id);
  const petMeds = medications.filter(m => m.petId === activePet.id);
  const petVisits = vetVisits.filter(v => v.petId === activePet.id);
  const petWeights = weightRecords
    .filter(w => w.petId === activePet.id)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Input states for Add Vaccination
  const [newVacName, setNewVacName] = useState("");
  const [newVacDisease, setNewVacDisease] = useState("");
  const [newVacDoc, setNewVacDoc] = useState("");

  // Input states for Add Medication
  const [newMedName, setNewMedName] = useState("");
  const [newMedDose, setNewMedDose] = useState("");
  const [newMedFreq, setNewMedFreq] = useState("Once daily");
  const [newMedStart, setNewMedStart] = useState("");
  const [newMedEnd, setNewMedEnd] = useState("");
  const [newMedNotes, setNewMedNotes] = useState("");

  // Input states for Add Vet Visit
  const [newVetName, setNewVetName] = useState("");
  const [newVetClinic, setNewVetClinic] = useState("");
  const [newVetReason, setNewVetReason] = useState("");
  const [newVetNotes, setNewVetNotes] = useState("");
  const [newVetPresc, setNewVetPresc] = useState("");
  const [newVetCost, setNewVetCost] = useState("");
  const [newVetDate, setNewVetDate] = useState("");

  // Input states for Add Weight
  const [newWeightValue, setNewWeightValue] = useState("");
  const [newWeightDate, setNewWeightDate] = useState("");

  // Input states for Add Reminder
  const [newRemTitle, setNewRemTitle] = useState("");
  const [newRemTime, setNewRemTime] = useState("09:00");
  const [newRemCat, setNewRemCat] = useState<"food" | "vaccine" | "pill" | "visit" | "grooming" | "walk">("food");
  const [newRemFreq, setNewRemFreq] = useState<"daily" | "weekly" | "once">("daily");

  // Active Vaccine Certificate visual modal helper toggle
  const [selectedVacCertificate, setSelectedVacCertificate] = useState<Vaccination | null>(null);

  // Seed default vaccination schedule if booklet is blank
  const handleAutoSeedVaccines = () => {
    const list = DEFAULT_VACCINES[activePet.type] || DEFAULT_VACCINES.other;
    list.forEach(vac => {
      onAddVaccine({
        petId: activePet.id,
        name: vac.name,
        diseaseProtected: vac.diseaseProtected,
        dateScheduled: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "pending"
      });
    });
  };

  const handleCreateVac = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVacName.trim() || !newVacDisease.trim()) return;
    onAddVaccine({
      petId: activePet.id,
      name: newVacName,
      diseaseProtected: newVacDisease,
      dateScheduled: new Date().toISOString().split("T")[0],
      dateAdministered: new Date().toISOString().split("T")[0],
      status: "completed",
      administeredBy: newVacDoc || "Licensed Vet"
    });
    setNewVacName("");
    setNewVacDisease("");
    setNewVacDoc("");
  };

  const handleCreateMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim() || !newMedDose.trim()) return;
    onAddMedication({
      petId: activePet.id,
      name: newMedName,
      dosage: newMedDose,
      frequency: newMedFreq,
      dateStart: newMedStart || new Date().toISOString().split("T")[0],
      dateEnd: newMedEnd || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "active",
      notes: newMedNotes
    });
    setNewMedName("");
    setNewMedDose("");
    setNewMedStart("");
    setNewMedEnd("");
    setNewMedNotes("");
  };

  const handleCreateVetVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVetName.trim() || !newVetClinic.trim() || !newVetReason.trim()) return;
    onAddVetVisit({
      petId: activePet.id,
      vetName: newVetName,
      clinicName: newVetClinic,
      visitDate: newVetDate || new Date().toISOString().split("T")[0],
      reason: newVetReason,
      notes: newVetNotes,
      prescription: newVetPresc,
      cost: parseFloat(newVetCost) || 0
    });
    setNewVetName("");
    setNewVetClinic("");
    setNewVetReason("");
    setNewVetNotes("");
    setNewVetPresc("");
    setNewVetCost("");
    setNewVetDate("");
  };

  const handleCreateWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const wt = parseFloat(newWeightValue);
    if (isNaN(wt) || wt <= 0) return;
    onAddWeightRecord({
      petId: activePet.id,
      weight: wt,
      date: newWeightDate || new Date().toISOString().split("T")[0]
    });
    setNewWeightValue("");
    setNewWeightDate("");
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRemTitle.trim()) return;
    onAddReminder({
      petId: activePet.id,
      title: newRemTitle,
      time: newRemTime,
      category: newRemCat,
      frequency: newRemFreq,
      active: true
    });
    setNewRemTitle("");
  };

  // Cumulative Vet spend calculation
  const totalSpend = petVisits.reduce((acc, current) => acc + current.cost, 0);

  // Fully Responsive Viewport-Fluid SVG coordinates calculations for Weight Progression graph
  // Map points onto a box of graph width 500 and height 200
  const svgW = 500;
  const svgH = 200;
  const padding = 35;
  
  let dPath = "";
  let points: Array<{ x: number; y: number; weight: number; date: string }> = [];

  if (petWeights.length > 0) {
    const minW = Math.max(0, Math.min(...petWeights.map(w => w.weight)) - 1);
    const maxW = Math.max(...petWeights.map(w => w.weight)) + 1;
    const wtRange = maxW - minW || 1;

    petWeights.forEach((rec, idx) => {
      // Calculate responsive x matching data slots
      const x = padding + (idx / Math.max(1, petWeights.length - 1)) * (svgW - padding * 2);
      // Coordinate y flipped where higher weights represent visually elevated points
      const y = svgH - padding - ((rec.weight - minW) / wtRange) * (svgH - padding * 2);
      points.push({ x, y, weight: rec.weight, date: rec.date });
    });

    if (points.length > 0) {
      dPath = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        dPath += ` L ${points[i].x} ${points[i].y}`;
      }
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Dynamic Sub Tab Buttons Selector */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm sticky top-16 z-30">
        <button
          type="button"
          id="btn-subtab-vac"
          onClick={() => setActiveSubTab("vaccines")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeSubTab === "vaccines" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{lang === "en" ? "Vaccinations" : "حفاظتی ٹیکے"}</span>
        </button>
        <button
          type="button"
          id="btn-subtab-meds"
          onClick={() => setActiveSubTab("meds")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeSubTab === "meds" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <Pill className="w-4 h-4" />
          <span>{lang === "en" ? "Medications" : "ادویات"}</span>
        </button>
        <button
          type="button"
          id="btn-subtab-visits"
          onClick={() => setActiveSubTab("visits")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeSubTab === "visits" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <Award className="w-4 h-4" />
          <span>{lang === "en" ? "Vet Visits" : "ڈاکٹر رپورٹ"}</span>
        </button>
        <button
          type="button"
          id="btn-subtab-weight"
          onClick={() => setActiveSubTab("weight")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeSubTab === "weight" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{lang === "en" ? "Weight Curve" : "وزن چارٹ"}</span>
        </button>
        <button
          type="button"
          id="btn-subtab-reminders"
          onClick={() => setActiveSubTab("reminders")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeSubTab === "reminders" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <Clock className="w-4 h-4" />
          <span>Routines</span>
        </button>
      </div>

      {/* --- SUBTAB CONTENT 1: VACCINES --- */}
      {activeSubTab === "vaccines" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            
            {/* Seed list banner if empty */}
            {petVaccines.length === 0 && (
              <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl text-center space-y-3">
                <ShieldCheck className="w-8 h-8 text-indigo-500 mx-auto" />
                <h4 className="font-extrabold text-sm text-indigo-900">Your vaccination booklet is empty</h4>
                <p className="text-xs text-indigo-600 max-w-sm mx-auto">
                  Populate standard local milestones matching veterinary guidelines in Pakistan for {activePet.type}s.
                </p>
                <button
                  type="button"
                  id="btn-auto-seed-vaccines"
                  onClick={handleAutoSeedVaccines}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black rounded-xl transition-all shadow cursor-pointer"
                >
                  Generate Vaccine Schedule
                </button>
              </div>
            )}

            {/* List of Vaccines */}
            {petVaccines.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-sans font-black text-slate-800 text-lg flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  <span>Vaccine History & Milestone Tracker</span>
                </h3>
                
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {petVaccines.map(vac => (
                    <div
                      key={vac.id}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${vac.status === "completed" ? "bg-emerald-50/20 border-emerald-100" : "bg-white border-slate-100"}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-slate-800">{vac.name}</h4>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${vac.status === "completed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                            {vac.status === "completed" ? "Secured" : "Due"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">Protecting against: <span className="font-bold text-slate-600">{vac.diseaseProtected}</span></p>
                        <p className="text-[10px] text-slate-400">Scheduled Date: {formatLocalDate(vac.dateScheduled)}</p>
                        {vac.administeredBy && <p className="text-[10px] text-indigo-600 font-semibold">Administered by: {vac.administeredBy}</p>}
                      </div>

                      <div className="flex items-center gap-2 sm:justify-end">
                        <button
                          type="button"
                          id={`btn-toggle-status-vac-${vac.id}`}
                          onClick={() => onToggleVaccineStatus(vac.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ring-1 transition-all cursor-pointer ${
                            vac.status === "completed"
                              ? "bg-slate-150 border border-slate-200 text-slate-600 hover:bg-slate-200"
                              : "bg-emerald-500 text-white font-extrabold ring-emerald-500 hover:bg-emerald-600"
                          }`}
                        >
                          {vac.status === "completed" ? "Mark Underway" : "Confirm Given"}
                        </button>

                        {vac.status === "completed" && (
                          <button
                            type="button"
                            id={`btn-cert-vac-${vac.id}`}
                            onClick={() => setSelectedVacCertificate(vac)}
                            className="px-2 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer"
                            title="Print Certificate Verification card"
                          >
                            <Award className="w-4 h-4 text-amber-500" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form to log single vaccine */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
            <h4 className="font-sans font-black text-slate-800 mb-4 text-base">Log Administered Vaccine</h4>
            <form onSubmit={handleCreateVac} className="space-y-3">
              <div>
                <label htmlFor="vac-name-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Vaccine Name *</label>
                <input
                  type="text"
                  id="vac-name-input"
                  required
                  placeholder="e.g. DHPPi + L Dose 1"
                  value={newVacName}
                  onChange={(e) => setNewVacName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label htmlFor="vac-disease-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Target Diseases *</label>
                <input
                  type="text"
                  id="vac-disease-input"
                  required
                  placeholder="e.g. Parvovirus, Distemper"
                  value={newVacDisease}
                  onChange={(e) => setNewVacDisease(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label htmlFor="vac-doc-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Clinic / Vet Name</label>
                <input
                  type="text"
                  id="vac-doc-input"
                  placeholder="e.g. Richmond Animal Hospital"
                  value={newVacDoc}
                  onChange={(e) => setNewVacDoc(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <button
                type="submit"
                id="btn-add-vaccine-submit"
                className="w-full py-2.5 bg-slate-900 border border-transparent text-white text-xs font-black rounded-xl hover:bg-indigo-950 transition-all cursor-pointer"
              >
                Log Vaccine Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- SUBTAB CONTENT 2: MEDICATIONS --- */}
      {activeSubTab === "meds" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-sans font-black text-slate-800 text-lg flex items-center gap-2 mb-4">
                <Pill className="w-5 h-5 text-indigo-600" />
                <span>Active Prescription List</span>
              </h3>

              {petMeds.length === 0 ? (
                <div className="text-center py-12 bg-slate-55 rounded-2xl border-2 border-dashed border-slate-100">
                  <Pill className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-bold mt-2">Zero Active Prescriptions</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Log custom tick drops, deworming syrups or joint vitamins.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {petMeds.map(med => (
                    <div
                      key={med.id}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${med.status === "completed" ? "bg-slate-50/40 border-slate-150" : "bg-white border-slate-100 shadow-sm"}`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`font-bold text-sm text-slate-800 ${med.status === "completed" ? "line-through text-slate-400" : ""}`}>{med.name}</h4>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${med.status === "active" ? "bg-indigo-100 text-indigo-800" : "bg-slate-100 text-slate-600"}`}>
                            {med.status}
                          </span>
                        </div>
                        <p className="text-xs text-indigo-600 font-semibold mt-1">Dosage: {med.dosage} ({med.frequency})</p>
                        <p className="text-[10px] text-slate-400 mt-1">Timeline: {formatLocalDate(med.dateStart)} to {formatLocalDate(med.dateEnd)}</p>
                        {med.notes && <p className="text-[10px] italic text-slate-500 mt-1">Note: {med.notes}</p>}
                      </div>

                      <div className="flex items-center gap-2 sm:justify-end shrink-0">
                        <button
                          type="button"
                          id={`btn-toggle-med-status-${med.id}`}
                          onClick={() => onToggleMedicationStatus(med.id)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 active:bg-slate-100 cursor-pointer"
                        >
                          {med.status === "active" ? "Mark Finished" : "Re-activate"}
                        </button>
                        
                        <button
                          type="button"
                          id={`btn-delete-med-${med.id}`}
                          onClick={() => onDeleteMedication(med.id)}
                          className="p-1.5 rounded-lg border border-rose-100 text-rose-500 hover:bg-rose-50 cursor-pointer"
                          title="Delete medication log"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
            <h4 className="font-sans font-black text-slate-800 mb-4 text-base">Add Medication Regime</h4>
            <form onSubmit={handleCreateMed} className="space-y-3">
              <div>
                <label htmlFor="med-name-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Medication Name *</label>
                <input
                  type="text"
                  id="med-name-input"
                  required
                  placeholder="e.g. Flagyl Suspension"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="med-dose-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Dosage *</label>
                  <input
                    type="text"
                    id="med-dose-input"
                    required
                    placeholder="e.g. 1.5 ml"
                    value={newMedDose}
                    onChange={(e) => setNewMedDose(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="med-freq-select" className="block text-xs font-bold text-slate-600 uppercase mb-1">Frequency</label>
                  <select
                    id="med-freq-select"
                    value={newMedFreq}
                    onChange={(e) => setNewMedFreq(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                  >
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Thrice daily">Thrice daily</option>
                    <option value="Every alternate day">Every alternate day</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="med-start-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Start Date</label>
                  <input
                    type="date"
                    id="med-start-input"
                    value={newMedStart}
                    onChange={(e) => setNewMedStart(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white text-slate-700"
                  />
                </div>
                <div>
                  <label htmlFor="med-end-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">End Date</label>
                  <input
                    type="date"
                    id="med-end-input"
                    value={newMedEnd}
                    onChange={(e) => setNewMedEnd(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="med-notes-textarea" className="block text-xs font-bold text-slate-600 uppercase mb-1">Instructions / Symptoms</label>
                <textarea
                  id="med-notes-textarea"
                  rows={2}
                  placeholder="e.g. Give after food, shake bottle well."
                  value={newMedNotes}
                  onChange={(e) => setNewMedNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <button
                type="submit"
                id="btn-add-med-submit"
                className="w-full py-2.5 bg-slate-900 border border-transparent text-white text-xs font-black rounded-xl hover:bg-indigo-950 transition-all cursor-pointer"
              >
                Launch Treatment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- SUBTAB CONTENT 3: VET VISITS & VALUE COUNTERS --- */}
      {activeSubTab === "visits" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            
            {/* Cumulated cost calculation indicator */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow flex items-center justify-between">
              <div>
                <span className="text-[10px] tracking-widest text-indigo-300 font-mono font-bold uppercase block">Health Valuation spend</span>
                <h4 className="text-xl font-bold font-sans">Total Cumulative Doctor Costs</h4>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-rose-400 font-mono block">{formatPKR(totalSpend)}</span>
                <span className="text-[10px] text-indigo-200">Values calculated in Pakistan Rupees (PKR)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-sans font-black text-slate-800 text-lg flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-indigo-600" />
                <span>Visit Logs & Doctor Prescriptions</span>
              </h3>

              {petVisits.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <Award className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium mt-2">Zero historic visits recorded.</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Maintain copies of diagnostic reports, temperatures, and medical receipts.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {petVisits.map(visit => (
                    <div key={visit.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/40 relative hover:border-slate-200 transition-all">
                      <div className="absolute top-4 right-4 text-xs font-mono font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                        {formatPKR(visit.cost)}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-slate-800 text-sm">{visit.vetName}</h4>
                          <span className="text-[10px] text-slate-400 font-semibold">• {visit.clinicName}</span>
                        </div>
                        
                        <p className="text-xs text-slate-500 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
                          <span>Reason: {visit.reason}</span>
                        </p>

                        {visit.notes && <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100 italic">Dr. Notes: {visit.notes}</p>}
                        {visit.prescription && (
                          <div className="text-[10px] text-slate-700 bg-indigo-50/30 p-2.5 rounded-lg border border-indigo-100/30">
                            <strong>Prescribed Medication lines:</strong> {visit.prescription}
                          </div>
                        )}
                        <span className="text-[10px] text-slate-400 block font-bold">Diagnosed Date: {formatLocalDate(visit.visitDate)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
            <h4 className="font-sans font-black text-slate-800 mb-4 text-base">Write Medical Checkup</h4>
            <form onSubmit={handleCreateVetVisit} className="space-y-3">
              <div>
                <label htmlFor="vet-name-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Doctor Name *</label>
                <input
                  type="text"
                  id="vet-name-input"
                  required
                  placeholder="e.g. Dr. Ali Ahsan"
                  value={newVetName}
                  onChange={(e) => setNewVetName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <div>
                <label htmlFor="vet-clinic-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Hospital / Clinic *</label>
                <input
                  type="text"
                  id="vet-clinic-input"
                  required
                  placeholder="e.g. Richmond Veterinary, Lahore"
                  value={newVetClinic}
                  onChange={(e) => setNewVetClinic(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <div>
                <label htmlFor="vet-reason-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Reason for Visit *</label>
                <input
                  type="text"
                  id="vet-reason-input"
                  required
                  placeholder="e.g. Vomiting & Dehydration"
                  value={newVetReason}
                  onChange={(e) => setNewVetReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <div>
                <label htmlFor="vet-notes-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Clinical Signs / Temperature</label>
                <textarea
                  id="vet-notes-input"
                  rows={2}
                  placeholder="e.g. Feline Flu, Temperature 103.2 F."
                  value={newVetNotes}
                  onChange={(e) => setNewVetNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <div>
                <label htmlFor="vet-presc-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Prescription Details</label>
                <input
                  type="text"
                  id="vet-presc-input"
                  placeholder="e.g. Flagyl syrup 1ml twice for 5 days"
                  value={newVetPresc}
                  onChange={(e) => setNewVetPresc(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="vet-cost-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Cost PKR *</label>
                  <input
                    type="number"
                    id="vet-cost-input"
                    required
                    placeholder="e.g. 1500"
                    value={newVetCost}
                    onChange={(e) => setNewVetCost(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="vet-date-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Visit Date</label>
                  <input
                    type="date"
                    id="vet-date-input"
                    value={newVetDate}
                    onChange={(e) => setNewVetDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white text-slate-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="btn-add-vet-visit-submit"
                className="w-full py-2.5 bg-slate-900 border border-transparent text-white text-xs font-black rounded-xl hover:bg-indigo-950 transition-all cursor-pointer"
              >
                Log Medical Checkup
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- SUBTAB CONTENT 4: GRAPHIC WEIGHT LOGGERS --- */}
      {activeSubTab === "weight" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="lg:col-span-2 space-y-4">
            
            {/* Interactive vector-fluid weight indicator curve */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <h3 className="font-sans font-black text-slate-800 text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600 animate-pulse" />
                  <span>Interactive Weight Progression Curve</span>
                </h3>
                <p className="text-xs text-slate-400">Tracks development weight anomalies dynamically</p>
              </div>

              {petWeights.length > 0 ? (
                <div role="img" aria-label="Dynamic Weight Progression Graph" className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 overflow-hidden relative">
                  
                  {/* SVG responsive canvas container */}
                  <svg 
                    width="100%" 
                    height="100%" 
                    viewBox={`0 0 ${svgW} ${svgH}`} 
                    className="overflow-visible min-h-[200px]"
                    style={{ aspectRatio: "500/200" }}
                  >
                    <defs>
                      <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#4F46E5" stopOpacity="0"/>
                      </linearGradient>
                    </defs>

                    {/* Background Grids helper coordinates */}
                    <line x1={padding} y1={svgH - padding} x2={svgW - padding} y2={svgH - padding} stroke="#E2E8F0" strokeWidth="1" />
                    <line x1={padding} y1={padding} x2={padding} y2={svgH - padding} stroke="#E2E8F0" strokeWidth="1" />

                    {/* Render Polygon Background color mapping */}
                    {points.length > 1 && (
                      <path
                        d={`${dPath} L ${points[points.length - 1].x} ${svgH - padding} L ${points[0].x} ${svgH - padding} Z`}
                        fill="url(#curveGradient)"
                      />
                    )}

                    {/* Rendering Graph Line Path */}
                    {points.length > 0 && (
                      <path
                        d={dPath}
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-pulse"
                      />
                    )}

                    {/* Render coordinate Node Points */}
                    {points.map((pt, index) => (
                      <g key={index} className="group cursor-pointer">
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="5.5"
                          fill="#FFFFFF"
                          stroke="#4F46E5"
                          strokeWidth="2.5"
                        />
                        {/* Hover mini-text tooltip label overlay inside SVG */}
                        <text
                          x={pt.x}
                          y={pt.y - 12}
                          textAnchor="middle"
                          className="text-[10px] font-bold fill-indigo-900 font-sans opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 duration-200"
                        >
                          {pt.weight} kg
                        </text>
                        {/* Always visible bottom date indicator if few records */}
                        {points.length <= 6 && (
                          <text
                            x={pt.x}
                            y={svgH - 12}
                            textAnchor="middle"
                            className="text-[8px] fill-slate-400 font-bold font-mono"
                          >
                            {formatLocalDate(pt.date).substring(0, 6)}
                          </text>
                        )}
                      </g>
                    ))}
                  </svg>

                  {/* Overlay legend indicator labels */}
                  <div className="absolute top-4 right-4 flex gap-3 text-[10px] bg-white p-2 border border-slate-100 rounded-lg shadow-sm font-bold">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 block" /> Weekly weight
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <TrendingUp className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium mt-2">No weight curves generated.</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Enter weights regularly to visual trends immediately.</p>
                </div>
              )}

              {/* Weights history table */}
              {petWeights.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400">
                      <tr>
                        <th className="p-3">Log Date</th>
                        <th className="p-3">Recorded Weight (kg)</th>
                        <th className="p-3 text-right">Variances</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {petWeights.map((w, idx) => {
                        const prevWeight = idx > 0 ? petWeights[idx - 1].weight : w.weight;
                        const diff = w.weight - prevWeight;
                        return (
                          <tr key={w.id} className="hover:bg-slate-50/40">
                            <td className="p-3 font-semibold text-slate-600">{formatLocalDate(w.date)}</td>
                            <td className="p-3 font-black text-slate-800">{w.weight} KG</td>
                            <td className="p-3 text-right">
                              {diff > 0 ? (
                                <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">+{diff.toFixed(1)} kg</span>
                              ) : diff < 0 ? (
                                <span className="text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">{diff.toFixed(1)} kg</span>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
            <h4 className="font-sans font-black text-slate-800 mb-4 text-base">Write Weight Metric</h4>
            <form onSubmit={handleCreateWeight} className="space-y-3">
              <div>
                <label htmlFor="weight-metric-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Weight Value (KG) *</label>
                <input
                  type="number"
                  id="weight-metric-input"
                  required
                  step="0.05"
                  min="0.1"
                  placeholder="e.g. 4.2"
                  value={newWeightValue}
                  onChange={(e) => setNewWeightValue(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <div>
                <label htmlFor="weight-date-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Log Date</label>
                <input
                  type="date"
                  id="weight-date-input"
                  value={newWeightDate}
                  onChange={(e) => setNewWeightDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white text-slate-700"
                />
              </div>

              <button
                type="submit"
                id="btn-add-weight-submit"
                className="w-full py-2.5 bg-slate-900 border border-transparent text-white text-xs font-black rounded-xl hover:bg-indigo-950 transition-all cursor-pointer"
              >
                Log Weight Entry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- SUBTAB CONTENT 5: ROUTINES & REMINDERS PANEL --- */}
      {activeSubTab === "reminders" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-sans font-black text-slate-800 text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span>Routines & Alarms</span>
              </h3>

              {reminders.filter(r => r.petId === activePet.id).length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <Clock className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-bold mt-2">No active reminders configured</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Avoid missed meals, vaccination appointments, or daily physical games.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {reminders.filter(r => r.petId === activePet.id).map(r => (
                    <div key={r.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/20 relative flex items-center justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-slate-800">{r.title}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] uppercase font-mono bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded">
                            {r.category}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">{r.time} ({r.frequency})</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        id={`btn-delete-rem-${r.id}`}
                        onClick={() => onDeleteReminder(r.id)}
                        className="p-1.5 rounded-lg border border-rose-100 text-rose-500 hover:bg-rose-50 cursor-pointer"
                        title="Delete alarms"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
            <h4 className="font-sans font-black text-slate-800 mb-4 text-base">Set Daily Alarm</h4>
            <form onSubmit={handleCreateReminder} className="space-y-3">
              <div>
                <label htmlFor="rem-title-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Alarm Title *</label>
                <input
                  type="text"
                  id="rem-title-input"
                  required
                  placeholder="e.g. Sherry Dinner dry food"
                  value={newRemTitle}
                  onChange={(e) => setNewRemTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="rem-time-input" className="block text-xs font-bold text-slate-600 uppercase mb-1">Alarm Time *</label>
                  <input
                    type="time"
                    id="rem-time-input"
                    required
                    value={newRemTime}
                    onChange={(e) => setNewRemTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="rem-cat-select" className="block text-xs font-bold text-slate-600 uppercase mb-1">Category</label>
                  <select
                    id="rem-cat-select"
                    value={newRemCat}
                    onChange={(e) => setNewRemCat(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                  >
                    <option value="food">🍖 Diet / Treat</option>
                    <option value="pill">💊 Tablet / Drops</option>
                    <option value="vaccine">💉 Vaccination</option>
                    <option value="walk">🏃 Playtime / walk</option>
                    <option value="grooming">✂️ Grooming</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="rem-freq-select" className="block text-xs font-bold text-slate-600 uppercase mb-1">Frequency</label>
                <select
                  id="rem-freq-select"
                  value={newRemFreq}
                  onChange={(e) => setNewRemFreq(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs bg-white"
                >
                  <option value="daily">Alarm Daily</option>
                  <option value="weekly">Alarm Weekly</option>
                  <option value="once">Alarm Once</option>
                </select>
              </div>

              <button
                type="submit"
                id="btn-add-alarm-submit"
                className="w-full py-2.5 bg-slate-900 border border-transparent text-white text-xs font-black rounded-xl hover:bg-indigo-950 transition-all cursor-pointer"
              >
                Log Routine Alarm
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- FLOATING DETAILED VACCINATION STATUS MODAL MOCKUP --- */}
      {selectedVacCertificate && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full border border-slate-100" id="certificate-modal">
            
            {/* Header Stamp style */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 relative">
              <div className="absolute top-4 right-4 text-3xl opacity-35 hover:opacity-100 transition-opacity">
                🐾
              </div>
              <span className="text-[10px] tracking-widest font-mono text-emerald-100 font-bold block">NATIONAL ANIMAL PASSPORT</span>
              <h3 className="text-xl font-serif font-black">Official Vaccination Receipt Card</h3>
            </div>

            {/* Certificate Body details */}
            <div className="p-6 space-y-4">
              <div className="border border-dashed border-slate-200 p-4 rounded-xl space-y-3 font-sans">
                
                <div className="grid grid-cols-2 gap-4 text-xs border-b pb-3 border-slate-100">
                  <div>
                    <span className="text-slate-400 font-bold text-[10px] uppercase block">PET NAME</span>
                    <strong className="text-slate-800 text-sm">{activePet.name} ({activePet.breed})</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-[10px] uppercase block">RESIDENCE OWNER / CITY</span>
                    <strong className="text-slate-800 text-sm">{activePet.ownerName} ({activePet.city})</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs border-b pb-3 border-slate-100">
                  <div>
                    <span className="text-slate-400 font-bold text-[10px] uppercase block">IMMUNIZATION LABEL</span>
                    <strong className="text-indigo-600 font-black">{selectedVacCertificate.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-[10px] uppercase block">IMMUNE SPANS</span>
                    <strong className="text-slate-800">{selectedVacCertificate.diseaseProtected}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold text-[10px] uppercase block">DATE VACCINATED</span>
                    <strong className="text-emerald-700 font-black">{selectedVacCertificate.dateAdministered ? formatLocalDate(selectedVacCertificate.dateAdministered) : "-"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold text-[10px] uppercase block">AUTHORIZING PHYSICIAN</span>
                    <strong className="text-slate-800">{selectedVacCertificate.administeredBy || "Dr. Anees Malik"}</strong>
                  </div>
                </div>

              </div>
              
              <div className="text-center bg-slate-50 p-2.5 rounded-lg text-[9px] text-slate-400 font-mono tracking-widest border border-slate-200">
                VERIFIABLE RECORD MDX-PK-{selectedVacCertificate.id.toUpperCase()} • COMPLIANT
              </div>
            </div>

            {/* Bottom controllers */}
            <div className="bg-slate-50 px-6 py-4 flex gap-2 justify-end">
              <button
                type="button"
                id="btn-print-certificate-direct"
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-850 hover:bg-slate-900 border border-transparent text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Wallet Card</span>
              </button>
              <button
                type="button"
                id="btn-close-cert-modal"
                onClick={() => setSelectedVacCertificate(null)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
