import { EmergencyClinic, RegionalAlert, CommunityPost, Vaccination } from "./types";

// Selection lists for Cities
export const PAKISTANI_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Peshawar",
  "Quetta",
  "Multan",
  "Faisalabad",
  "Sialkot",
  "Gujranwala",
  "Hyderabad"
];

// Predefined Localized Breeds
export const LOCAL_BREEDS = {
  cat: [
    "Persian (Traditional/Punch Face)",
    "Semi-punch Persian",
    "Russian Blue Mix",
    "Siamese",
    "Standard Street/Kacha Cat (Dil)",
    "Himalayan Cat",
    "Angora Mix"
  ],
  dog: [
    "German Shepherd (GSD)",
    "Labrador Retriever",
    "Bully Kutta (Pakistani Mastiff)",
    "Gaddi Dog / Gaddi Leopard",
    "Shih Tzu",
    "Pug",
    "Siberian Husky",
    "Pomeranian Mix",
    "Standard Street Dog / Desi"
  ],
  bird: [
    "Rose-ringed Parakeet (Raw/Pahari)",
    "Cockatiel / Cocktail",
    "Lovebird",
    "Finch",
    "Siberian Crane Mix",
    "Ringneck Parrot / Kathay"
  ],
  rabbit: [
    "Angora Bunny",
    "Dutch Rabbit Mix",
    "White Native Bunny",
    "Flemish Giant Mix"
  ],
  other: [
    "Guinea Pig",
    "Hamster",
    "Red-eared Slider Turtle"
  ]
};

// Emergency Veterinary Clinics database in Pakistan
export const CLINICS_DATA: EmergencyClinic[] = [
  {
    id: "clinic-1",
    name: "Richmond Veterinary & Surgery Clinic",
    address: "DHA Phase 6, Karachi",
    city: "Karachi",
    phone: "0300-2475836",
    helpline: "+92 300 2475836",
    is24Hours: true,
    hasAmbulance: true,
    coordinatesText: "24.7958° N, 67.0621° E"
  },
  {
    id: "clinic-2",
    name: "Animal Care Hospital (Dr. Isma)",
    address: "Gulshan-e-Iqbal Block 13-C, Karachi",
    city: "Karachi",
    phone: "021-34981120",
    helpline: "+92 21 34981120",
    is24Hours: false,
    hasAmbulance: false,
    coordinatesText: "24.9180° N, 67.0971° E"
  },
  {
    id: "clinic-3",
    name: "Karachi Animal Hospital",
    address: "DHA Phase 2 Ext, Karachi",
    city: "Karachi",
    phone: "0335-3037237",
    helpline: "+92 335 3037237",
    is24Hours: true,
    hasAmbulance: true,
    coordinatesText: "24.8142° N, 67.0754° E"
  },
  {
    id: "clinic-4",
    name: "JVC Veterinary Clinic & Surgery Centre",
    address: "DHA Phase 5, Lahore",
    city: "Lahore",
    phone: "0308-4444582",
    helpline: "+92 308 4444582",
    is24Hours: true,
    hasAmbulance: true,
    coordinatesText: "31.4697° N, 74.4084° E"
  },
  {
    id: "clinic-5",
    name: "Pets & Vets Clinic (Dr. Asim)",
    address: "Johar Town Block G, Lahore",
    city: "Lahore",
    phone: "0321-4813350",
    helpline: "+92 321 4813350",
    is24Hours: false,
    hasAmbulance: true,
    coordinatesText: "31.4691° N, 74.2721° E"
  },
  {
    id: "clinic-6",
    name: "Islamabad Pet Clinic (Dr. Faisal)",
    address: "G-10 Markaz, Islamabad",
    city: "Islamabad",
    phone: "0333-5152234",
    helpline: "+92 333 5152234",
    is24Hours: true,
    hasAmbulance: false,
    coordinatesText: "33.6784° N, 73.0125° E"
  },
  {
    id: "clinic-7",
    name: "Dr. Rana's Pet Clinic",
    address: "F-7/2, Islamabad",
    city: "Islamabad",
    phone: "0300-5123419",
    helpline: "+92 300 5123419",
    is24Hours: false,
    hasAmbulance: true,
    coordinatesText: "33.7215° N, 73.0561° E"
  },
  {
    id: "clinic-8",
    name: "Cavalry Ground Pet Center",
    address: "Cavalry Ground, Cantonment, Lahore",
    city: "Lahore",
    phone: "042-36653131",
    helpline: "+92 42 36653131",
    is24Hours: true,
    hasAmbulance: false,
    coordinatesText: "31.5120° N, 74.3725° E"
  },
  {
    id: "clinic-9",
    name: "Rawalpindi Pet Care & Surgery Hospital",
    address: "Saddar, Rawalpindi",
    city: "Rawalpindi",
    phone: "051-5512211",
    helpline: "+92 51 5512211",
    is24Hours: false,
    hasAmbulance: false,
    coordinatesText: "33.5931° N, 73.0543° E"
  },
  {
    id: "clinic-10",
    name: "Khyber Veterinary Clinic",
    address: "University Road, Peshawar",
    city: "Peshawar",
    phone: "0314-9112233",
    helpline: "+92 314 9112233",
    is24Hours: false,
    hasAmbulance: false,
    coordinatesText: "34.0086° N, 71.5484° E"
  },
  {
    id: "clinic-11",
    name: "Sandeman Veterinary Referral Hospital",
    address: "Halqa-e-Adab Road, Quetta",
    city: "Quetta",
    phone: "0333-7821122",
    helpline: "+92 333 7821122",
    is24Hours: false,
    hasAmbulance: false,
    coordinatesText: "30.1833° N, 66.9967° E"
  }
];

