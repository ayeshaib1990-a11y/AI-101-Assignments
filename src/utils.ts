import { Pet, Vaccination, Medication, VetVisit, WeightRecord, Reminder } from "./types";

// Unified localized English/Urdu translation tables for complete same-to-same localized layout
export const TRANSLATIONS = {
  en: {
    appName: "PakPet",
    appSub: "Pet Health Wallet (Pakistan)",
    welcome: "Welcome to PakPet",
    onboardingSub: "Your offline-first pet medical wallet & wellness coordinator",
    selectLanguage: "Select Language / زبان کا انتخاب کریں",
    getStarted: "Register My Pet",
    cityLabel: "Select Your Residence City",
    ownerLabel: "Pet Owner Full Name",
    petNameLabel: "Pet Name",
    petTypeLabel: "Animal Category",
    petBreedLabel: "Breed",
    petAgeYears: "Age (Years)",
    petAgeMonths: "Age (Months)",
    petWeight: "Weight (kg)",
    genderLabel: "Gender",
    male: "Male",
    female: "Female",
    sterilizedLabel: "Neutered / Spayed",
    yes: "Yes",
    no: "No",
    registerBtn: "Generate Health Wallet",
    loadingAdvisor: "Connecting to PakPet AI Vet Expert Dr. Anees...",
    quickAsk: "Quick Localized Questions",
    temperatureAlert: "Climate Alert",
    ticksAlert: "Tick Breeding Alert",
    smogAlert: "Lahore Smog / AQI Concern",
    remindersTitle: "Reminders & Routines",
    addReminder: "Set Reminder",
    trackers: "Trackers",
    vaccinationCard: "Vaccination Booklet",
    medications: "Active Medications",
    vetVisits: "Veterinary Records",
    weightCurve: "Weight Tracker",
    emergencyClinic: "Emergency Vet Directory",
    communityWelfare: "Pak Pet Community Forum",
    safefoods: "Urgent Food Safety",
    dietPlan: "Nutrition Planner",
    healthReports: "Print Medical Wallet",
    askAI: "Consult Dr. Anees (Gemini AI)",
    placeholderMessage: "Type pet symptoms or dietary concerns in English, Urdu or Roman Urdu...",
    send: "Consult Vet",
    clinicsNearTitle: "Emergency Animal Clinics in ",
    dialBtn: "Call Hotline",
    verified247: "Verified 24/7 Care",
    ambulanceActive: "Ambulance Avail.",
    communityFeed: "Community Spotlights & Stray Welfare",
    createPost: "New Community Post",
    postBtn: "Post Advice",
    likes: "Likes",
    comments: "Comments",
    poisonousFoods: "Dangerous / Toxic",
    safeFoods: "Highly Safe & Digestion Cooling"
  },
  ur: {
    appName: "پاک پیٹ",
    appSub: "پالتو جانوروں کا ہیلتھ والٹ (پاکستان)",
    welcome: "پاک پیٹ میں خوش آمدید",
    onboardingSub: "پالتو جانوروں کے علاج اور تندرستی کا ایک مکمل ہیلتھ والٹ",
    selectLanguage: "زبان کا انتخاب کریں",
    getStarted: "پالتو جانور کا اندراج کریں",
    cityLabel: "اپنے شہر کا انتخاب کریں",
    ownerLabel: "مالک کا نام",
    petNameLabel: "پالتو جانور کا نام",
    petTypeLabel: "جانور کی کیٹیگری",
    petBreedLabel: "نسل (Breed)",
    petAgeYears: "عمر (سال)",
    petAgeMonths: "عمر (مہینے)",
    petWeight: "وزن (کلوا گرام)",
    genderLabel: "جنس (Gender)",
    male: "نر (Male)",
    female: "مادہ (Female)",
    sterilizedLabel: "سرجری / نس بندی",
    yes: "جی ہاں",
    no: "جی نہیں",
    registerBtn: "ہیلتھ والٹ تیار کریں",
    loadingAdvisor: "پاک پیٹ اے آئی ڈاکٹر انیس سے رابطہ قائم ہو رہا ہے...",
    quickAsk: "اہم علاقائی سوالات",
    temperatureAlert: "موسمی الرٹ",
    ticksAlert: "پسووں/جونکوں کا خطرہ",
    smogAlert: "سموگ/ہوا کے معیار کی خرابی",
    remindersTitle: "یاد دہانیاں اور ریمائنڈرز",
    addReminder: "نیا ریمائنڈر لگائیں",
    trackers: "میڈیکل ریکارڈز",
    vaccinationCard: "حفاظتی ٹیکوں کا کارڈ (ویکسین)",
    medications: "سرگرم ادویات",
    vetVisits: "ڈاکٹری نسخے اور فیسیں",
    weightCurve: "وزن میں تبدیلی کا ریکارڈ",
    emergencyClinic: "سرکاری و پرائیویٹ ایمرجنسی اسپتال",
    communityWelfare: "پاک پالتو جانور کمیونٹی فورم",
    safefoods: "غذا کی حفاظت کا جائزہ",
    dietPlan: "پلانر / خوراک کا چارٹ",
    healthReports: "ہیلتھ والٹ پرنٹ کریں",
    askAI: "ڈاکٹر انیس سے مشورہ حاصل کریں (Gemini AI)",
    placeholderMessage: "پالتو جانور کی علامات یا خوراک کی چنتا یہاں ٹائپ کریں (اردو یا انگلش)...",
    send: "ڈاکٹر سے پوچھیں",
    clinicsNearTitle: "ایمرجنسی ویٹرنری کلینکس برائے ",
    dialBtn: "کال کریں / رابطہ",
    verified247: "تصدیق شدہ ۲۴ گھنٹے ایمرجنسی",
    ambulanceActive: "ایمبولینس کی سہولت دستیاب",
    communityFeed: "کمیونٹی پیغامات اور فلاح بہبود",
    createPost: "نیا پیغام لکھیں",
    postBtn: "پوسٹ کریں",
    likes: "پسندیدگی",
    comments: "تبصرے",
    poisonousFoods: "زہریلی اشیاء (خطرناک)",
    safeFoods: "محفوظ اور معدے کو ٹھنڈا کرنے والی غذا"
  }
};

// Local storage namespacing for safety
const STORAGE_PREFIX = "pakpet_v1_";

export function loadState<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw) {
      return JSON.parse(raw) as T;
    }
  } catch (err) {
    console.error("Failed loading local storage state for " + key, err);
  }
  return defaultValue;
}

export function saveState<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.error("Failed saving local storage state for " + key, err);
  }
}

// Simple Currency formatter for Pakistani Rupees
export function formatPKR(amount: number): string {
  return "Rs. " + amount.toLocaleString("en-PK") + " /-";
}

// Localized date formatting matching Pakistan habits (DD-MMM-YYYY)
export function formatLocalDate(dateStr: string): string {
  if (!dateStr) return "-";
  try {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = d.getDate().toString().padStart(2, "0");
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return dateStr;
  }
}
