export function releaseYear(releaseDate?: string): string {
  if (!releaseDate) return '';
  const year = new Date(releaseDate).getFullYear();
  return Number.isNaN(year) ? '' : String(year);
}
