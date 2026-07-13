import type { MCQuestion } from "../_components/MultipleChoiceGame";

export const QUESTIONS: MCQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es el mamífero más grande del mundo?",
    options: ["Elefante africano", "Ballena azul", "Jirafa", "Rinoceronte"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "¿Qué animal es conocido como 'el rey de la selva'?",
    options: ["Tigre", "León", "Leopardo", "Gorila"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "¿Cuántas patas tiene una araña?",
    options: ["6", "8", "10", "4"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "¿Qué ave no puede volar pero es un excelente nadador?",
    options: ["Pingüino", "Avestruz", "Águila", "Colibrí"],
    correctIndex: 0,
  },
  {
    id: 5,
    question: "¿Qué animal cambia de color para camuflarse?",
    options: ["Camaleón", "Delfín", "Zorro", "Búho"],
    correctIndex: 0,
  },
];
