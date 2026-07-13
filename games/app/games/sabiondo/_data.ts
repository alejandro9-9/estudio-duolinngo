import type { MCQuestion } from "../_components/MultipleChoiceGame";

export const QUESTIONS: MCQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es el planeta más grande del sistema solar?",
    options: ["Marte", "Júpiter", "Saturno", "Neptuno"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "¿En qué continente se encuentra Egipto?",
    options: ["Asia", "Europa", "África", "Oceanía"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "¿Quién pintó la Mona Lisa?",
    options: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Miguel Ángel"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "¿Cuál es el océano más grande del mundo?",
    options: ["Atlántico", "Índico", "Ártico", "Pacífico"],
    correctIndex: 3,
  },
  {
    id: 5,
    question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
    options: ["206", "150", "300", "180"],
    correctIndex: 0,
  },
  {
    id: 6,
    question: "¿Cuál es la capital de Japón?",
    options: ["Seúl", "Pekín", "Tokio", "Bangkok"],
    correctIndex: 2,
  },
  {
    id: 7,
    question: "¿Qué gas necesitan las plantas para hacer la fotosíntesis?",
    options: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Hidrógeno"],
    correctIndex: 2,
  },
  {
    id: 8,
    question: "¿Quién escribió 'Cien años de soledad'?",
    options: ["Mario Vargas Llosa", "Gabriel García Márquez", "Jorge Luis Borges", "Pablo Neruda"],
    correctIndex: 1,
  },
  {
    id: 9,
    question: "¿Cuál es el río más largo del mundo?",
    options: ["Nilo", "Amazonas", "Misisipi", "Yangtsé"],
    correctIndex: 1,
  },
  {
    id: 10,
    question: "¿En qué año llegó el ser humano a la Luna por primera vez?",
    options: ["1965", "1969", "1972", "1959"],
    correctIndex: 1,
  },
];
