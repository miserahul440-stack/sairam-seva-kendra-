
export type Language = 'mr' | 'hi' | 'en';

export interface Service {
  id: string;
  title: Record<Language, string>;
  icon: string;
  description: Record<Language, string>;
  documents?: Record<Language, string[]>;
  fees: {
    filling: number;
    govt?: string;
  };
  category: 'farmer' | 'student' | 'csc' | 'jobs' | 'identity' | 'printing';
  importantDates?: {
    start?: string;
    end?: string;
  };
  eligibility?: Record<Language, string>;
  ageLimit?: Record<Language, string>;
  isNew?: boolean;
}

export interface NotificationPrefs {
  farmer: boolean;
  student: boolean;
  jobs: boolean;
  schemes: boolean;
}

export interface AppState {
  language: Language;
  notifications: NotificationPrefs;
  hasSeenWelcome: boolean;
}
