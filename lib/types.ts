// Define types for the application

export interface Module {
  id: string;
  title: string;
  subject: string;
  count: number;
  name?: string; // For backward compatibility with new components
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  year?: number;
  semester?: number;
  tags?: string[];
  flashcardCount?: number;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  imageUrl?: string;
  year?: string | number; // Support both string and number formats
  moduleId?: string; // Reference to the parent module
  lastStudied?: string;
  correctCount?: number;
  incorrectCount?: number;
}

export interface StudyStats {
  totalCards: number;
  studiedCards: number;
  correctCards: number;
  incorrectCards: number;
  streak: number;
  lastStudyDate?: string;
}

export interface FilterOptions {
  subject?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | null;
  year?: string | number | null;
  tags?: string[];
  searchQuery?: string;
}

export interface FilterBarOptions {
  difficulties?: string[];
  tags?: string[];
  years?: (string | number)[];
}
