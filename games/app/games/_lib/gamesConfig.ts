export type GameSlug =
  | "sopa-de-letras"
  | "sabiondo"
  | "bilingue"
  | "biologo"
  | "matematico"
  | "electronico"
  | "historiador"
  | "geografo";

export type GameMeta = {
  slug: GameSlug;
  order: number;
  name: string;
  description: string;
  duration: string;
};

export const games: GameMeta[] = [
  {
    slug: "sopa-de-letras",
    order: 1,
    name: "Sopa de letras",
    description: "Encuentra 6 palabras de cultura general.",
    duration: "2 min",
  },
  {
    slug: "sabiondo",
    order: 2,
    name: "Sabiondo",
    description: "10 preguntas de cultura general.",
    duration: "2 min",
  },
  {
    slug: "bilingue",
    order: 3,
    name: "Bilingüe",
    description: "Traduce palabras del inglés al español.",
    duration: "1 min",
  },
  {
    slug: "biologo",
    order: 4,
    name: "Biólogo",
    description: "5 preguntas sobre animales.",
    duration: "30 seg",
  },
  {
    slug: "matematico",
    order: 5,
    name: "Matemático",
    description: "Resuelve 3 ecuaciones a contrarreloj.",
    duration: "1 min",
  },
  {
    slug: "electronico",
    order: 6,
    name: "Electrónico",
    description: "5 preguntas básicas de electricidad.",
    duration: "30 seg",
  },
  {
    slug: "historiador",
    order: 7,
    name: "Historiador",
    description: "5 preguntas de historia general.",
    duration: "30 seg",
  },
  {
    slug: "geografo",
    order: 8,
    name: "Geógrafo",
    description: "5 preguntas de geografía.",
    duration: "30 seg",
  },
];

export const TOTAL_GAMES = games.length;
