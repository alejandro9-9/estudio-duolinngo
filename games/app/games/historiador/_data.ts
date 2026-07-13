import type { MCQuestion } from "../_components/MultipleChoiceGame";

export const QUESTIONS: MCQuestion[] = [
  {
    id: 1,
    question: "¿En qué año comenzó la Segunda Guerra Mundial?",
    options: ["1914", "1939", "1945", "1929"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "¿Quién fue el primer emperador de Roma?",
    options: ["Julio César", "Augusto", "Nerón", "Trajano"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "¿Qué civilización construyó Machu Picchu?",
    options: ["Maya", "Azteca", "Inca", "Olmeca"],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "¿En qué año cayó el Muro de Berlín?",
    options: ["1989", "1991", "1975", "1969"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "¿Quién fue el libertador de gran parte de Sudamérica?",
    options: ["Simón Bolívar", "Napoleón Bonaparte", "José de San Martín", "Miguel Hidalgo"],
    correctIndex: 0,
  },
];