// Seeded local seasonal alerts for Pakistan
export const REGIONAL_ALERTS: RegionalAlert[] = [
  {
    id: "alert-1",
    city: "Karachi",
    level: "danger",
    titleEn: "Karachi Heatwave & High Humidity Protocol",
    titleUr: "کراچی ہیٹ ویو اور شدید نمی کا الرٹ",
    messageEn: "Temperatures are reaching extremely high levels with index scaling over 43°C. Persian cats and thick-coat dogs are at high risk of heatstroke.",
    messageUr: "درجہ حرارت ۴۳ ڈگری سے زائد محسوس ہو رہا ہے۔ ہیمبرگ/پلوشین بلیوں اور ہیوی کوٹ کتوں کو لو لگنے کا شدید خطرہ ہے۔",
    actionEn: "Move all pets indoors under AC/fan. Provide fresh, cool water with a pinch of electrolytes (ORS). Never leave animals locked in cars.",
    actionUr: "تمام پالتو جانوروں کو کمرے میں رکھیں، ٹھنڈے پانی میں ہلکا او آر ایس (ORS) ملا کر دیں، اور دھوپ میں نہ نکالیں۔",
    date: "2026-06-14"
  },
  {
    id: "alert-2",
    city: "Lahore",
    level: "warning",
    titleEn: "Monsoon Tick Infestation Alert",
    titleUr: "مون سون میں پسووں (Ticks) کا الرٹ",
    messageEn: "Monsoon relative humidity creates breeding grounds for dangerous brown dog ticks and fleas, carrying Babesiosis (Tick Fever).",
    messageUr: "مون سون کی بارشوں اور نمی کی وجہ سے پسووں کی افزائش تیزی سے ہوتی ہے جس سے خون کا زہر (ٹک فیور) بنتا ہے۔",
    actionEn: "Check paw gaps and behind ears daily. Administer Frontline / Bravecto following veterinary doses. Keep surrounding ground lines dry.",
    actionUr: "پنجوں اور کانوں کے پیچھے روزانہ چیک کریں۔ ڈاکٹر کی ہدایت کے مطابق فرنٹ لائن یا بریویکٹو کا استعمال کریں۔",
    date: "2026-06-12"
  },
  {
    id: "alert-3",
    city: "Lahore",
    level: "danger",
    titleEn: "High Smog / Winter Respiratory Emergency",
    titleUr: "لاہور سموگ اور سانس کی خرابی کی تنبیہ",
    messageEn: "AQI levels exceeding 400. Brachycephalic breeds (Pugs, flat-faced Persians, Bulldogs) are struggling with asthma and chest congestion.",
    messageUr: "اے کیو آئی (AQI) کا درجہ ۴۰۰ سے تجاوز کر گیا ہے۔ گول چہرے والی بلیوں اور پگ کتوں کو سانس لینے میں دشواری ہو سکتی ہے۔",
    actionEn: "Keep cats indoors, turn on air purifiers, and keep windows fully closed. Schedule brief indoor dog walks and wipe down coats immediately.",
    actionUr: "کھڑکیاں بند رکھیں، پالتو جانوروں کو باہر نکالنے سے گریز کریں اور باہر سے لانے پر گیلے کپڑے سے ان کا جسم صاف کریں۔",
    date: "2026-02-15"
  },
  {
    id: "alert-4",
    city: "Islamabad",
    level: "info",
    titleEn: "Pollen and Allergy Spike",
    titleUr: "اسلام آباد الرجی اور پولن اسپائک",
    messageEn: "Sring pollen counts are heavy. Dogs may display red itchy skin, chronic scratching, and watering eyes.",
    messageUr: "بہار میں پولن کے زیادہ ہونے سے کتوں میں خارش، آنکھوں کا بہنا اور الرجی دیکھنے میں آتی ہے۔",
    actionEn: "Clean pet paws with warm water after garden playtime. Add veterinary-approved Omega-3 salmon oils to meals to build natural skin barrier.",
    actionUr: "صحن سے واپس لانے کے بعد پالتو جانور کے پنجے دھوئیں۔ خارش روکنے کے لیے ان کے کھانے میں اومیگا تھری شامل کریں۔",
    date: "2026-03-22"
  }
];

