import type { TypedQuestion } from "../_components/TypedAnswerGame";

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateEquations(): TypedQuestion[] {
  const operations: Array<"+" | "-" | "x"> = ["+", "-", "x"];
  const equations: TypedQuestion[] = [];

  for (let i = 0; i < 3; i++) {
    const op = operations[randInt(0, operations.length - 1)];
    let a = randInt(2, 20);
    let b = randInt(2, 20);
    let answer: number;

    if (op === "+") {
      answer = a + b;
    } else if (op === "-") {
      if (b > a) [a, b] = [b, a];
      answer = a - b;
    } else {
      a = randInt(2, 12);
      b = randInt(2, 12);
      answer = a * b;
    }

    equations.push({
      id: i,
      prompt: `${a} ${op} ${b} = ?`,
      answers: [String(answer)],
    });
  }

  return equations;
}
