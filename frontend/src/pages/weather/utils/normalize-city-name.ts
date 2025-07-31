export function normalizeCityName(name: string): string {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}