// Pre-seeded standard vaccine lists based on pet type
export const DEFAULT_VACCINES = {
  cat: [
    { name: "Tricat Triple-Vaccine Trio (FVRCP) - Dose 1", diseaseProtected: "Feline Rhinotracheitis, Calicivirus, Panleukopenia", timeline: "Age 6-8 Weeks" },
    { name: "Tricat Triple-Vaccine Trio (FVRCP) - Dose 2", diseaseProtected: "Feline Rhinotracheitis, Calicivirus, Panleukopenia booster", timeline: "Age 10-12 Weeks" },
    { name: "Rabies Immunization (Annual Vaccine)", diseaseProtected: "Rabies Virus (Highly Critical)", timeline: "Age 12-16 Weeks & Annual Booster" },
    { name: "Deworming Cycle - Routine Treatment", diseaseProtected: "Roundworms & Tapeworms", timeline: "Every 3 Months" }
  ],
  dog: [
    { name: "DHPPi + L (5-in-1 Combo) - Dose 1", diseaseProtected: "Distemper, Hepatitis, Parvovirus, Parainfluenza, Leptospirosis", timeline: "Age 6-8 Weeks" },
    { name: "DHPPi + L (5-in-1 Combo) - Dose 2", diseaseProtected: "Distemper, Hepatitis, Parvovirus, Leptospirosis Booster", timeline: "Age 10-12 Weeks" },
    { name: "Rabies Immunization (Annual Vaccine)", diseaseProtected: "Rabies Virus (Highly Critical)", timeline: "Age 12-16 Weeks & Annual Booster" },
    { name: "Canine Corona vaccine (Optional Booster)", diseaseProtected: "Corona Enteritis", timeline: "Age 14-16 Weeks" },
    { name: "Deworming Cycle - Routine Treatment", diseaseProtected: "Intestinal Parasites", timeline: "Every 3 Months" }
  ],
  bird: [
    { name: "Newcastle Disease (ND) Water administration", diseaseProtected: "Rani Khet (Newcastle Disease)", timeline: "Every 2 Months" },
    { name: "Pigeonpox / Avian Vaccination booster", diseaseProtected: "Avian Pox", timeline: "Annual" }
  ],
  rabbit: [
    { name: "RHDV1 / RHDV2 Combo Vaccine", diseaseProtected: "Rabbit Hemorrhagic Disease Virus", timeline: "Every 6-12 Months" }
  ],
  other: [
    { name: "Multivitamin Anti-parasite spray", diseaseProtected: "Mites & Lice", timeline: "As required" }
  ]
};

