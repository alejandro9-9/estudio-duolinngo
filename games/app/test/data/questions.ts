export type QuizOption = {
  text: string;
  level: number;
  bars: number;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
};

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es tu relación actual con la organización?",
    options: [
      { text: "No uso agenda ni calendario, improviso cada día.", level: 1, bars: 1 },
      { text: "A veces anoto cosas, pero las olvido pronto.", level: 2, bars: 2 },
      { text: "Tengo un plan básico, pero me cuesta seguirlo.", level: 3, bars: 3 },
      { text: "Tengo rutinas claras y cumplo mis objetivos.", level: 4, bars: 4 },
    ],
  },
  {
    id: 2,
    question: "¿Cómo manejas las distracciones al estudiar?",
    options: [
      { text: "El móvil es mi mayor enemigo y me rindo fácil.", level: 1, bars: 1 },
      { text: "Estudio con música o ruido, pero me distraigo.", level: 2, bars: 2 },
      { text: "Uso técnicas (como Pomodoro) pero me canso.", level: 3, bars: 3 },
      { text: "Entro en estado de 'flow' y me concentro bien.", level: 4, bars: 4 },
    ],
  },
  {
    id: 3,
    question: "¿Qué técnica de estudio utilizas más?",
    options: [
      { text: "Solo leo y releo los textos varias veces.", level: 1, bars: 1 },
      { text: "Subrayo todo el libro con colores.", level: 2, bars: 2 },
      { text: "Hago resúmenes o esquemas propios.", level: 3, bars: 3 },
      { text: "Uso autoevaluación y recuerdo activo (Active Recall).", level: 4, bars: 4 },
    ],
  },
];

export function getResultMessage(average: number): string {
  if (average <= 1.5) {
    return "Estás en el nivel 'Principiante'. Te cuesta arrancar, pero con un método pequeño cada día verás grandes cambios.";
  }
  if (average <= 2.5) {
    return "Estás en el nivel 'Intermedio Bajo'. Sabes que debes estudiar, pero la constancia es tu mayor reto.";
  }
  if (average <= 3.5) {
    return "Estás en el nivel 'Avanzado'. Tienes buenas herramientas, solo falta pulir la eficiencia técnica.";
  }
  return "¡Eres un 'Maestro del Estudio'! Tu nivel de organización y enfoque es envidiable. ¡Sigue así!";
}
