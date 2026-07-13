import type { MCQuestion } from "../_components/MultipleChoiceGame";

export const QUESTIONS: MCQuestion[] = [
  {
    id: 1,
    question: "¿Qué unidad mide la corriente eléctrica?",
    options: ["Voltio", "Amperio", "Ohmio", "Vatio"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "¿Qué unidad mide la resistencia eléctrica?",
    options: ["Amperio", "Voltio", "Ohmio", "Julio"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "¿Qué material es un buen conductor eléctrico?",
    options: ["Madera", "Cobre", "Plástico", "Vidrio"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "¿Qué ley relaciona voltaje, corriente y resistencia?",
    options: ["Ley de Newton", "Ley de Ohm", "Ley de Coulomb", "Ley de Boyle"],
    correctIndex: 1,
  },
  {
    id: 5,
    question: "¿Qué dispositivo almacena energía eléctrica?",
    options: ["Resistencia", "Batería", "Interruptor", "Cable"],
    correctIndex: 1,
  },
];
