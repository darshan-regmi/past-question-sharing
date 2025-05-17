import { Module, Flashcard, StudyStats } from './types';

// Sample modules data
export const modules: Module[] = [
  { 
    id: "cs101", 
    title: "Introduction to Computer Science", 
    count: 42, 
    subject: "Computer Science",
    description: "Learn the fundamentals of computer science including algorithms, data structures, and programming concepts."
  },
  { 
    id: "math201", 
    title: "Linear Algebra", 
    count: 36, 
    subject: "Mathematics",
    description: "Study vectors, matrices, linear transformations, and their applications."
  },
  { 
    id: "bio150", 
    title: "Cell Biology", 
    count: 28, 
    subject: "Biology",
    description: "Explore the structure and function of cells, including cellular processes and organelles."
  },
  { 
    id: "hist101", 
    title: "World History", 
    count: 53, 
    subject: "History",
    description: "Survey major historical events and developments across different civilizations and time periods."
  },
  { 
    id: "phys202", 
    title: "Quantum Mechanics", 
    count: 17, 
    subject: "Physics",
    description: "Understand the principles of quantum physics and its mathematical foundations."
  },
  { 
    id: "eng305", 
    title: "Modern Literature", 
    count: 23, 
    subject: "English",
    description: "Analyze literary works from the 20th and 21st centuries across various genres and traditions."
  },
  { 
    id: "chem101", 
    title: "General Chemistry", 
    count: 31, 
    subject: "Chemistry",
    description: "Study the fundamental principles of chemistry, including atomic structure, bonding, and reactions."
  },
  { 
    id: "psych220", 
    title: "Cognitive Psychology", 
    count: 19, 
    subject: "Psychology",
    description: "Examine mental processes including perception, memory, problem solving, and decision making."
  }
];

// Sample flashcards data organized by module ID
export const flashcards: Record<string, Flashcard[]> = {
  "cs101": [
    {
      id: "cs101-1",
      question: "What is the time complexity of a binary search algorithm?",
      answer: "O(log n)",
      difficulty: "medium",
      tags: ["algorithms", "complexity", "search"],
      year: "2023"
    },
    {
      id: "cs101-2",
      question: "What does CPU stand for?",
      answer: "Central Processing Unit",
      difficulty: "easy",
      tags: ["hardware", "basics"],
      year: "2022"
    },
    {
      id: "cs101-3",
      question: "What is the difference between a stack and a queue?",
      answer: "A stack follows LIFO (Last In First Out) principle, while a queue follows FIFO (First In First Out).",
      difficulty: "medium",
      tags: ["data structures", "basics"],
      year: "2023"
    },
    {
      id: "cs101-4",
      question: "What is recursion?",
      answer: "Recursion is when a function calls itself directly or indirectly to solve a problem.",
      difficulty: "medium",
      tags: ["programming", "algorithms"],
      year: "2022"
    },
    {
      id: "cs101-5",
      question: "Explain the concept of object-oriented programming.",
      answer: "Object-oriented programming (OOP) is a programming paradigm based on the concept of 'objects', which can contain data and code. The data is in the form of fields (attributes), and the code is in the form of procedures (methods). A key feature of OOP is that object's procedures can access and modify the data fields of the object they are associated with.",
      difficulty: "hard",
      tags: ["programming", "paradigms", "OOP"],
      year: "2023"
    },
    {
      id: "cs101-6",
      question: "What is a hash table and how does it work?",
      answer: "A hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found. Ideally, the hash function will assign each key to a unique bucket, but most hash table designs employ an imperfect hash function, which might cause hash collisions where the hash function generates the same index for more than one key. Such collisions are typically accommodated in some way.",
      difficulty: "hard",
      tags: ["data structures", "algorithms", "hashing"],
      year: "2023"
    }
  ],
  "math201": [
    {
      id: "math201-1",
      question: "What is a vector space?",
      answer: "A vector space is a collection of objects called vectors, which may be added together and multiplied ('scaled') by numbers, called scalars. Scalars are often taken to be real numbers, but there are also vector spaces with scalar multiplication by complex numbers, rational numbers, or generally any field.",
      difficulty: "medium",
      tags: ["linear algebra", "vector spaces"],
      year: "2023"
    },
    {
      id: "math201-2",
      question: "Define eigenvalues and eigenvectors.",
      answer: "An eigenvector of a square matrix A is a non-zero vector v that, when multiplied by A, yields a scalar multiple of itself (λv). The scalar λ is called the eigenvalue corresponding to the eigenvector v. Mathematically: Av = λv",
      difficulty: "hard",
      tags: ["linear algebra", "matrices", "eigenvalues"],
      year: "2022",
      imageUrl: "/images/eigenvectors.png"
    },
    {
      id: "math201-3",
      question: "What is the rank of a matrix?",
      answer: "The rank of a matrix is the dimension of the vector space generated (or spanned) by its columns. This corresponds to the maximum number of linearly independent columns of the matrix. This, in turn, is identical to the dimension of the vector space spanned by its rows.",
      difficulty: "medium",
      tags: ["linear algebra", "matrices", "rank"],
      year: "2023"
    }
  ],
  "phys202": [
    {
      id: "phys202-1",
      question: "What is Heisenberg's Uncertainty Principle?",
      answer: "Heisenberg's Uncertainty Principle states that there is a fundamental limit to the precision with which complementary variables, such as position and momentum, can be known simultaneously. Mathematically, it is expressed as: ΔxΔp ≥ ħ/2, where Δx is the uncertainty in position, Δp is the uncertainty in momentum, and ħ is the reduced Planck constant.",
      difficulty: "hard",
      tags: ["quantum mechanics", "physics principles"],
      year: "2023"
    },
    {
      id: "phys202-2",
      question: "What is the Schrödinger equation?",
      answer: "The Schrödinger equation is a linear partial differential equation that describes how the quantum state of a physical system changes over time. It is central to quantum mechanics. The time-dependent form is: iħ∂Ψ/∂t = ĤΨ, where Ψ is the wave function, ħ is the reduced Planck constant, and Ĥ is the Hamiltonian operator.",
      difficulty: "hard",
      tags: ["quantum mechanics", "equations"],
      year: "2022"
    }
  ]
};