// Seeded local community posts
export const COMMUNITY_DATA: CommunityPost[] = [
  {
    id: "post-1",
    authorName: "Zara Khan",
    authorRole: "Owner",
    city: "Karachi",
    avatarColor: "bg-pink-500",
    title: "Urgent: Safe chicken sourcing under current heatwave?",
    content: "Assalam-o-Alaikum! My Persian kitty refuses commercial wet food. Due to extreme heat, local meat markets in DHA Karachi are closing earlier. Can someone recommend where to order verified safe fresh boneless chicken breasts for boiling?",
    likes: 12,
    commentsCount: 3,
    date: "2026-06-13",
    tag: "Diet",
    replies: [
      {
        authorName: "Dr. Ali Ahsan",
        authorRole: "Vet",
        content: "Walaikum Assalam Zara. Try buying verified commercial packs like K&N's or Sabroso at local supermarkets. Wash cleanly and boil without any spice/salt. Don't leave boiled chicken out for more than 40 mins during this Karachi humidity, otherwise it spoils and causes immediate severe gastroenteritis.",
        date: "2026-06-13"
      },
      {
        authorName: "Nabeel",
        authorRole: "Owner",
        content: "Seconded. K&N's boiled chicken is what I give to my doll-faced Persian. Added bonus: you can freeze it easily!",
        date: "2026-06-14"
      }
    ]
  },
  {
    id: "post-2",
    authorName: "Basit Ali",
    authorRole: "Shelter",
    city: "Lahore",
    avatarColor: "bg-teal-500",
    title: "Adopt a Street-pup (Desi dog) rescue initiative in Model Town",
    content: "We have rescued 4 stray puppies found near the Model Town park exit. They are vaccinated with their first DHPPi combo shot and dewormed. They make awesome guard and family companions. Please help spread the word for adoptions!",
    likes: 24,
    commentsCount: 5,
    date: "2026-06-11",
    tag: "Welfare",
    replies: [
      {
        authorName: "Zainab Shah",
        authorRole: "Owner",
        content: "God bless you Basit! Sending this to my cousins who are looking for a lively pup. Street dogs have amazing natural immunity against our Lahore climate!",
        date: "2026-06-12"
      }
    ]
  },
  {
    id: "post-3",
    authorName: "Dr. Hamza Malik",
    authorRole: "Vet",
    city: "Islamabad",
    avatarColor: "bg-indigo-500",
    title: "Essential Tips for Tick Prevention in Margalla Margins",
    content: "If you take your dogs for walks near F-6/F-7 or Margalla Hills trails, please be hyper-vigilated! The tick counts are through the roof. Brush paws, use standard spot-on drops and check closely. Symptoms of Tick Fever include dark yellow urine, severe lethargy, and white pale gums.",
    likes: 42,
    commentsCount: 9,
    date: "2026-06-08",
    tag: "Health"
  }
];

