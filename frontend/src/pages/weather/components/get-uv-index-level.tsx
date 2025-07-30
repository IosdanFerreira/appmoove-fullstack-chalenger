export default function getUvIndexLevel(uv: number): string {
  if (uv <= 2) return "Baixo";
  if (uv <= 5) return "Moderado";
  if (uv <= 7) return "Alto";
  if (uv <= 10) return "Muito Alto";
  return "Extremo";
}
