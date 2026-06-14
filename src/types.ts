export type AppLanguage = "en" | "ur";

export type PetType = "dog" | "cat" | "bird" | "rabbit" | "other";

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  ageYears: number;
  ageMonths: number;
  weight: number; // in kg
  gender: "male" | "female";
  sterilized: boolean;
  avatarColor: string; // Tailwind hex or class name
  city: string;
  ownerName: string;
  createdDate: string;
}

export interface Vaccination {
  id: string;
  petId: string;
  name: string;
  diseaseProtected: string;
  dateScheduled: string;
  dateAdministered?: string;
  status: "pending" | "completed";
  administeredBy?: string;
  notes?: string;
  certificationNumber?: string;
}

export interface Medication {
  id: string;
  petId: string;
  name: string;
  dosage: string; // e.g., "1 tab", "0.5 ml"
  frequency: string; // e.g., "Once daily", "Twice daily"
  dateStart: string;
  dateEnd: string;
  status: "active" | "completed";
  notes?: string;
}

export interface VetVisit {
  id: string;
  petId: string;
  vetName: string;
  clinicName: string;
  visitDate: string;
  reason: string;
  diagnosis?: string;
  prescription?: string;
  notes?: string;
  cost: number; // in PKR
}

export interface WeightRecord {
  id: string;
  petId: string;
  weight: number; // in kg
  date: string; // YYYY-MM-DD
}

export interface Reminder {
  id: string;
  petId: string;
  title: string;
  time: string; // HH:MM
  dateOnly?: string; // YYYY-MM-DD for one-off tasks
  category: "food" | "vaccine" | "pill" | "visit" | "grooming" | "walk";
  frequency: "daily" | "weekly" | "once";
  active: boolean;
  notes?: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: "Owner" | "Vet" | "Shelter";
  city: string;
  avatarColor: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  date: string;
  tag: "General" | "Health" | "Diet" | "Urgent" | "Welfare";
  replies?: Array<{
    authorName: string;
    authorRole: string;
    content: string;
    date: string;
  }>;
}

export interface EmergencyClinic {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  helpline: string;
  is24Hours: boolean;
  hasAmbulance: boolean;
  latitude?: number;
  longitude?: number;
  coordinatesText: string;
}

export interface RegionalAlert {
  id: string;
  city: string;
  level: "info" | "warning" | "danger";
  titleEn: string;
  titleUr: string;
  messageEn: string;
  messageUr: string;
  actionEn: string;
  actionUr: string;
  date: string;
}