// Sample study statistics
export const studyStats: StudyStats = {
  totalCards: 120,
  studiedCards: 45,
  correctCards: 32,
  incorrectCards: 13,
  streak: 7,
  lastStudyDate: "2025-05-16"
};

// Get all available subjects
export const getSubjects = (): string[] => {
  const subjects = new Set<string>();
  modules.forEach(module => subjects.add(module.subject));
  return Array.from(subjects);
};

// Get all available tags
export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  Object.values(flashcards).forEach(moduleCards => {
    moduleCards.forEach(card => {
      card.tags?.forEach(tag => tags.add(tag));
    });
  });
  return Array.from(tags);
};

// Get all available years
export const getYears = (): string[] => {
  const years = new Set<string>();
  Object.values(flashcards).forEach(moduleCards => {
    moduleCards.forEach(card => {
      if (card.year) years.add(card.year);
    });
  });
  return Array.from(years).sort((a, b) => b.localeCompare(a)); // Sort descending
};

// Filter modules by search query and subject
export const filterModules = (options: { query?: string; subject?: string }): Module[] => {
  return modules.filter(module => {
    // Filter by search query
    if (options.query && !module.title.toLowerCase().includes(options.query.toLowerCase()) && 
        !module.description?.toLowerCase().includes(options.query.toLowerCase())) {
      return false;
    }
    
    // Filter by subject
    if (options.subject && module.subject !== options.subject) {
      return false;
    }
    
    return true;
  });
};

// Filter flashcards by various criteria
export const filterFlashcards = (moduleId: string, options: {
  query?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  year?: string;
}): Flashcard[] => {
  const moduleCards = flashcards[moduleId] || [];
  
  return moduleCards.filter(card => {
    // Filter by search query
    if (options.query && 
        !card.question.toLowerCase().includes(options.query.toLowerCase()) && 
        !card.answer.toLowerCase().includes(options.query.toLowerCase())) {
      return false;
    }
    
    // Filter by difficulty
    if (options.difficulty && card.difficulty !== options.difficulty) {
      return false;
    }
    
    // Filter by tags (any match)
    if (options.tags && options.tags.length > 0) {
      if (!card.tags || !options.tags.some(tag => card.tags?.includes(tag))) {
        return false;
      }
    }
    
    // Filter by year
    if (options.year && card.year !== options.year) {
      return false;
    }
    
    return true;
  });
};

// Get daily questions (random selection from all modules)
export const getDailyQuestions = (count: number = 3): Flashcard[] => {
  const allFlashcards: Flashcard[] = [];
  Object.values(flashcards).forEach(moduleCards => {
    allFlashcards.push(...moduleCards);
  });
  
  // Shuffle and pick random cards
  const shuffled = [...allFlashcards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
