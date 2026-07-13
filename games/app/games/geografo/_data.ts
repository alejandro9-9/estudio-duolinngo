import type { MCQuestion } from "../_components/MultipleChoiceGame";

export const QUESTIONS: MCQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es el país más extenso del mundo?",
    options: ["Canadá", "China", "Rusia", "Estados Unidos"],
    correctIndex: 2,
  },
  {
    id: 2,
    question: "¿Cuál es el desierto más grande del mundo?",
    options: ["Sahara", "Gobi", "Atacama", "Kalahari"],
    correctIndex: 0,
  },
  {
    id: 3,
    question: "¿Qué cordillera recorre gran parte de Sudamérica?",
    options: ["Alpes", "Andes", "Himalaya", "Montes Urales"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "¿Cuál es la montaña más alta del mundo?",
    options: ["K2", "Aconcagua", "Monte Everest", "Kilimanjaro"],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "¿Qué país tiene forma de bota?",
    options: ["España", "Italia", "Grecia", "Portugal"],
    correctIndex: 1,
  },
];