// Predefined locally poisonous and safe foods for Pakistan
export const FOOD_SAFETY_GUIDE = [
  {
    food: "Onion / Leeks (Pyaaz)",
    status: "poisonous",
    effectEn: "Causes breakdown of red blood cells (extreme anemia) in cats & dogs. Common in local Pakistani gravies (Salan / Shorba).",
    effectUr: "پیاز سے خون کے انجماد میں خرابی ہوتی ہے اور کتے بلیوں کو شدید خون کی کمی ہو جاتی ہے۔ سالن یا شوربے میں اس کا استعمال ممنوع ہے۔"
  },
  {
    food: "Garlic (Lehsan)",
    status: "poisonous",
    effectEn: "Even more toxic than onions. Causes immediate oxidative damage. Never feed leftover salan or korma meat.",
    effectUr: "لہسن پیاز سے بھی پالتو جانوروں کے لیے زیادہ زہریلا ہے۔ بچا ہوا سالن یا قورمہ کا گوشت انہیں کبھی نہ دیں کیونکہ اس میں لہسن موجود ہوتا ہے۔"
  },
  {
    food: "Chocolate / Caffeine",
    status: "poisonous",
    effectEn: "Contains Theobromine. Triggers nervous fits, hyper-salivation, dangerous heart palpitations, and can be fatal.",
    effectUr: "چاکلیٹ کتوں کے لیے زہر کی مانند ہے۔ اس میں الکلائڈ تھیوبرومین ہوتا ہے جو مرگی کے جھٹکے اور دل کا دورہ پیدا کر سکتا ہے۔"
  },
  {
    food: "Boiled Pumpkin (Kaddoo)",
    status: "safe",
    effectEn: "Extremely rich in fibers. Helps cure runny diarrhea, digests naturally, and cools tummy lining during hot waves.",
    effectUr: "ابلا ہوا کدو فائبر سے بھرپور ہوتا ہے۔ پالتو جانور کی دست (پیچش) یا معدے کی گرمی کو ٹھنڈا کرنے کے لیے بہترین گھریلو نسخہ ہے۔"
  },
  {
    food: "Yogurt / Curd (Dahi)",
    status: "safe",
    effectEn: "Nature's probiotic. Solves mild digestive gas, cools temperatures, and highly recommended as a summer mix in Pakistan.",
    effectUr: "دہی ہاضمے اور معدے کے لیے لاجواب پروبائیوٹک ہے۔ گرمیوں کے دنوں میں پالتو جانور کی خوراک میں ملا کر دینا گرمی کے جھٹکوں سے بچاتا ہے۔"
  },
  {
    food: "Boiled White Rice / Chicken",
    status: "safe",
    effectEn: "Gold standard stomach reset formula. Ensure chicken is absolutely skinless, boneless, and cooked completely without fats.",
    effectUr: "بغیر ہڈی اور کھال کا ابلا ہوا مرغی کا گوشت اور ابلے چاول معدہ ٹھیک رکھنے کے لیے سب سے بہترین اور محفوظ ترین غذا ہے۔"
  },
  {
    food: "Grapes / Kishmish (Raisins)",
    status: "poisonous",
    effectEn: "Highly hazardous. Causes immediate, sudden irreversible kidney failure in dogs.",
    effectUr: "کشمش یا انگور کتوں کے لیے شدید زہریلے ہیں۔ ان سے گردے فیل ہونے کا شدید خطرہ ہوتا ہے۔"
  },
  {
    food: "Bone Shorba (Mutton/Beef broth)",
    status: "safe",
    effectEn: "Awesome source of collagen and hydration. Ensure broth is cooled and strained cleanly without hard bone fragments or spices.",
    effectUr: "بغیر مصالحے اور ہڈی کا ٹھنڈا ابلا ہوا بیف یا مٹن شوربہ پالتو جانور کی قوت مدافعت بحال کرنے کے لیے شاندار ہے۔"
  }
];

// Seeded default pets
export const DEFAULT_PETS = [
  {
    id: "pet-1",
    name: "Sherry",
    type: "cat" as const,
    breed: "Persian (Traditional/Punch Face)",
    ageYears: 1,
    ageMonths: 4,
    weight: 3.8,
    gender: "female" as const,
    sterilized: true,
    avatarColor: "#ED6C85", // Pinkish
    city: "Karachi",
    ownerName: "Ayesha Shah",
    createdDate: "2026-01-10"
  },
  {
    id: "pet-2",
    name: "Simbo",
    type: "dog" as const,
    breed: "German Shepherd (GSD)",
    ageYears: 2,
    ageMonths: 1,
    weight: 28.5,
    gender: "male" as const,
    sterilized: false,
    avatarColor: "#4F46E5", // Indigo
    city: "Lahore",
    ownerName: "Sheraz Malik",
    createdDate: "2025-08-20"
  }
];
